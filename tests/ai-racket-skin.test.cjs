const assert=require('assert'),fs=require('fs');
const html=fs.readFileSync('index.html','utf8');
assert.match(html,/skinDef=showEnhanceFx&&typeof equippedSkin/);
assert.match(html,/if\(showEnhanceFx\)for\(let i=0;i<orbitRewards\.length;i\+\+\)/);
assert.match(html,/racket\(tgt\.x,tgt\.y,ang,type,face,racketScale,skin,st===me\)/);
console.log('AI rackets do not inherit player skins or trophy effects');
