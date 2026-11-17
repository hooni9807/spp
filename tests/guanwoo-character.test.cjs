const assert=require('node:assert');
const fs=require('node:fs');
const vm=require('node:vm');
const html=fs.readFileSync('index.html','utf8');

assert.match(html,/guanwoo:\{name:'관우'.*chineseRubber:true,rpb:true/);
assert.match(html,/\['guanwoo','guanwoo-face\.png'\]/);
assert.match(html,/guanwoo:'cpen'/);
assert.match(html,/NEW_CHARACTER_BADGES=\[[^\]]*'guanwoo'/);
assert.match(html,/CHARACTER_ORDER=\[\s*'jersey'[\s\S]*'kumho','guanwoo','songstar'/);
const guanDriveCode=html.match(/const guanDrive=.*\nif\(guanShortDrive\).*\n/)[0];
const guanDrive=new vm.Script(`let shot={miss:true,chance:true},flair='err';const guanBaseShot={...shot};\n${guanDriveCode}\nshot`);
for(const [completed,expectedSpeed] of [[false,0.6],[true,1.2]]){
 const result=guanDrive.runInNewContext({
  LOOKS:{guanwoo:{chineseRubber:true}},charType:'guanwoo',resp:'drive',ball:{bounces:1,y:0,z:0.3},
  P:{shortLeft:()=>0.25,retime:(shot,_y,_z,speed,spin)=>({...shot,speed,spin})},
  techDone:key=>key==='tech_guanwoo_short'&&completed,toast(){}
 });
 assert.equal(result.speed,expectedSpeed);
 assert.equal(result.spin,1.6);
 assert.equal(result.miss,false);
 assert.equal(result.chance,false);
}
assert.match(html,/rpb:\[\[-18,30/);
assert.match(html,/mySwing\.type=LOOKS\[charType\]\.rpb/);
assert.ok(fs.statSync('guanwoo-face.png').size>10_000,'관우 얼굴 파일이 비어 있습니다');
console.log('guanwoo character tests passed');
