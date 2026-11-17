// Reproduce guide illustrations with the game's renderer, not generated mockups.
const {chromium}=require('playwright'),fs=require('node:fs'),http=require('node:http'),path=require('node:path'),assert=require('node:assert/strict');
(async()=>{
 const root=path.resolve(__dirname,'..'),out=path.join(root,'assets/playbook');
 fs.mkdirSync(out,{recursive:true});
 const server=http.createServer((q,r)=>{const name=new URL(q.url,'http://local').pathname,file=path.join(root,name==='/'?'index.html':name);fs.readFile(file,(e,b)=>{r.statusCode=e?404:200;r.end(e?'':b);});});
 await new Promise(r=>server.listen(0,'127.0.0.1',r));
 const browser=await chromium.launch({executablePath:process.env.CHROME_PATH||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
 try{
  const page=await browser.newPage({viewport:{width:1280,height:950}});
  await page.goto('http://127.0.0.1:'+server.address().port);
  await page.waitForFunction(()=>!!window.sppSpaceConquest);
  await page.evaluate(()=>{loginGate=()=>true;sound=false;prog.unlocked.push('jersey','percival');document.querySelectorAll('dialog[open]').forEach(d=>d.close());document.body.classList.remove('prologue-open');begin('jersey');playing=false;paused=false;document.querySelectorAll('dialog[open]').forEach(d=>d.close());$('overlay').classList.add('hidden');});
  await page.evaluate(()=>{clearTimeout(cdT);cdUntil=0;$('cd').hidden=true;setCharacter('jersey');gear={table:TABLES[2],ball:BALLS[2]};Object.assign(P.EQUIP,{speed:1,spin:1,len:1});});
  const scenes=[['timing','일반 타이밍 링','drive',false,false],['dual','투터치 · 첫 원과 두 번째 원','drive',true,false],['chance','찬스볼 · 높게 뜬 공','block',false,true]];
  for(const [id,label,type,dual,chance] of scenes){
   await page.evaluate(({type,dual,chance})=>{ball={x:.12,y:-.25,z:chance?.65:.25,vx:0,vy:-3,vz:-.4,spin:type==='block'?.2:1,side:0,owner:'ai',type,bounces:1,retreat:0,dual,dualHit:false,chance};trail=[];fx=[];pops=[];time=10;render();},{type,dual,chance});
   await page.locator('.court-wrap').screenshot({path:path.join(out,id+'.png')});
  }
  const video=await page.evaluate(async()=>{
   const stream=canvas.captureStream(20),recorder=new MediaRecorder(stream,{mimeType:'video/webm'}),chunks=[];
   recorder.ondataavailable=e=>{if(e.data.size)chunks.push(e.data);};
   const finished=new Promise(resolve=>recorder.onstop=resolve);recorder.start();
   for(const dual of [false,true]){
    ball={x:.12,y:1.2,z:.4,vx:0,vy:-1.2,vz:1,spin:1,side:0,owner:'ai',type:'drive',bounces:1,retreat:0,dual,dualHit:false};
    for(let i=0;i<35;i++){P.step(ball,1/40);render();await new Promise(r=>setTimeout(r,50));}
   }
   recorder.stop();await finished;stream.getTracks().forEach(t=>t.stop());
   return await new Promise(resolve=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result.split(',')[1]);reader.readAsDataURL(new Blob(chunks,{type:'video/webm'}));});
  });
  fs.writeFileSync(path.join(out,'incoming-demo.webm'),Buffer.from(video,'base64'));
  const measurements=await page.evaluate(()=>{
   Object.assign(P.EQUIP,{speed:1,spin:1,len:1});net=null;
   return ['jersey','percival'].flatMap(ch=>{charType=ch;return [[3,1],[6,1],[3,3.8]].map(([speed,spin])=>{const b={owner:'ai',type:'drive',bounces:1,x:0,y:-.25,z:.25,vy:-speed,spin};return {character:ch,speed,spin,perfectSpan:+P.perfectSpan(b).toFixed(5),nominalMilliseconds:+(P.perfectSpan(b)/speed*1000).toFixed(2),spinFactor:+P.spinTimingFactor(b).toFixed(4)};});});
  });
  assert.equal(measurements.length,6);assert(measurements[1].nominalMilliseconds<measurements[0].nominalMilliseconds);
  assert(measurements[3].perfectSpan<measurements[0].perfectSpan);
  fs.writeFileSync(path.join(out,'measurements.json'),JSON.stringify({checked:'2026-11-17',method:'P.perfectSpan / abs(vy); EQUIP=1; no net, deep, sway, easy or hiddenPerfectBoost. This is a formula-derived nominal interval, not wall-clock touch latency or win rate.',rows:measurements},null,2)+'\n');
  console.log(JSON.stringify(measurements,null,2));
 }finally{await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
