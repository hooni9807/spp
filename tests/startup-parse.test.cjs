const assert=require('node:assert/strict'),fs=require('node:fs');
const scripts=[...fs.readFileSync('index.html','utf8').matchAll(/<script(?:[^>]*)>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
assert.ok(scripts.length>0);
scripts.forEach(script=>new Function(script));
console.log(`startup scripts parse: ${scripts.length}`);
