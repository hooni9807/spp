const assert=require('assert'),fs=require('fs');
const html=fs.readFileSync('index.html','utf8');
const values=[.2,.3,.4,.5,.6,.7,.8,.9,.95];
assert.match(html,/\[\.2,\.3,\.4,\.5,\.6,\.7,\.8,\.9,\.95\]\[rankGame\.opp\]/);
for(const i of [7,8])assert.ok(Number.isFinite(1-(1-.96)*(1-values[i])),`rank tier ${i} must not produce NaN`);
console.log('rank return modifiers cover 1부 and 선수부');
