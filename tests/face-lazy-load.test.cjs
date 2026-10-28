const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const html=fs.readFileSync('index.html','utf8');
const source=html.slice(html.indexOf('const HEAD_FITS='),html.indexOf('// Each racket\'s special:'));
let requests=0;
class ImageMock { set src(value){this.value=value;requests++;} }
const context={Image:ImageMock,refreshUnlockIllustrations(){},charType:'jersey'};
vm.runInNewContext(`${source};this.load=loadFace;this.faces=FACES;`,context);
assert.equal(requests,0,'startup must not request every face');
assert.ok(context.load('minhee'));
assert.equal(requests,1);
assert.equal(context.load('minhee'),context.faces.minhee,'a requested face is cached');
assert.equal(requests,1);
assert.equal(context.load('unknown'),null);
assert.match(fs.readFileSync('prologue.js','utf8'),/loadFace\(key\)\.decode\(\)/);
assert.match(fs.readFileSync('prologue-match.js','utf8'),/face:loadFace\(cast\[effectHit%2\]\)/);
console.log('Character faces load on demand');
