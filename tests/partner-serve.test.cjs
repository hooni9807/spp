const {chromium}=require('playwright');
const fs=require('fs'),http=require('http'),path=require('path'),assert=require('node:assert/strict');
(async()=>{
 const server=http.createServer((req,res)=>{const name=new URL(req.url,'http://localhost').pathname;fs.readFile(path.join(process.cwd(),name==='/'?'index.html':name),(e,b)=>e?res.writeHead(404).end():res.end(b));});
 await new Promise(r=>server.listen(0,'127.0.0.1',r));
 const browser=await chromium.launch({executablePath:process.env.CHROME_PATH,headless:true});
 try{
  const page=await browser.newPage({viewport:{width:390,height:844}});
  await page.goto(`http://127.0.0.1:${server.address().port}`);
  await page.waitForFunction(()=>typeof openPartnerTraining==='function');
  const result=await page.evaluate(()=>{
   playing=false;prog.unlocked=['jersey','leesin'];charType='jersey';mateChar='leesin';prog.coins=0;prog.q={};
   openPartnerTraining();const poor=document.querySelector('[data-train="leesin"]').disabled;
   prog.q.partner_leesin={n:20,t:0};prog.coins=5000;openPartnerTraining();
   const max=document.querySelector('[data-train="leesin"]').disabled;
   const fits=document.getElementById('partner-training').getBoundingClientRect().width<=innerWidth;
   document.getElementById('partner-training').close();
   mode='doubles';net=null;playing=true;paused=false;time=20;lastHit=-10;cdUntil=ultHoldUntil=0;
   holdServe();ball.mateServe=true;myTurn='me';
   for(let i=0;i<180&&ball?.held;i++){time+=1/60;update(1/60);}
   const serve={held:!!ball?.held,owner:ball?.owner,turn:myTurn,partnerSwung:mate.swingT>20,playerSwung:mySwing.t>20};
   playing=false;return {poor,max,fits,serve};
  });
  assert.deepEqual(result,{poor:true,max:true,fits:true,serve:{held:false,owner:'you',turn:'me',partnerSwung:true,playerSwung:false}});
  const start=await page.evaluate(()=>{
   loginGate=()=>true;openDoublesPartner();
   const training=!!document.querySelector('#doubles-partner [data-training]');
   document.querySelector('#doubles-partner .dbl-card').click();
   document.querySelector('#aipick [data-tier="hard"]').click();
   return {training,mode,playing,aiTier,mateChar};
  });
  assert.deepEqual(start,{training:true,mode:'doubles',playing:true,aiTier:'hard',mateChar:'leesin'});
  console.log('Automatic partner serve, isolated swing, upgrade limits and mobile dialog passed');
 }finally{await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
