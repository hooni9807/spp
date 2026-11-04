const assert=require('assert'),fs=require('fs');
const html=fs.readFileSync('index.html','utf8');
assert.match(html,/skinDef=showEnhanceFx&&typeof equippedSkin/);
assert.match(html,/if\(showEnhanceFx&&enhanc/);
// Only the local player (and the local doubles partner) get skin/enhance effects; trophy orbit was removed on purpose.
assert.match(html,/racket\(tgt\.x,tgt\.y,ang,type,face,racketScale,skin,st===me\|\|\(mode==='doubles'&&!net&&st===mate\),st===foe/);
console.log('AI rackets do not inherit player skins or trophy effects');
