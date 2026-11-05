const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const { test } = require('node:test');
const html = fs.readFileSync('index.html', 'utf8');
test('Jekyll permanently changes face after local or PVP transformation', () => {
  const jekyll = {complete:true, naturalWidth:1}, hyde = {complete:true, naturalWidth:1};
  const look={face:'sleepy',jekyll:true},context = {you:0,cpu:0,FACES:{sleepy:jekyll,hyde},LOOKS:{sleepy:look,other:{}},charType:'sleepy',aiChar:'other',jekyllTransformed:false,net:null,look};
  const jk = html.slice(html.indexOf('function jk('), html.indexOf('function napTick()'));
  const face = html.slice(html.indexOf('const faceImg='), html.indexOf('\n', html.indexOf('const faceImg=')));
  vm.runInNewContext(jk + face, context);
  assert.equal(vm.runInNewContext('faceImg(look)', context), jekyll);
  context.jekyllTransformed=true;
  assert.equal(vm.runInNewContext('faceImg(look)', context), hyde);
  context.jekyllTransformed=false;context.charType='other';context.aiChar='sleepy';context.net={opp:{ch:'sleepy',jh:true}};
  assert.equal(vm.runInNewContext('faceImg(look)', context), hyde);
  assert.match(html, /look\.jekyll&&\(FACES\.jh\|\|loadFace\('jh'\)\)/);
});
