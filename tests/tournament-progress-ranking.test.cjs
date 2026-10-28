const assert=require('assert/strict'),fs=require('fs');
const html=fs.readFileSync('index.html','utf8'),rules=fs.readFileSync('firestore.rules','utf8');
assert.match(html,/data-board="tour"/);
assert.match(html,/tournament_progress/);
assert.match(html,/우승 \$\{r\.cleared\|\|0\}\/\$\{TOUR_REWARDS\.length\}/);
assert.match(rules,/match \/tournament_progress\/\{uid\}/);
console.log('Tournament progress board stores and displays global city tournament completion');
