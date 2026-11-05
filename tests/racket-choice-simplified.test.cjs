const assert=require('assert'),fs=require('fs');
const html=fs.readFileSync('index.html','utf8');
assert.match(html,/querySelector\('option\[value="defense"\]'\)\?\.remove\(\)/);
assert.match(html,/\$\('gear'\)\.hidden=true;\$\('su-gear'\)\.hidden=true/);
assert.match(html,/const CHAR_RACKETS=\{jersey:'shake'.*ttalgak:'cpen'.*pyeongtaek:'jpen'/);
assert.match(html,/const charRacket=k=>CHAR_RACKETS\[k\]\|\|\(LOOKS\[k\]\?\.pen\?'jpen':'shake'\)/);
assert.doesNotMatch(html,/if\(racketType==='shake'&&verdict==='ok'.*BLADES\[bladeType\]/);
assert.match(html,/function pendingSettings\(\)\{return \$\('character'\)\.value!==charType\|\|\$\('racket'\)\.value!==racketType\|\|\$\('difficulty'\)\.value!==difficulty;\}/);
console.log('Racket choices are limited to automatic handle types; blade and rubber choices are inactive.');
