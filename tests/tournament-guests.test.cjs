const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');
const html=fs.readFileSync('index.html','utf8');
for(const script of html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g))new vm.Script(script[1]);
const source=html.match(/const TOURNAMENT_FAMILY=[\s\S]*?function tournamentGuestNames\([^\n]+/)[0];
const context={Math:Object.create(Math),Set};vm.createContext(context);vm.runInContext(`${source};this.names=tournamentGuestNames`,context);
let n=0;const names=context.names(44,['김치성','아담 성'],()=>((n++*17)%101)/101);
assert.equal(names.length,44);assert.equal(new Set(names).size,44);assert(!names.includes('김치성'));assert(!names.includes('아담 성'));
assert.equal(context.names(0).length,0);
console.log('Tournament guest names are unique, varied and avoid named entrants');
