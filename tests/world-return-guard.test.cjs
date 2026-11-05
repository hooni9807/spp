const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict');
const html=fs.readFileSync('index.html','utf8'),world=fs.readFileSync('world-effects.js','utf8');
const physics=[...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)].find(m=>m[1].includes('root.PingPhysics='))[1];
const c={module:{exports:{}},Math};c.globalThis=c;vm.createContext(c);vm.runInContext(physics,c);c.P=c.module.exports;c.worldCampaignActive=()=>true;
vm.runInContext(world.slice(world.indexOf('function worldReturnLanding('),world.indexOf('let worldMatchSession=')),c);
let state=823,changed=0;const random=()=>((state=(state*1664525+1013904223)>>>0)/4294967296);
for(let i=0;i<800;i++){c.P.EQUIP.spin=.8+random()*.5;const b={owner:'ai',x:(random()-.5)*1.2,y:1.7+random()*1.5,z:.24+random()*1.2,vx:(random()-.5)*8,vy:-(2+random()*14),vz:(random()-.5)*8,spin:(random()-.5)*8,side:(random()-.5)*8,curveK:1.2};if(c.worldReturnGuard(b))changed++;for(const dt of [1/60,1/120,1/240])assert(c.worldReturnLanding(b,dt).ok,JSON.stringify({i,b,dt}));}
const miss={owner:'ai',x:0,y:2,z:1,vx:4,vy:-8,vz:2,spin:1,side:0,miss:'over'},before={...miss};assert.equal(c.worldReturnGuard(miss),false);assert.deepEqual(miss,before);
console.log(`PASS 800 world strong/curved shots at three frame steps; ${changed} invalid trajectories repaired; deliberate faults preserved`);
