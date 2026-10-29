const assert=require('assert'),fs=require('fs'),path=require('path');
const html=fs.readFileSync(path.join(__dirname,'..','index.html'),'utf8');
assert.match(html,/doorjung:\{name:'도어정'/);
assert.match(html,/handicap:4,long612:true,lateArm:true/);
assert.doesNotMatch(html,/doorjungBossButton/);
assert.doesNotMatch(html,/data-boss='doorjung'/);
assert.match(html,/const VILLAINS=\['doorjung','nemseop','stoneryu'\]/);
console.log('Doorjung remains only in the 3-villain team mode, not as a standalone boss');
