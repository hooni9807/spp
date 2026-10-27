const assert=require('assert'),fs=require('fs');
const readme=fs.readFileSync('README.md','utf8'),game=fs.readFileSync('index.html','utf8');
assert(!readme.includes('## 🆕 최근 업데이트'),'README should not duplicate patch history');
assert(readme.includes('게임 안 패치노트'),'README should direct players to the in-game notes');
for(const version of['v4.73','v4.64','v4.47'])assert(game.includes(version),`${version} should be in the in-game patch history`);
console.log('README patch history is available through the in-game patch notes');
