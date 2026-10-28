const assert=require('assert/strict'),fs=require('fs');
const config=require('../capacitor.config.js'),pkg=require('../package.json'),workflow=fs.readFileSync('.github/workflows/android-apk.yml','utf8');
assert.deepEqual({appId:config.appId,appName:config.appName,webDir:config.webDir},{appId:'com.hooni9807.spp',appName:'SPP',webDir:'dist'});
assert.match(pkg.scripts['android:apk'],/android:sync/);assert.match(pkg.scripts['android:apk'],/assembleDebug/);assert.match(pkg.scripts['android:release'],/bundleRelease/);
assert.match(workflow,/npm ci/);assert.match(workflow,/npm run android:release/);assert.match(workflow,/app-release\.apk/);assert.match(workflow,/app-release\.aab/);assert.match(workflow,/ANDROID_KEYSTORE_BASE64/);
assert.deepEqual(config.plugins.FirebaseAuthentication.providers,['google.com']);assert.equal(config.plugins.FirebaseAuthentication.skipNativeAuth,true);
assert.ok(fs.existsSync('android/app/google-services.json'));const login=fs.readFileSync('index.html','utf8');assert.match(login,/nativeGoogleAuth=.*Plugins\?\.FirebaseAuthentication/);assert.doesNotMatch(login,/nativeGoogleAuth=.*getPlatform/);assert.match(login,/const TEST_HOST=.*&&!NATIVE_ANDROID/);
console.log('Android wrapper and APK workflow are configured');
