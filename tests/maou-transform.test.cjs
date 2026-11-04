const assert=require('node:assert/strict');
const fs=require('node:fs');

const html=fs.readFileSync(new URL('../index.html',`file://${__filename}`),'utf8');

assert.match(html,/const maouFight=\(\)=>mode==='boss'&&!net&&bossChoice==='boss'/);
assert.match(html,/AI_CHARS\.filter\(k=>k!==maouForm\)/,'the next form must not repeat');
assert.match(html,/maouForm=aiChar=next;aiLefty=!!LOOKS\[next\]\.lefty;aiUltSet=rollAiUlts\(\);rollAiRunes\(\)/,'form traits and combat setup must follow the transformed character');
assert.match(html,/updateScore\(\);if\(maouFight\(\)&&\(Math\.max\(you,cpu\)<11\|\|Math\.abs\(you-cpu\)<2\)\)transformMaou\(\)/,'transform after every non-final point');
assert.match(html,/P\.power\(ball,ball\.y,ball\.z,1\.15\).*ball\.spin\*=1\.15/,'copied attacks must receive the 15% boss boost');
assert.match(html,/BOSS_LABEL\[bossChoice\]/,'ranking must keep the original boss identity');
assert.match(html,/bossChoice==='boss'\?'maou'/,'achievement must keep the original boss identity');

console.log('maou transform checks passed');
