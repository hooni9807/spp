const assert=require('assert/strict'),fs=require('fs');
const rules=fs.readFileSync('firestore.rules','utf8'),section=rules.match(/match \/attendance_records\/\{uid\} \{([\s\S]*?)\n    \}/)?.[1]||'';
assert.match(section,/allow read: if request\.auth != null && request\.auth\.uid == uid;/);
assert.doesNotMatch(section,/allow (?:create|update|delete|write)/);
console.log('Attendance receipts are read-only for browser clients');
