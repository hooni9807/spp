const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync('index.html','utf8');
const rule=html.match(/const seohyunCounter=\(stack,bonus,roll\)=>\{[^;]+;return \{[^;]+;\};/);
assert.ok(rule,'shared counter rule exists');
const context={};vm.createContext(context);vm.runInContext(rule[0]+'globalThis.counter=seohyunCounter;',context);
let state=0;
for(const power of [1.1,1.2,1.3]){const hit=context.counter(state,false,.99);assert.equal(hit.power,power);assert.equal(hit.jaetgi,false);state=hit.stack;}
assert.equal(context.counter(state,false,.049).jaetgi,true);
assert.equal(context.counter(state,false,.05).jaetgi,false);
assert.equal(context.counter(state,true,.099).jaetgi,true);
assert.equal(context.counter(state,true,.1).jaetgi,false);
assert.equal(context.counter(1,true,0).jaetgi,false);
assert.match(html,/tech_seohyun_jaetgi:\['일병3호봉 맞드라이브 재끼기',50\]/);
assert.match(html,/questHit\('tech_seohyun_jaetgi'\)/);
console.log('Seohyun stacking and achievement chance verified');
