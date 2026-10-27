const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');

(async () => {
  const root = process.cwd();
  const server = http.createServer((req, res) => {
    const file = path.join(root, new URL(req.url, 'http://localhost').pathname === '/' ? 'index.html' : new URL(req.url, 'http://localhost').pathname);
    fs.readFile(file, (error, body) => error ? res.writeHead(404).end() : res.end(body));
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH, headless: true });
  try {
    const page = await browser.newPage();
    await page.goto(`http://127.0.0.1:${server.address().port}`);
    await page.waitForFunction(() => document.getElementById('prologue-loading').hidden);
    const result = await page.evaluate(() => {
      if ($('auth-gate').open) $('auth-gate').close();
      if ($('unlock').open) $('unlock').close();
      document.body.classList.remove('prologue-open');
      offerUnlockQueued = false;
      const saved = prog;
      const oldToast = toast;
      const notes = [];
      try {
        toast = (...args) => notes.push(args[0]);
        prog = { xp: 400, unlocked: [...START_CHARS], offer: ['aribeom', 'leesin'], q: {} };
        offerUnlock();
        const stale = document.querySelector('#ul-list button[data-char="aribeom"]');
        prog.unlocked.push('aribeom'); // Simulates an already-synced unlock while its old card is still open.
        stale.click();
        prog.offer = ['aribeom'];
        normalizeUnlockState();
        return { staleOfferCleared: prog.offer === null, notes, unique: new Set(prog.unlocked).size === prog.unlocked.length };
      } finally {
        document.getElementById('unlock').close();
        prog = saved;
        toast = oldToast;
      }
    });
    assert.equal(result.staleOfferCleared, true);
    assert.equal(result.notes.length, 0);
    assert.equal(result.unique, true);
    console.log('stale character offers do not repeat an unlocked character');
  } finally {
    await browser.close();
    server.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
