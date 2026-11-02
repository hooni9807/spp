const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const china=fs.readFileSync('china-cup.js','utf8'),europe=fs.readFileSync('europe-cups.js','utf8');
const context={showResult(){},chinaActive:()=>true,euroActive:()=>true,matchId:'one',aiChar:'china_test',EURO_CUPS:{japan:{name:'Japan'}},euroSave(){},saveProg(){},tS:()=>({}),$:()=>({querySelector:()=>({})})};
vm.createContext(context);
vm.runInContext(china.split('\n').find(l=>l.startsWith('function restoreWorldUsage')),context);
for(const [source,key] of [[china,'chinaRun'],[europe,'euroRun']]){
 // 결과 처리는 onResult 훅으로 등록된다: 등록된 pre/post 훅을 차례로 부르는 showResult를 흉내 낸다.
 const hooks={pre:[],post:[]};context.onResult=(when,order,fn)=>hooks[when].push(fn);
 context.showResult=won=>{const c={won};hooks.pre.forEach(f=>f(c));hooks.post.forEach(f=>f(c));};
 for(const l of source.split('\n').filter(l=>l.startsWith('onResult(')))vm.runInContext(l,context);
 context[key]={used:[],character:'jersey',my:0,ai:0,round:0,live:true,country:'japan'};
 context.matchId='loss';context.showResult(false);
 assert.equal(context[key].used.length,0,'Loss must leave character available');
 context.matchId='win';context.showResult(true);
 assert.deepEqual(Array.from(context[key].used),['jersey']);
 context.showResult(true);assert.equal(context[key].used.length,1,'Duplicate result must not consume twice');
}
const legacy={round:1,lineup:{0:'jersey',1:'leesin'},used:['jersey','leesin']};
context.restoreWorldUsage(legacy);
assert.deepEqual(Array.from(legacy.used),['jersey'],'Resume must release unfinished entrant');
context.restoreWorldUsage(legacy);assert.equal(legacy.used.length,1);
assert(!china.includes('used:[...used,character]'));
assert(!europe.includes('euroRun.used.push(euroRun.character)'));
console.log('World conquest: win-only usage, loss reuse, duplicate result and legacy interrupted entry passed');
