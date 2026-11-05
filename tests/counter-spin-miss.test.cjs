const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const { test } = require('node:test');

const html = fs.readFileSync('index.html', 'utf8');
const physics = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)].find(m => m[2].includes('root.PingPhysics='));
const context = { module: { exports: {} }, Math };
context.globalThis = context;
vm.runInNewContext(physics[2], context);
const P = context.module.exports;

test('strong-spin counter-drive miss rates follow timing quality', () => {
  const strong = { spin: 1.6 };
  assert.equal(P.counterSpinMissRate('drive', 'drive', 'PERFECT', strong), 0);
  assert.equal(P.counterSpinMissRate('drive', 'drive', 'GREAT', strong), .05);
  assert.equal(P.counterSpinMissRate('drive', 'drive', 'GOOD', strong), .1);
  assert.equal(P.counterSpinMissRate('drive', 'drive', 'LATE', strong), .2);
  assert.equal(P.counterSpinMissRate('cut', 'drive', 'LATE', strong), 0);
  assert.equal(P.counterSpinMissRate('drive', 'drive', 'LATE', { spin: .6 }), 0);
});

test('counter-drive spin misses use the requested four-way outcome split', () => {
  assert.equal(P.counterSpinMissOutcome(.6999), 'float');
  assert.equal(P.counterSpinMissOutcome(.7), 'netIn');
  assert.equal(P.counterSpinMissOutcome(.8), 'net');
  assert.equal(P.counterSpinMissOutcome(.9), 'out');
  const shot = P.miss({ vy: 3, vz: 0, spin: 1 }, -.3, .2, 'netIn');
  assert.equal(shot.miss, false);
  assert.equal(shot.netCord, 'one');
  assert.match(html, /flair='spinFloat'/);
  assert.match(html, /if\(outcome==='net'\)shot\.aiChanceMiss=true/);
});
