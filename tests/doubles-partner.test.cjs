const assert=require('node:assert'),fs=require('node:fs');
const html=fs.readFileSync('index.html','utf8');
for(const hook of ['function openDoublesPartner()','_doublesPartner','const doublesCombo=','const rawHit=hit','const rawStepBody=stepBody','🤝 '+"${c.ult}"])assert.ok(html.includes(hook),`missing ${hook}`);
assert.match(html,/P\.aiChance\(ball,difficulty,false\)\*combo\.mate/);
assert.match(html,/\[data-mode="doubles"\]/);
console.log('doubles partner hooks verified');
