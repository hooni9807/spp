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
        const effects=[5.3,9.6].map(seconds=>{drawPrologueMatch(canvas,seconds);return {id:canvas.dataset.ultimate,shot:canvas.dataset.shot};});
        return {effects,tiers:[ULT_BY.radiant.tier,ULT_BY.phoenix.tier],copy:document.getElementById('prologue-story-copy').textContent,hud:document.querySelector('.pl-match-hud').textContent,unchanged:before===JSON.stringify([W,H,view,time,mode,YAW,me,foe,you,cpu,playing,VIEWS.tp,ultFx,ultCut,ball,prog])};
      });
      assert.deepEqual(result.effects,[{id:'radiant',shot:'민희쌤 · 빛의 반격'},{id:'phoenix',shot:'만취범 · 불사조 스매시'}]);
      assert.deepEqual(result.tiers,[4,3]);
      assert.match(result.copy,/민희쌤 vs 만취범/);
      assert.match(result.hud,/민희쌤.*만취범/);
      assert.equal(result.unchanged,true);
      if(options.reducedMotion){const before=Number(await page.locator('#prologue-court').getAttribute('data-rally'));await page.waitForTimeout(2800);const after=Number(await page.locator('#prologue-court').getAttribute('data-rally'));assert.ok(after>before,'reduced-motion prologue still advances the rally');}
      await page.close();
    }
    assert.deepEqual(errors,[]);
    console.log('prologue ultimate relay preview preserves gameplay state');
  }finally{await browser.close();server.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
