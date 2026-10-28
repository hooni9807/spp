const assert=require('assert/strict'),fs=require('fs');
const html=fs.readFileSync('index.html','utf8');
assert.match(html,/partnerBall\)bodyTarget=me\.waitX\?\?=me\.x\?\?bodyTarget/);
assert.match(html,/else\{tx=mate\.waitX\?\?=mate\.x\?\?W\*\.2/);
console.log('Doubles keeps the non-hitting teammate in its waiting lane');
