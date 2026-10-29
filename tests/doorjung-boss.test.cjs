const assert=require('assert'),fs=require('fs'),path=require('path');
const html=fs.readFileSync(path.join(__dirname,'..','index.html'),'utf8');
assert.match(html,/doorjung:\{name:'도어정'/);
assert.match(html,/handicap:4,long612:true,lateArm:true/);
assert.match(html,/doorjungBossButton\.dataset\.boss='doorjung'/);
assert.match(html,/bossDoor\(\)\?'uhard'/);
assert.match(html,/Math\.random\(\)<\.1\)\{foe\.taunt='손바닥 가운데에 놓고 하세요!'/);
assert.match(html,/incoming==='drive'\?'cut':incoming==='cut'\?'drive'/);
console.log('Doorjung boss has handicap, serve let, 612 reversal, and delayed-arm motion');
