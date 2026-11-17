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
    if (!Object.hasOwn(files, request.url)) {
      response.writeHead(404).end();
      return;
    }
    response.writeHead(200, { 'Content-Type': files[request.url] });
    fs.createReadStream(path.join(__dirname, '..', request.url)).pipe(response);
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
    assert.equal(await page.evaluate(() => localStorage.length + sessionStorage.length), 0);
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));

    await page.getByLabel('연습 속도').selectOption('quick');
    await start.tap();
    await page.clock.runFor(1220 + 130 + 32);
    assert.match(await feedback.textContent(), /놓쳤어요/);
    await page.getByRole('button', { name: '중단' }).tap();
    await page.clock.runFor(3000);
    assert.match(await feedback.textContent(), /연습을 중단/);
    assert.deepEqual(errors, []);
    console.log('PASS rally timing, touch and keyboard, streak, missed ball, cancellation and no storage');
  } finally {
    await browser?.close();
    server.close();
  }
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
