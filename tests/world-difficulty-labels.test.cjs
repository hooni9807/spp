const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const http=require('node:http');
const path=require('node:path');
(async()=>{
 const server=http.createServer((req,res)=>{const name=new URL(req.url,'http://localhost').pathname;fs.readFile(path.join(process.cwd(),name==='/'?'index.html':name),(err,data)=>res.end(err?'':data));});
 await new Promise(resolve=>server.listen(0,resolve));
 const browser=await chromium.launch({headless:true});
 try{
  const page=await browser.newPage({viewport:{width:1100,height:850}});
  await page.goto('http://localhost:'+server.address().port);
  await page.waitForFunction(()=>typeof WORLD_COUNTRY_TOTAL!=='undefined'&&document.querySelectorAll('#world-map .world-map-tag').length===WORLD_COUNTRY_TOTAL);
  const badges=await page.locator('#world-map .world-map-tag').count();
  assert.equal(badges,22);
  assert.equal(await page.locator('#world-map [data-region="europe"]').count(),0);
  assert.equal(await page.locator('#world-map .world-korea-pin').count(),1);
  assert.equal(await page.locator('#world-map .world-map-tag[data-tier="HELL+++"]').count(),1);
  await page.evaluate(()=>document.querySelector('#world-map').showModal());
  await page.locator('#world-map').screenshot({path:'/tmp/spp-world-difficulty.png'});
  await page.setViewportSize({width:390,height:844});
  await page.evaluate(()=>{document.querySelector('.world-map-canvas').style.width='300%';const atlas=document.querySelector('#world-map .world-atlas');atlas.scrollLeft=atlas.scrollWidth*.63;});
  await page.locator('#world-map').screenshot({path:'/tmp/spp-world-difficulty-mobile.png'});
  console.log(`${badges} country difficulty badges verified`);
 }finally{await browser.close();server.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
