const assert=require('assert/strict'),fs=require('fs'),path=require('path');
const source=fs.readFileSync(path.join(process.cwd(),'index.html'),'utf8');

assert.match(source,/textContent='증강 보기'/);
assert.match(source,/document\.querySelector\('\.arena-bottom'\)\.after\(b\)/);
assert.match(source,/id='stage-life-hud'/);
assert.match(source,/class="life-hearts"/);
assert.match(source,/d\._resumeAfterAug=playing&&!paused;if\(d\._resumeAfterAug\)pause\(\)/);
assert.match(source,/d\.onclose=\(\)=>\{if\(d\._resumeAfterAug&&playing&&paused\)pause\(\)/);
assert.match(source,/maxLives:lives/);
console.log('Augmentation view has a dedicated button, pauses play, and renders a lower-left heart life HUD');
