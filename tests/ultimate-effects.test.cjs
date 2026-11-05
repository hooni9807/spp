const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { chromium } = require('playwright');

(async () => {
  const root = process.cwd();
  const server = http.createServer((req, res) => {
    const u = new URL(req.url, 'http://localhost');
    fs.readFile(path.join(root, u.pathname === '/' ? 'index.html' : u.pathname), (e, b) => e ? res.writeHead(404).end() : res.end(b));
  });
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH, headless: true });
  try {
    const page = await browser.newPage();
    await page.goto(`http://127.0.0.1:${server.address().port}`);
    await page.waitForFunction(() => document.getElementById('prologue-loading').hidden);
    const out = await page.evaluate(() => {
      openUlts('jersey');
      return {
        count: ULTS.length,
        tiers: [...new Set(ULTS.map(u => u.tier))],
        trigs: ULTS.map(u => u.trig).sort(),
        rows: document.querySelectorAll('#ult-list .ms-tier').length,
        locked: ULTS.some(u => !ultOk(u, 'jersey')),
        unlockSummaryHidden: document.getElementById('ult-unlock').hidden
      };
    });
    assert.equal(out.count, 5);
    assert.deepEqual(out.tiers, [4]);
    assert.deepEqual(out.trigs, ['cut', 'drive', 'lob', 'serve', 'short']);
    assert.equal(out.rows, 1);
    assert.equal(out.locked, false);
    assert.equal(out.unlockSummaryHidden, true);
    console.log('Only one unlocked tier-four ultimate row remains');
  } finally {
    await browser.close();
    server.close();
  }
})().catch(e => { console.error(e); process.exitCode = 1; });
