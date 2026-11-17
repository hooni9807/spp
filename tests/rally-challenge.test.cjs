const assert = require('node:assert/strict');
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const { chromium } = require('playwright');

async function main() {
  const files = {
    '/rally-challenge.html': 'text/html; charset=utf-8',
    '/rally-challenge.js': 'text/javascript',
    '/library.css': 'text/css'
  };
  const server = http.createServer((request, response) => {
    const pathname = new URL(request.url, 'http://local').pathname;
    if (!Object.hasOwn(files, pathname)) {
      response.writeHead(404).end();
      return;
    }
    response.writeHead(200, { 'Content-Type': files[pathname] });
    fs.createReadStream(path.join(__dirname, '..', pathname)).pipe(response);
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const executablePath = process.env.CHROME_PATH ||
    (process.platform === 'darwin' ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' : undefined);
  let browser;
  try {
    browser = await chromium.launch({ executablePath });
    const page = await browser.newPage({ viewport: { width: 390, height: 844 }, hasTouch: true });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.clock.install();
    await page.goto(`http://127.0.0.1:${server.address().port}/rally-challenge.html`);
    const feedback = page.locator('#rally-feedback');
    const start = page.getByRole('button', { name: '8구 시작' });
    await start.tap();
    await page.getByRole('button', { name: '받아치기' }).tap();
    assert.match(await feedback.textContent(), /실패.*빠름/);
    for (let shot = 1; shot < 8; shot++) {
      await page.clock.runFor(800 + 1750);
      await page.keyboard.press('Space');
      assert.match(await feedback.textContent(), /성공/);
    }
    assert.equal(await page.locator('#rally-count').textContent(), '8 / 8구');
    assert.match(await feedback.textContent(), /세트 완료, 7구 성공. 최고 연속 7회/);
    assert.equal(await page.locator('#rally-review').isVisible(), true);
    assert.equal(await page.locator('#rally-results tr').count(), 8);
    assert.match(await page.locator('#rally-results tr').first().textContent(), /1구실패.*빠름/);
    assert.match(await page.locator('#rally-summary').textContent(), /빠른 실패 1회.*입력한 8구/);
    assert.match(await page.locator('#rally-next').textContent(), /구간에 도착하기 전에/);
    assert.equal(await page.evaluate(() => localStorage.length + sessionStorage.length), 0);
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));

    await page.getByLabel('연습 속도').selectOption('quick');
    await start.tap();
    assert.equal(await page.locator('#rally-review').isVisible(), false);
    await page.clock.runFor(1220 + 130 + 32);
    assert.match(await feedback.textContent(), /놓쳤어요/);
    await page.getByRole('button', { name: '중단' }).tap();
    await page.clock.runFor(3000);
    assert.match(await feedback.textContent(), /연습을 중단/);
    assert.equal(await page.locator('#rally-review').isVisible(), false);
    await start.tap();
    await page.clock.runFor(8 * (1220 + 130 + 32 + 800));
    assert.equal(await page.locator('#rally-results tr').count(), 8);
    assert.match(await page.locator('#rally-summary').textContent(), /놓친 공 8구/);
    assert.doesNotMatch(await page.locator('#rally-summary').textContent(), /평균/);
    assert.match(await page.locator('#rally-next').textContent(), /일정한 공을 고르고/);
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));

    await page.getByLabel('연습 속도').selectOption('varied');
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await start.tap();
    const durations = [1600, 1020, 1450, 1200, 1700, 1110, 1550, 1050];
    for (const [index, duration] of durations.entries()) {
      await page.clock.runFor(duration + (index ? 800 : 0));
      await page.keyboard.press('Space');
    }
    assert.match(await feedback.textContent(), /세트 완료, 8구 성공/);
    assert.match(await page.locator('#rally-next').textContent(), /스윙 방향까지/);
    assert.equal(await page.locator('#rally-table').getAttribute('data-rally-still'), 'true');
    assert.equal(await page.evaluate(() => localStorage.length + sessionStorage.length), 0);
    assert.deepEqual(errors, []);
    const staticContext = await browser.newContext({ javaScriptEnabled: false });
    const staticPage = await staticContext.newPage();
    await staticPage.goto(`http://127.0.0.1:${server.address().port}/rally-challenge.html`);
    assert.equal(await staticPage.getByRole('button', { name: '8구 시작' }).isDisabled(), true);
    assert.equal(await staticPage.getByRole('heading', { name: '같은 속도에서 기준 잡기' }).isVisible(), true);
    await staticContext.close();
    console.log('PASS rally timing, completed-set review, tailored next drill, missed ball, restart, cancellation, reduced motion, no-JS and no storage');
  } finally {
    await browser?.close();
    server.close();
  }
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
