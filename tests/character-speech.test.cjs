const assert=require('node:assert/strict');
const fs=require('node:fs');
const html=fs.readFileSync('index.html','utf8');

assert.match(html,/guanwoo:\{name:'관우'.*ceremony:'엄\.\.'/);
assert.match(html,/ninja:\{name:'탈주닌자 맹타치'.*ceremony:'필줴줴이야'/);
assert.match(html,/function cleanCharacterText\(v\)/);
assert.match(html,/for\(const look of Object\.values\(LOOKS\)\).*\['name','nick','shout'\]/s);
assert.match(html,/ctx\.fillText\(noEmoji\(st\.taunt\)/);
assert.match(html,/sp\.textContent=cls==='perf'\?cleanCharacterText\(txt\):txt/);
console.log('Character names and spoken lines render without emoji; Guanwoo says 엄...');
