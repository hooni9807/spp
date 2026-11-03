const {chromium}=require('playwright');
const assert=require('node:assert/strict'),fs=require('node:fs'),http=require('node:http'),path=require('node:path');
(async()=>{
 const server=http.createServer((req,res)=>{const file=new URL(req.url,'http://localhost').pathname;fs.readFile(path.join(process.cwd(),file==='/'?'index.html':file),(e,b)=>{res.statusCode=e?404:200;res.end(e?'':b);});});
 await new Promise(r=>server.listen(0,'127.0.0.1',r));
 const browser=await chromium.launch({headless:true});
 try{
  const page=await browser.newPage({viewport:{width:1440,height:1000},deviceScaleFactor:1});
  await page.goto('http://127.0.0.1:'+server.address().port);
  await page.waitForFunction(()=>typeof COURT_UNIFORM_REWORK!=='undefined');
  const results=await page.evaluate(()=>{
   sound=false;playing=false;const before=JSON.stringify({myFit,prog}),missing=[],v=document.createElement('canvas');
   const tops=FIT_TOPS.filter(x=>x[2]),bots=FIT_BOTS.filter(x=>x[2]);
   for(const [id,,look] of bots)if((look.skirt||look.legx==='vet_sauna')&&!FIT_SKIRT_CUTS[id])missing.push('skirt:'+id);
   for(const [items,cuts,slot] of [[tops,FIT_CUTS,'top'],[bots,FIT_LEG_CUTS,'bot']])for(const [id] of items){
    if(!cuts[id])missing.push(slot+':'+id);
    for(const back of [false,true])fitDrawModel(v,{top:'def',bot:'def',[slot]:id},back);
   }
   // Exercise bent legs, fore/backhand and left-handed motion with every set.
   const oldCtx=ctx,oldH=H;v.width=600;v.height=600;ctx=v.getContext('2d');H=1000;
   try{for(const set of FIT_COLLECTIONS)for(const side of [-1,1])for(const stroke of ['drive','back','smash']){
    const look=withFit(LOOKS[charType],set.fit),st={x:240,vx:120,crouch:.6,legLen:60};
    person(st,330,{x:240+side*90,y:220},side*.4,look,1.5,racketType,'#16161a',side,stroke,.12);
   }}finally{ctx=oldCtx;H=oldH;}
   // Skin must be drawn before the longer shorts and socks, not over them.
   const g=v.getContext('2d');ctx=g;g.clearRect(0,0,600,600);
   try{fitLegCloth({skin:'#ff0000',pants:'#0000ff',shorts:true,shortsLen:.85,socks:true,legCut:[13,10,'hem']},{x:100,y:100},{x:100,y:200},{x:100,y:300},1,1);}finally{ctx=oldCtx;}
   const shorts=[...g.getImageData(100,175,1,1).data],sock=[...g.getImageData(100,290,1,1).data];
   const sheet=document.createElement('canvas');sheet.id='outfit-proof';sheet.width=1440;sheet.height=Math.ceil(FIT_COLLECTIONS.length/8)*260;
   const sg=sheet.getContext('2d');sg.fillStyle='#e9edf2';sg.fillRect(0,0,sheet.width,sheet.height);
   FIT_COLLECTIONS.forEach((set,i)=>{fitDrawModel(v,set.fit);const x=i%8*180,y=Math.floor(i/8)*260;sg.drawImage(v,x,y);sg.fillStyle='#17243b';sg.font='12px sans-serif';sg.textAlign='center';sg.fillText(set.name,x+90,y+239,172);});
   document.body.replaceChildren(sheet);document.body.style.cssText='margin:0;background:#e9edf2';
   return {missing,tops:tops.length,bots:bots.length,sets:FIT_COLLECTIONS.length,shorts,sock,unchanged:before===JSON.stringify({myFit,prog})};
  });
  assert.deepEqual(results.missing,[]);assert(results.unchanged,'Rendering must not change saved equipment or progression');
  assert(results.shorts[2]>results.shorts[0],'Long shorts must cover skin');
  assert(results.sock[1]>180&&results.sock[2]>180,'Socks must cover skin');
  if(process.env.OUTFIT_PREVIEW)await page.locator('#outfit-proof').screenshot({path:process.env.OUTFIT_PREVIEW});
  console.log(results);
 }finally{await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
