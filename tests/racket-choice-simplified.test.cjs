const assert=require('assert/strict'),fs=require('fs'),vm=require('node:vm');
const html=fs.readFileSync('index.html','utf8');
assert.match(html,/querySelector\('option\[value="defense"\]'\)\?\.remove\(\)/);
assert.match(html,/\$\('gear'\)\.hidden=true;\$\('su-gear'\)\.hidden=true/);
assert.match(html,/\$\('racket'\)\.disabled=true/);
const racketSelection=html.match(/const CHAR_RACKETS=[\s\S]*?(?=\n\/\/ Campaign lineups)/)[0];
const fields=Object.fromEntries(['racket','racket-note','special-name','gear'].map(key=>[key,{}]));
const context={charType:'jersey',racketType:'shake',setCharacter(key){context.charType=key;},
 $:key=>fields[key],RACKETS:{shake:{},cpen:{},jpen:{}},racketNote:key=>key,store:{set(){}}};
vm.runInNewContext(racketSelection,context);
for(const [key,type] of [['guanwoo','cpen'],['kumho','jpen'],['pyeongtaek','shake'],['jersey','shake']]){
 context.setCharacter(key);
 assert.equal(context.racketType,type,key);
 context.setRacket(type==='jpen'?'cpen':'jpen');
 assert.equal(context.racketType,type,'The manual selection cannot override '+key);
 assert.equal(fields.racket.value,type);
 assert.equal(fields.gear.hidden,true);
}
assert.doesNotMatch(html,/if\(racketType==='shake'&&verdict==='ok'.*BLADES\[bladeType\]/);
assert.match(html,/function pendingSettings\(\)\{return \$\('character'\)\.value!==charType\|\|\$\('racket'\)\.value!==racketType\|\|\$\('difficulty'\)\.value!==difficulty;\}/);
console.log('Racket choices are limited to automatic handle types; blade and rubber choices are inactive.');
