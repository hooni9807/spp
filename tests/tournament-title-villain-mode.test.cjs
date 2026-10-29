const assert=require('assert'),fs=require('fs'),path=require('path');
const html=fs.readFileSync(path.join(__dirname,'..','index.html'),'utf8');

assert.match(html,/tournament:100/);
assert.doesNotMatch(html,/tournament:\{atkDrive/);
assert.match(html,/villainEventButton\.dataset\.tour='villain'/);
assert.match(html,/코닐리우 이벤트 매치/);
assert.match(html,/👕 코닐리우 유니폼/);
assert.doesNotMatch(html,/#boss-pick \[data-villain\]/);
assert.doesNotMatch(html,/data-boss="doorjung"/);
console.log('Tournament title grants coins and the villain team mode is a tournament event with an outfit reward');
