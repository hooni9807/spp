const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const { test } = require('node:test');
const html = fs.readFileSync('index.html', 'utf8');
const start = html.indexOf('let defenderChopMotion=false;');
const end = html.indexOf('// 날먹세\'s serve', start);
const finish = html.match(/lastHit=time;lastShot=defenderChopMotion[\s\S]*?mySwing\.t=time;/)[0];
function swing(incoming, random = .4) {
  const ctx = {
    LOOKS: { song: { defender: true } }, charType: 'song', verdict: 'ok', special: false,
    flair: null, shot: { type: 'cut', spin: -1 }, playerSide: 1, fhDir: () => 1,
    rally: 2, me: {}, inc: incoming, quality: 'PERFECT', time: 10, ball: { type: incoming },
    bhFakeUntil: -1, defenderFatigue: () => 0, shortCutShot: () => null, toast: () => {},
    Math: Object.assign(Object.create(Math), { random: () => random }),
    P: { family: () => 'cut', power: s => s, popup: s => s }, mySwing: {},
  };
  vm.runInNewContext(html.slice(start, end) + finish, ctx);
  return ctx;
}
test('forehand long-pips return uses backhand chop even when spin reverses', () => {
  for (const incoming of ['drive', 'cut', 'smash']) {
    const ctx = swing(incoming);
    assert.equal(ctx.playerSide, -1);
    assert.equal(ctx.mySwing.type, 'chop');
    assert.equal(ctx.lastShot, 'chop'); // shared by doubles and network rendering
    assert.equal(ctx.shot.type, incoming === 'cut' ? 'loop' : 'cut');
  }
});
test('ordinary forehand cut keeps its motion when backhand conversion does not trigger', () => {
  const ctx = swing('cut', .8);
  assert.equal(ctx.playerSide, 1);
  assert.equal(ctx.mySwing.type, 'cut');
});
