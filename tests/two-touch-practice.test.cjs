const assert=require('assert/strict'),fs=require('fs'),path=require('path');
const source=fs.readFileSync(path.join(process.cwd(),'index.html'),'utf8');
assert.match(source,/dualRate=\(\)=>clickPrac\(\)\?1:/);
assert.match(source,/survival\(\)\|\|clickPrac\(\)\)return false/);
assert.match(source,/const practiceServe=serve;serve=function\(\)\{practiceServe\(\);if\(clickPrac\(\)&&ball\?\.owner==='ai'/);
assert.match(source,/const secondDual=!!\(ball\?\.dual&&ball\.dualHit\)/);
assert.match(source,/const dualVisualHit=!!\(secondDual&&dualSwing&&dualBeat\(ball\)\.perfect\)/);
console.log('Two-touch practice forces AI serves and returns into the two-touch flow');
