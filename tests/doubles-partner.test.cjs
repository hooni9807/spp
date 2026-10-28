const assert=require('node:assert'),fs=require('node:fs');
const html=fs.readFileSync('index.html','utf8');
for(const hook of ['function openDoublesPartner()','_doublesPartner','let doublesCombo=','const rawHit=hit','const rawStepBody=stepBody','let mateChar=', 'mateCharge=0','function mateUlt(','🤝 '+"${duo.name}"])assert.ok(html.includes(hook),`missing ${hook}`);
assert.match(html,/P\.aiChance\(ball,difficulty,false\)\*combo\.mate/);
assert.match(html,/mateCharge===100\?mateUlt\(ball\):null/);
assert.match(html,/fireUlt\(u,q\.x,q\.y,false,mateChar\)/);
assert.match(html,/\[data-mode="doubles"\]/);
console.log('doubles partner hooks verified');
