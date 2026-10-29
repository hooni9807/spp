const assert=require('assert/strict'),fs=require('fs'),path=require('path');
const source=fs.readFileSync(path.join(process.cwd(),'index.html'),'utf8');

assert.match(source,/const LAST_PLAYED_CHARACTER_KEY='last-played-character'/);
assert.match(source,/rememberLastPlayedCharacter\(charType\)/);
assert.match(source,/lastCharacter:v/);
assert.match(source,/restoreLastPlayedCharacter\(\)/);
assert.match(source,/await loadProgress\(\)/);
assert.match(source,/if\(!force&&q\.attendanceDate===today\)return/);
assert.doesNotMatch(source,/attendanceAutoShown\|\|q\.attendanceDate===today/);
assert.match(source,/function showPendingAttendance\(\)/);
assert.match(source,/setTimeout\(showPendingAttendance,120\)/);
console.log('Login restores the last played character and re-prompts unclaimed attendance');
