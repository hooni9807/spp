const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'..','index.html'),'utf8');
assert.match(html,/fitOpen\.textContent='코디'/);
assert.match(html,/skinTab\.hidden=true/);
assert.match(html,/skinOpen\.id='racket-skin-open'/);
assert.match(html,/skinOpen\.onclick=\(\)=>\{renderSkins\(\);document\.getElementById\('racket-skins'\)\.showModal\(\);\}/);
console.log('Main menu separates outfit and racket skin entry points.');
