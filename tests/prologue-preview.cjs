const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const http=require('http'),fs=require('fs'),path=require('path'),assert=require('assert/strict');

(async()=>{
  const root=process.cwd();
  const server=http.createServer((req,res)=>{
    const pathname=new URL(req.url,'http://localhost').pathname;
    const file=path.join(root,pathname==='/'?'index.html':pathname);
    fs.readFile(file,(error,body)=>{
      if(error)return res.writeHead(404).end();
      res.setHeader('Content-Type',({'.html':'text/html','.js':'application/javascript','.css':'text/css','.png':'image/png'})[path.extname(file)]||'application/octet-stream');
      res.end(body);
    });
  });
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const origin=`http://127.0.0.1:${server.address().port}`;
  const browser=await chromium.launch({executablePath:process.env.CHROME_PATH,headless:true});
  const errors=[];
  try{
    for(const options of [{viewport:{width:1440,height:960}},{viewport:{width:390,height:844}},{viewport:{width:390,height:844},reducedMotion:'reduce'}]){
      const page=await browser.newPage(options);
      page.on('pageerror',error=>errors.push(error.message));
      await page.route('**/*',route=>route.request().url().startsWith(origin)?route.continue():route.abort());
      await page.goto(origin);
      await page.waitForFunction(()=>document.getElementById('prologue-loading').hidden);
      const result=await page.evaluate(()=>{
        const canvas=document.getElementById('prologue-court');
        const before=JSON.stringify([W,H,view,time,mode,YAW,me,foe,you,cpu,playing,VIEWS.tp,ultFx,ultCut,ball,prog]);
        const towns=[.3,3.3,6.3,9.3].map(seconds=>{drawPrologueMatch(canvas,seconds);return canvas.dataset.town;});
        return {towns,unchanged:before===JSON.stringify([W,H,view,time,mode,YAW,me,foe,you,cpu,playing,VIEWS.tp,ultFx,ultCut,ball,prog])};
      });
      assert.deepEqual(result.towns,['스핀항','드라이브시','커트골','챔피언 광장']);
      assert.equal(result.unchanged,true);
      if(options.reducedMotion){const before=await page.locator('#prologue-court').evaluate(canvas=>canvas.toDataURL());await page.waitForTimeout(2800);const after=await page.locator('#prologue-court').evaluate(canvas=>canvas.toDataURL());assert.notEqual(after,before,'reduced-motion prologue still moves the player');}
      await page.close();
    }
    assert.deepEqual(errors,[]);
    console.log('prologue tournament map preview preserves gameplay state');
  }finally{await browser.close();server.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
