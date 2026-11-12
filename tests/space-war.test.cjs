const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('fs'),http=require('http'),path=require('path');
(async()=>{
 const server=http.createServer((q,r)=>fs.readFile(path.join(process.cwd(),new URL(q.url,'http://local').pathname==='/'?'index.html':new URL(q.url,'http://local').pathname),(e,b)=>r.end(e?'':b)));
 await new Promise(r=>server.listen(0,r));const browser=await chromium.launch({executablePath:process.env.CHROME_PATH||'/usr/bin/chromium',headless:true});
 try{
  const p=await browser.newPage({viewport:{width:390,height:844}}),errors=[];p.on('pageerror',e=>errors.push(e.message));
  await p.goto('http://localhost:'+server.address().port);await p.waitForFunction(()=>!!window.sppSpaceConquest);
  await p.evaluate(()=>{loginGate=()=>true;prog.unlocked.push(...Object.keys(LOOKS));sound=false;document.querySelectorAll('dialog[open]').forEach(d=>d.close());});
  await p.click('#arena-open');await p.evaluate(()=>document.querySelector('#arena-pick [data-go="space"]').click());
  assert.equal(await p.locator('#space-conquest').evaluate(e=>e.open),false);assert.match(await p.locator('#arena-pick [data-go="space"] small').textContent(),/중국 클리어/);
  await p.evaluate(()=>{tS().chinaCup2=1;saveProg();document.querySelector('#arena-pick [data-go="space"]').click();});
  await p.waitForFunction(()=>document.getElementById('space-conquest').open);
  assert.equal(await p.locator('#space-conquest').count(),1);
  assert.equal(await p.locator('[data-planet]').count(),7);assert.equal(await p.locator('.sw-opponents figure').count(),3);
  assert.deepEqual(await p.locator('.sw-planets em').allTextContents(),Array(7).fill('???'));
  await p.screenshot({path:'/tmp/space-war-mobile.png'});
  const layout=await p.evaluate(()=>({width:$('space-conquest').clientWidth,scroll:$('space-conquest').scrollWidth,team:[...document.querySelectorAll('[data-space-slot]')].map(s=>s.value)}));
  assert(layout.scroll<=layout.width+1);assert.equal(new Set(layout.team).size,3);
  await p.evaluate(()=>{const s=document.querySelectorAll('[data-space-slot]');s[1].value=s[0].value;s[1].dispatchEvent(new Event('change'));});
  assert(await p.locator('.sw-launch').isDisabled());
  await p.evaluate(team=>{const s=document.querySelectorAll('[data-space-slot]');s.forEach((el,i)=>el.value=team[i]);s[0].dispatchEvent(new Event('change'));},layout.team);
  await p.click('.sw-launch');
  await p.click('.space-depart button');
  await p.waitForFunction(()=>aiTier==='unight'&&playing);
  assert.equal(await p.evaluate(()=>aiTier),'unight');
  assert.equal(await p.locator('#mode-label').textContent(),'우주전쟁 · ???');
  assert.equal(await p.evaluate(()=>P.returnRoll({type:'drive',owner:'you',defMiss:.3},'unight',.2)),.97);
  assert.equal(await p.evaluate(()=>P.returnRoll({type:'smash',owner:'you',ult:'phoenix',ultTier:4},'unight',.2)),.9);
  assert.deepEqual(await p.evaluate(()=>[P.judge('spin','drive',false,false),P.judge('spin','drive',false,false,false,true)]),['over','ok']);
  assert.deepEqual(await p.evaluate(()=>[Math.min(...sppSpaceConquest.profiles.map(p=>p.return)),Math.max(...sppSpaceConquest.profiles.map(p=>p.return)),Math.min(...sppSpaceConquest.profiles.map(p=>p.power)),Math.max(...sppSpaceConquest.profiles.map(p=>p.power)),new Set(sppSpaceConquest.profiles.map(p=>p.gimmick)).size,sppSpaceConquest.profiles.every(p=>p.ults.every(id=>!!ULT_BY[id]))]),[.97,.99,1,1.15,6,true]);
  assert.deepEqual(await p.evaluate(()=>[sppSpaceConquest.traceLengthOk(126,700),sppSpaceConquest.traceLengthOk(70,700),sppSpaceConquest.traceLengthOk(170,700)]),[true,false,false]);
  const gimmicks=await p.evaluate(()=>{const profile=sppSpaceConquest.profiles[0],old=profile.gimmick;profile.gimmick='fake';rally=3;const fake=P.aiReturn('drive',0,2.2,.2,2.5,0,1),ghosts=document.querySelectorAll('.space-gimmicks.fake i').length;rally=5;const trace=P.aiReturn('drive',0,2.2,.2,2.5,0,1);profile.gimmick=old;return {fake:fake.spaceFake,trace:trace.spaceTrace,ghosts};});assert.deepEqual(gimmicks,{fake:true,trace:true,ghosts:3});
  const forcedSwing=await p.evaluate(()=>{const liveBall=ball,before=lastHit;ball={owner:'ai',spaceTrace:true,bounces:1,x:0,y:-.3,z:.25,vy:-2,spin:0};const timing=P.timing(ball);swingMemory=null;hit('short');const blocked=lastHit===before&&!ball.traceChecked&&document.querySelector('#toast').textContent.includes('궤적 봉인');ball=liveBall;return {timing,blocked};});assert.notEqual(forcedSwing.timing,'wait');assert.equal(forcedSwing.blocked,true);
  assert.deepEqual(await p.evaluate(()=>['spaceFirst','spaceThree','spaceSweep','spaceAll','spaceVeteran'].map(id=>achievementCoinReward(id))),[0,0,0,0,0]);
  assert.deepEqual(await p.evaluate(()=>['spaceFirst','spaceThree','spaceSweep','spaceAll','spaceVeteran'].map(id=>titleFxText(id))),['상대 회전 때문에 생기는 실수 -15%','상대 필살기 받기 성공률 +7%','내 타구 성공률 +5%','상대 리턴 확률 -5% · 상대 필살기 받기 성공률 +5%','PERFECT 판정 범위 +5%']);
  const themed=await p.evaluate(()=>{const u=aiUltForTier(ULT_BY.meteor);fireUlt(u,innerWidth/2,innerHeight/2,true);return {name:u.name,fx:u.fx,visible:document.querySelector('.space-ult-effect')?.className};});assert.deepEqual(themed,{name:'붉은 유성 드라이브',fx:'meteor',visible:'space-ult-effect mars'});await p.evaluate(()=>document.querySelector('.space-ult-effect')?.remove());
  for(let i=0;i<2;i++){
   const entry=await p.evaluate(()=>({char:charType,foe:aiChar,round:sppSpaceConquest.run.round}));assert.equal(entry.char,layout.team[i]);assert.equal(entry.foe,'space_mars_'+i);assert.equal(entry.round,i);
   await p.evaluate(()=>{you=11;cpu=6;playing=false;showResult(true);showResult(true);});
   assert.equal(await p.evaluate(()=>sppSpaceConquest.run.my),i+1);
   if(i===0){await p.click('#result .sw-save-exit');await p.evaluate(()=>sppSpaceConquest.open());assert.equal(await p.evaluate(()=>sppSpaceConquest.run.round),1);await p.click('.sw-launch');}
  }
  const done=await p.evaluate(()=>{refreshAchFx();return {live:sppSpaceConquest.run.live,my:sppSpaceConquest.run.my,round:sppSpaceConquest.run.round,cleared:tS().spaceWar_mars,sweep:tS().spaceWarSweep,spin:R_('defSpin'),safe:R_('defSafe'),achievements:Object.fromEntries(['spaceFirst','spaceThree','spaceSweep','spaceAll','spaceVeteran'].map(id=>[id,allTitles().find(t=>t[0]===id)[3]()])),rank:localBoard('boss').find(r=>r.level===BOSS_LABEL.space)}});assert.equal(done.live,false);assert.equal(done.my,2);assert.equal(done.round,2);assert.equal(done.cleared,1);assert.equal(done.sweep,1);assert.ok(done.spin>=.15);assert.ok(done.safe>=.05);assert.deepEqual(done.achievements,{spaceFirst:true,spaceThree:false,spaceSweep:true,spaceAll:false,spaceVeteran:false});assert.match(done.rank.detail,/^2:0 · 화성/);assert.equal(done.rank.value,200);
  await p.evaluate(async()=>{document.querySelector('[data-boss-board="space"]').click();await showBoard('boss');});assert.equal(await p.locator('#rank-list li').count(),1);assert.ok((await p.locator('#rank-list li .sub').textContent()).includes(done.rank.character));
  await p.click('#result [data-rs="retry"]');await p.click('[data-planet="jupiter"]');await p.evaluate(team=>{document.querySelectorAll('[data-space-slot]').forEach((s,i)=>s.value=team[i]);document.querySelector('[data-space-slot]').dispatchEvent(new Event('change'));},layout.team);await p.click('.sw-launch');await p.click('.space-depart button');await p.waitForFunction(()=>aiChar==='space_jupiter_0'&&playing);
  // A 1–1 tie must play the third unique member and end at 2–1.
  for(let i=0;i<3;i++){
   const entry=await p.evaluate(()=>({char:charType,foe:aiChar}));assert.equal(entry.char,layout.team[i]);assert.equal(entry.foe,'space_jupiter_'+i);
   await p.evaluate(won=>{you=won?11:6;cpu=won?6:11;playing=false;showResult(won);},i!==1);
   if(i<2)await p.click('#result [data-rs="retry"]');
  }
  assert.deepEqual(await p.evaluate(()=>({my:sppSpaceConquest.run.my,ai:sppSpaceConquest.run.ai,live:sppSpaceConquest.run.live,round:sppSpaceConquest.run.round})),{my:2,ai:1,live:false,round:3});
  assert.deepEqual(errors,[]);console.log('PASS visible arena entry, mobile hub, seven planetary teams, boss leaderboard, 2–0 and 2–1 series, duplicate result guard');
 }finally{await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
