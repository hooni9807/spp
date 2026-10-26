const assert=require('assert/strict'),fs=require('fs');
const html=fs.readFileSync('index.html','utf8'),rules=fs.readFileSync('firestore.rules','utf8');
assert.match(html,/AI_RANK_CODE=\{easy:'e',hard:'h',extreme:'ex',ultra:'u',uhard:'uh',uext:'uex',unight:'unm'\}/);
assert.match(html,/rmode:.*'ai_'\+\(AI_RANK_CODE\[aiTier\]/);
assert.match(html,/rankDateTime\(r\.at\),aiRankCode\(r\),score/);
assert.match(rules,/match \/rally_ai_unm\/\{id\}/);
console.log('AI win rows include timestamp, tier code and score; nightmare uses unm');
