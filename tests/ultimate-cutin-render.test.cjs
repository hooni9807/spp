const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const http=require('http'),fs=require('fs'),path=require('path'),assert=require('assert/strict');

(async()=>{
  const root=process.cwd(),server=http.createServer((req,res)=>{
    const name=new URL(req.url,'http://localhost').pathname;
    const file=path.join(root,name==='/'?'index.html':name);
    fs.readFile(file,(e,b)=>e?res.writeHead(404).end():res.end(b));
  });
  await new Promise(r=>server.listen(0,'127.0.0.1',r));
  const browser=await chromium.launch({executablePath:process.env.CHROME_PATH,headless:true});
  try{
    const page=await browser.newPage({viewport:{width:390,height:700},isMobile:true,hasTouch:true}),errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    await page.goto(`http://127.0.0.1:${server.address().port}`);
    await page.waitForFunction(()=>document.getElementById('prologue-loading').hidden);
    const initial=await page.evaluate(()=>{
      $('auth-gate').close();
      playing=true;
      ball=null;
      fireUlt(ULTS[0],W/2,H/2);
      return {hasFace:ultCut?.face instanceof HTMLImageElement,hold:ultCut?.hold,deadline:ultHoldUntil,time};
    });
    assert.equal(initial.hasFace,true,'cut-in should use an image for the character face');
    assert.ok(initial.hold>1500,'the tier-four motion should have time to complete');
    await page.waitForFunction(before=>ultCut===null&&performance.now()>=before.deadline&&time>before.time,initial,{timeout:initial.hold+4000});
    const skip=await page.evaluate(()=>{
      prefs.ultSkip=true;
      fireUlt(ULTS[0],W/2,H/2);
      return {cut:ultCut,holding:ultHoldUntil>performance.now()};
    });
    assert.deepEqual(skip,{cut:null,holding:false},'disabled motion should leave the match ready to play');
    assert.deepEqual(errors,[]);
    console.log('mobile ultimate cut-in completes, releases the match and respects the motion setting');
  }finally{
    await browser.close();
    server.close();
  }
})().catch(e=>{console.error(e);process.exitCode=1;});
