const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('fs'),http=require('http'),path=require('path');
(async()=>{
 const server=http.createServer((q,r)=>fs.readFile(path.join(process.cwd(),new URL(q.url,'http://local').pathname==='/'?'index.html':new URL(q.url,'http://local').pathname),(e,b)=>r.end(e?'':b)));
 await new Promise(r=>server.listen(0,r));const browser=await chromium.launch({executablePath:process.env.CHROME_PATH||'/usr/bin/chromium',headless:true});
 try{
  const p=await browser.newPage({viewport:{width:390,height:844}}),errors=[];p.on('pageerror',e=>errors.push(e.message));
  await p.goto('http://localhost:'+server.address().port);await p.waitForFunction(()=>!!window.sppSpaceConquest);
  await p.evaluate(()=>{loginGate=()=>true;prog.unlocked.push(...Object.keys(LOOKS));sound=false;document.querySelectorAll('dialog[open]').forEach(d=>d.close());});
  await p.click('#arena-open');await p.click('#arena-pick [data-go="space"]');
  await p.waitForFunction(()=>document.getElementById('space-conquest').open);
  assert.equal(await p.locator('#space-conquest').count(),1);
  assert.equal(await p.locator('[data-planet]').count(),7);assert.equal(await p.locator('.sw-opponents figure').count(),3);
  await p.screenshot({path:'/tmp/space-war-mobile.png'});
  const layout=await p.evaluate(()=>({width:$('space-conquest').clientWidth,scroll:$('space-conquest').scrollWidth,team:[...document.querySelectorAll('[data-space-slot]')].map(s=>s.value)}));
  assert(layout.scroll<=layout.width+1);assert.equal(new Set(layout.team).size,3);
  await p.evaluate(()=>{const s=document.querySelectorAll('[data-space-slot]');s[1].value=s[0].value;s[1].dispatchEvent(new Event('change'));});
  assert(await p.locator('.sw-launch').isDisabled());
  await p.evaluate(team=>{const s=document.querySelectorAll('[data-space-slot]');s.forEach((el,i)=>el.value=team[i]);s[0].dispatchEvent(new Event('change'));},layout.team);
  await p.click('.sw-launch');
  for(let i=0;i<2;i++){
   const entry=await p.evaluate(()=>({char:charType,foe:aiChar,round:sppSpaceConquest.run.round}));assert.equal(entry.char,layout.team[i]);assert.equal(entry.foe,'space_mars_'+i);assert.equal(entry.round,i);
   await p.evaluate(()=>{you=11;cpu=6;playing=false;showResult(true);showResult(true);});
   assert.equal(await p.evaluate(()=>sppSpaceConquest.run.my),i+1);
   if(i===0){await p.click('#result .sw-save-exit');await p.evaluate(()=>sppSpaceConquest.open());assert.equal(await p.evaluate(()=>sppSpaceConquest.run.round),1);await p.click('.sw-launch');}
  }
  const done=await p.evaluate(()=>({live:sppSpaceConquest.run.live,my:sppSpaceConquest.run.my,round:sppSpaceConquest.run.round,cleared:tS().spaceWar_mars}));assert.deepEqual(done,{live:false,my:2,round:2,cleared:1});
  await p.click('#result [data-rs="retry"]');await p.click('[data-planet="jupiter"]');await p.evaluate(team=>{document.querySelectorAll('[data-space-slot]').forEach((s,i)=>s.value=team[i]);document.querySelector('[data-space-slot]').dispatchEvent(new Event('change'));},layout.team);await p.click('.sw-launch');
  // A 1–1 tie must play the third unique member and end at 2–1.
  for(let i=0;i<3;i++){
   const entry=await p.evaluate(()=>({char:charType,foe:aiChar}));assert.equal(entry.char,layout.team[i]);assert.equal(entry.foe,'space_jupiter_'+i);
   await p.evaluate(won=>{you=won?11:6;cpu=won?6:11;playing=false;showResult(won);},i!==1);
   if(i<2)await p.click('#result [data-rs="retry"]');
  }
  assert.deepEqual(await p.evaluate(()=>({my:sppSpaceConquest.run.my,ai:sppSpaceConquest.run.ai,live:sppSpaceConquest.run.live,round:sppSpaceConquest.run.round})),{my:2,ai:1,live:false,round:3});
  assert.deepEqual(errors,[]);console.log('PASS visible arena entry, mobile hub, seven planetary teams, distinct lineup, 2–0 and 2–1 series, duplicate result guard');
 }finally{await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
