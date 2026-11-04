const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const { test } = require('node:test');
const html = fs.readFileSync(require('node:path').join(__dirname, '..', 'index.html'), 'utf8');
const formula = html.slice(html.indexOf('needXp=l=>'), html.indexOf(',progLevel=()=>'));
const branch = html.slice(html.indexOf("if(k==='level'){let rows="), html.indexOf("if(k==='pvp'){let rows="));

async function rankLevel(xp, remoteRows) {
  function element() { return { textContent: '', children: [], append(...items) { this.children.push(...items); } }; }
  const nodes = { 'rank-src': element(), 'rank-list': element() };
  const context = {
    prog: { xp, unlocked: ['jersey'] }, myName: () => '나', mainChar: () => 'jersey', characterCount: () => 1,
    LOOKS: { jersey: { nick: '휴고범' } }, nameTtl: (node, row) => { node.textContent = row.name; },
    document: { createElement: element }, $: id => nodes[id],
    remote: async () => remoteRows ? {} : null,
    rankFs: { collection: () => ({}), orderBy: () => ({}), limit: () => ({}), query: () => ({}),
      getDocs: async () => ({ docs: remoteRows.map(row => ({ data: () => row })) }) }
  };
  vm.runInNewContext('const ' + formula + '; async function render(){const k="level";' + branch + '} globalThis.render=render;', context);
  await context.render();
  return nodes['rank-list'].children.map(li => li.children[3].textContent);
}

test('Lv 1~10 stays quick while later levels use the slower progression thresholds', async () => {
  // Thresholds from the current needXp curve: Lv10 at 2340, Lv11 at 2800, Lv12 at 3320, Lv20 at 10320, Lv21 at 11620, Lv22 at 13050.
  for (const [xp, expected] of [[0, 1], [2339, 9], [2340, 10], [2799, 10], [2800, 11], [3319, 11], [3320, 12], [11619, 20], [11620, 21], [13049, 21], [13050, 22]]) {
    assert.equal((await rankLevel(xp, null))[0], `Lv ${expected}`, `local XP ${xp}`);
    assert.equal((await rankLevel(0, [{ name: '상대', xp, chars: 1 }]))[0], `Lv ${expected}`, `cloud XP ${xp}`);
  }
});
