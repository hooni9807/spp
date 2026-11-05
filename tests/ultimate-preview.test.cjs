const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { chromium } = require('playwright');

(async () => {
  const server = http.createServer((req, res) => {
    const file = path.join(process.cwd(), new URL(req.url, 'http://localhost').pathname === '/' ? 'index.html' : new URL(req.url, 'http://localhost').pathname);
    fs.readFile(file, (e, b) => e ? res.writeHead(404).end() : res.end(b));
  });
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH, headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1100, height: 900 } });
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto(`http://127.0.0.1:${server.address().port}`);
    await page.waitForFunction(() => document.getElementById('prologue-loading').hidden);
    const original = await page.evaluate(() => { openUlts('jersey'); return JSON.stringify({ charge, ball, character: charType, slots: ultSet('jersey') }); });
    await page.locator('#ult-list .ms-cell:not(.lock) small').first().click();
    await page.waitForTimeout(180);
    assert.equal(await page.locator('#ult-preview').isVisible(), true);
    const first = await page.locator('#ult-preview-canvas').evaluate(c => c.toDataURL());
    await page.waitForTimeout(250);
    const second = await page.locator('#ult-preview-canvas').evaluate(c => c.toDataURL());
    assert.notEqual(first, second);
    assert.equal(await page.evaluate(() => JSON.stringify({ charge, ball, character: charType, slots: ultSet('jersey') })), original);
    assert.deepEqual(errors, []);
    await page.keyboard.press('Escape');
    await page.waitForFunction(() => !document.getElementById('ult-preview').open && ultPreviewFrame === 0);
    console.log('Unlocked tier-four preview animates without changing match state');
  } finally {
    await browser.close();
    server.close();
  }
})().catch(e => { console.error(e); process.exitCode = 1; });
