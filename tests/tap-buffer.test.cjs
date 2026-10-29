const assert=require('assert/strict'),fs=require('fs'),path=require('path');
const source=fs.readFileSync(path.join(process.cwd(),'index.html'),'utf8');
assert.match(source,/const TAP_BUFFER_MS=160/);
assert.match(source,/function queueTap\(tap\)\{tapBuffer=\{tap,until:performance\.now\(\)\+TAP_BUFFER_MS/);
assert.match(source,/flushTapBuffer\(\);hit\(\);/);
assert.match(source,/queueTap\('dual'\)/);
console.log('Fast-tap input buffer is wired into normal and two-touch input');
