const fs=require('fs'),assert=require('assert/strict'),vm=require('node:vm');
const html=fs.readFileSync('index.html','utf8'),retired=fs.readFileSync('partner-training.js','utf8');
const ultimates=html.match(/const ULT_TRIG=[\s\S]*?const ULT_BY=.*\n/)[0];
const result=vm.runInNewContext(`${ultimates};({
 active:ULTS.length,triggers:Object.keys(ULT_TRIG).length,uniqueTriggers:new Set(ULTS.map(u=>u.trig)).size,
 noUnlock:ULTS.every(u=>u.tier===4&&ultOk(u)),
 legacyBlocked:ALL_ULTS.filter(u=>u.tier<4).every(u=>!ultOk(u))
})`);
assert.equal(result.active,result.triggers);
assert.equal(result.uniqueTriggers,result.active);
assert.equal(result.noUnlock,true);
assert.equal(result.legacyBlocked,true);
assert.doesNotMatch(html,/_soloUlt|singlesUltWin|const ultReq=/);
assert.doesNotMatch(retired,/울트라 (?:하드|익스트림).*필살기|해금<\/b>/);
assert.match(retired,/querySelector\('\[data-mode="doubles"\]'\)\?\.remove\(\)/);
assert.match(retired,/querySelector\('\[data-stage\]'\)\?\.remove\(\)/);
assert.match(retired,/pt\.formats=\['1단식','2단식','3단식'\]/);
assert.match(retired,/setMode\('match'\);begin\(theirs\)/);
assert.doesNotMatch(retired,/setMode\('doubles'\)/);
console.log('Doubles and augment entries retire; team tournament uses singles and only tier 4 ultimates are equippable without unlock gates.');
