const assert=require('assert/strict'),fs=require('fs');
const html=fs.readFileSync('index.html','utf8'),rules=fs.readFileSync('firestore.rules','utf8');
assert.match(html,/const trophyRecord=withTimestamp=>/);
assert.match(html,/rankFs\.setDoc\(rankFs\.doc\(db,'trophies',rankUid\),trophyRecord\(true\)\)/);
assert.match(rules,/match \/trophies\/\{uid\}/);
assert.match(rules,/\['name', 'trophies', 'regions', 'count', 'at'\]/);
console.log('Trophy ownership is mirrored to a private Firestore collection');
