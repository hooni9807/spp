const assert=require('node:assert');
const fs=require('node:fs');
const html=fs.readFileSync('index.html','utf8');

assert.match(html,/guanwoo:\{name:'관우'.*chineseRubber:true,rpb:true/);
assert.match(html,/\['guanwoo','guanwoo-face\.png'\]/);
assert.match(html,/guanwoo:'cpen'/);
assert.match(html,/NEW_CHARACTER_BADGES=\[[^\]]*'guanwoo'/);
assert.match(html,/guanShortDrive.*P\.retime\(\{\.\.\.guanBaseShot,miss:false,chance:false\},ball\.y,ball\.z,\.6,1\.6\)/s);
assert.match(html,/rpb:\[\[-18,30/);
assert.match(html,/mySwing\.type=LOOKS\[charType\]\.rpb/);
assert.ok(fs.statSync('guanwoo-face.png').size>10_000,'관우 얼굴 파일이 비어 있습니다');
console.log('guanwoo character tests passed');
