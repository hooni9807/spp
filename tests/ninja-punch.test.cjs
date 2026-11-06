const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync('index.html','utf8');
const start=html.indexOf("if(LOOKS[charType].noDrive&&techDone('tech_ninja_short')&&tap");
const end=html.indexOf('if(shot.counterJaetgi)',start);
assert.ok(start>0&&end>start);
const punch=html.slice(start,end);
function hit({unlocked=true,tap='short',side=-1,shot='short',roll=.049}={}){
 const c={LOOKS:{ninja:{noDrive:true}},charType:'ninja',techDone:()=>unlocked,tap,playerSide:side,fhDir:()=>1,verdict:'ok',special:false,shot:{type:shot,miss:false,chance:false},flair:'',ball:{unreturn:false},toast:()=>{},Math:{random:()=>roll}};
 vm.createContext(c);vm.runInContext(punch,c);return c.ball.unreturn;
}
assert.equal(hit(),true);
assert.equal(hit({roll:.05}),false);
assert.equal(hit({unlocked:false}),false);
assert.equal(hit({tap:null}),false);
assert.equal(hit({side:1}),false);
assert.equal(hit({shot:'drive'}),false);
assert.match(html,/tech_ninja_short:\['맹타치 쇼트',500\]/);
assert.match(html,/questHit\('tech_ninja_short'\)/);
console.log('Ninja punch unlock, shot and 5% chance verified');
