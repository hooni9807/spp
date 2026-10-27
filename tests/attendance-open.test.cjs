const assert=require('node:assert/strict'),fs=require('node:fs');
const html=fs.readFileSync('index.html','utf8');
assert.match(html,/id='attendance-open'/);
assert.match(html,/b\.onclick=\(\)=>showAttendance\(true\)/);
assert.match(html,/showAttendance=function\(force=false\)/);
console.log('attendance menu opener verified');
