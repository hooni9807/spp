const assert=require('assert/strict'),fs=require('fs');
const config=require('../capacitor.config.js'),pkg=require('../package.json'),workflow=fs.readFileSync('.github/workflows/android-apk.yml','utf8');
assert.deepEqual({appId:config.appId,appName:config.appName,webDir:config.webDir},{appId:'com.hooni9807.spp',appName:'SPP',webDir:'dist'});
assert.match(pkg.scripts['android:apk'],/android:sync/);assert.match(pkg.scripts['android:apk'],/assembleDebug/);
assert.match(workflow,/npm ci/);assert.match(workflow,/npm run android:apk/);assert.match(workflow,/app-debug\.apk/);
console.log('Android wrapper and APK workflow are configured');
