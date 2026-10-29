const assert=require('assert'),fs=require('fs'),path=require('path');
const html=fs.readFileSync(path.join(__dirname,'..','index.html'),'utf8');

assert.match(html,/tournament:100/);
assert.doesNotMatch(html,/tournament:\{atkDrive/);
assert.match(html,/#boss-pick \[data-villain\]\{border:2px solid #ffca4b!important;animation:villainGlow/);
assert.doesNotMatch(html,/data-boss="doorjung"/);
console.log('Tournament title grants coins and the villain team mode has the animated new-mode border');
