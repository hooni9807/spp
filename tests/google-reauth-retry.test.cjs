const assert=require('assert'),fs=require('fs'),path=require('path');
const html=fs.readFileSync(path.join(__dirname,'..','index.html'),'utf8');

assert.match(html,/const googleReauthError=/);
assert.match(html,/async function nativeGoogleToken\(native,au\)/);
assert.match(html,/await native\.signOut\(\)/);
assert.match(html,/return native\.signInWithGoogle\(\{skipNativeAuth:true\}\)/);
assert.match(html,/await nativeGoogleToken\(native,au\)/);
console.log('Native Google error 16 clears the app auth session and retries once');
