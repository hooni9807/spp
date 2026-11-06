const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('fs'),http=require('http'),path=require('path');
(async()=>{
 const server=http.createServer((q,r)=>fs.readFile(path.join(process.cwd(),new URL(q.url,'http://local').pathname==='/'?'index.html':new URL(q.url,'http://local').pathname),(e,b)=>r.end(e?'':b)));
 await new Promise(r=>server.listen(0,r));
 const browser=await chromium.launch({executablePath:process.env.CHROME_PATH||'/usr/bin/chromium',headless:true});
 try{
  const p=await browser.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));
  await p.emulateMedia({reducedMotion:'reduce'});await p.goto('http://localhost:'+server.address().port);
  await p.waitForFunction(()=>typeof worldMatchSession!=='undefined');
  for(const scenario of ['new','resume-idle','resume-playing','animation-failure']){
   await p.evaluate(scenario=>{
    loginGate=()=>true;net=null;playing=false;sound=false;prog.unlocked.push(...Object.keys(LOOKS));
    for(const k of Object.keys(EURO_CUPS))tS()['world_'+k]=1;
    document.querySelectorAll('dialog[open]').forEach(d=>d.close());
    euroRun=null;chinaRun=null;localStorage.removeItem(euroKey('india'));
    if(scenario.startsWith('resume')){
     const chars=unlockedCharacters();euroRun={country:'india',order:[0,1,2,3,4,5,6],round:2,my:1,ai:1,used:chars.slice(0,2),lineup:{0:chars[0],1:chars[1],2:chars[2]},character:chars[2],live:true,last:null};
     if(scenario==='resume-playing'){euroGame();paused=true;}else euroSave();
    }
    $('world-map').showModal();euroMap('india');
    if(scenario==='animation-failure')$('world-plane').animate=()=>{throw Error('WebView animation unavailable');};
   },scenario);
   await p.click('#euro-depart');
   await p.waitForFunction(()=>!!document.getElementById('world-lineup')?.open||!!document.getElementById('china-cup-info')?.open);
   const state=await p.evaluate(()=>({map:$('world-map').open,lineup:!!$('world-lineup')?.open,china:!!$('china-cup-info')?.open,playing,round:euroRun?.round,my:euroRun?.my,ai:euroRun?.ai}));
   assert.equal(state.map,false,scenario);assert.equal(state.playing,false,scenario);
   if(scenario.startsWith('resume')){assert.equal(state.round,2);assert.equal(state.my,1);assert.equal(state.ai,1);}
   assert(state.lineup,scenario);
  }
  assert.deepEqual(errors,[]);console.log('PASS fresh departure, saved resume, paused campaign and animation failure');
 }finally{await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
