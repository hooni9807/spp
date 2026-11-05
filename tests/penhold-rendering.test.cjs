const assert = require('node:assert/strict');
const fs = require('node:fs');
const html = fs.readFileSync('index.html', 'utf8');

assert.ok(html.includes("w:27,h:25,hw:9,hl:15"));
assert.ok(html.includes("w:22,h:28,hw:11,hl:21"));
assert.match(html, /bareJpen=type==='jpen'&&!red&&!champion/);
assert.match(html, /Japanese penhold: three fingers spread flat over the bare wood back/);
assert.match(html, /Chinese penhold: three fingers curl and stack on the reverse rubber/);
console.log('Penhold blade silhouettes, reverse faces, and hand grips are wired');
