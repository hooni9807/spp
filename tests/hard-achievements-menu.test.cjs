const assert=require('node:assert/strict');
const fs=require('node:fs');
const http=require('node:http');
const path=require('node:path');
const {chromium}=require('playwright');

(async()=>{
  const root=path.resolve(__dirname,'..');
  const server=http.createServer((req,res)=>{
    const file=path.join(root,new URL(req.url,'http://localhost').pathname.replace(/^\/$/,'/index.html'));
    fs.readFile(file,(error,body)=>error?res.writeHead(404).end():res.end(body));
  });
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  let browser;
  try{
    browser=await chromium.launch({executablePath:process.env.CHROME_PATH,headless:true});
    const page=await browser.newPage();
    await page.goto(`http://127.0.0.1:${server.address().port}/`);
    await page.waitForFunction(()=>document.getElementById('tabnav'));
    const result=await page.evaluate(()=>{
      document.querySelector('[data-tab="log"]').click();
      const log=[...document.querySelectorAll('#tabsheet [data-go]')].map(el=>el.textContent.trim());
      const contrast=getComputedStyle(document.querySelector('#tabsheet button')).color;
      document.querySelector('[data-tab="social"]').click();
      const social=[...document.querySelectorAll('#tabsheet [data-go]')].map(el=>el.textContent.trim());
      const ids=['hardCutFive','hardSmashTen','hardComeback','hardWorldThree','hardWorldSweep'];
      const rewards=ids.map(id=>achievementCoinReward(id));
      const effects=ids.map(id=>titleFxText(id));
      mode='match';aiTier='unight';net=null;matchId='achievement-test';
      const hook=resultHooks.pre.find(h=>h.order===100).fn;
      hook({won:true,cr:{last:'old-match',my:4,ai:0},eon:false});
      const stale=!!tS().hardWorldSweep;
      hardMatchCut=0;hardMatchSmash=10;hardMatchComeback=false;
      const pointBefore=pointHooks.pre.find(h=>h.order===90).fn;
      const pointAfter=pointHooks.post.find(h=>h.order===90).fn;
      for(let i=0;i<5;i++){you=i;cpu=0;ball={shortCut:true,owner:'you'};const ctx={};pointBefore(ctx);you=i+1;pointAfter(ctx);}
      cpu=10;you=6;pointAfter({hardBefore:6,hardCut:false});
      hook({won:true,cr:{last:matchId,my:4,ai:0},eon:false});
      const beforeWorld=allTitles().find(t=>t[0]==='hardWorldThree')[3]();
      for(const id of ['canada','australia','japan'])tS()['world_'+id]=1;
      titleCheck();
      return {log,social,contrast,rewards,effects,stale,beforeWorld,done:ids.map(id=>allTitles().find(t=>t[0]===id)[3]()),worldFx:titleFx('atkSpin')};
    });
    assert.equal(result.log.some(x=>/튜토리얼/.test(x)),false);
    assert.equal(result.social.some(x=>/출석/.test(x)),false);
    assert.ok(result.log.length>=5);
    assert.equal(result.contrast,'rgb(245, 248, 255)');
    assert.deepEqual(result.rewards,[0,0,0,0,0]);
    assert.ok(result.effects.every(Boolean));
    assert.equal(result.stale,false);
    assert.equal(result.beforeWorld,false);
    assert.deepEqual(result.done,[true,true,true,true,true]);
    assert.ok(result.worldFx>=.005);
    console.log('Challenge achievements and bottom menus pass');
  }finally{await browser?.close();server.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
