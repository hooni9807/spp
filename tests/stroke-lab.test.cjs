const assert=require('node:assert/strict'),fs=require('node:fs'),http=require('node:http'),path=require('node:path');
const {chromium}=require('playwright');
(async()=>{
 const server=http.createServer((q,r)=>{
  const file=new URL(q.url,'http://local').pathname;
  if(!['/stroke-lab.html','/stroke-lab.js','/library.css'].includes(file)){r.writeHead(404).end();return;}
  r.setHeader('Content-Type',file.endsWith('.html')?'text/html; charset=utf-8':file.endsWith('.js')?'text/javascript':'text/css');
  fs.createReadStream(path.join(__dirname,'..',file)).pipe(r);
 });
 await new Promise(r=>server.listen(0,'127.0.0.1',r));
 let browser;
 try{
  const executablePath=process.env.CHROME_PATH||(process.platform==='darwin'?'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome':undefined);
  browser=await chromium.launch({executablePath});
  const page=await browser.newPage({viewport:{width:390,height:844}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  const url=`http://127.0.0.1:${server.address().port}/stroke-lab.html`;
  await page.goto(url);
  const progress=page.locator('#stroke-progress'),answer=page.locator('#answer');
  const button=key=>page.locator(`[data-stroke="${key}"]`);
  for(const key of ['tap','up','down'])await button(key).click();
  assert.match(await progress.textContent(),/0 \/ 3/,'reading descriptions does not complete a gesture');
  await button('up').click();
  await page.locator('#pad').scrollIntoViewIfNeeded();
  const box=await page.locator('#pad').boundingBox(),x=box.x+box.width/2,y=box.y+box.height/2;
  async function stroke(points){await page.mouse.move(...points[0]);await page.mouse.down();for(const p of points.slice(1))await page.mouse.move(...p,{steps:5});await page.mouse.up();}
  await stroke([[x,y+60],[x,y-60],[x+70,y-60],[x+70,y+60],[x,y+60]]);
  assert.match(await answer.textContent(),/시작점으로 되돌아온 선/);
  assert.doesNotMatch(await answer.textContent(),/손을 거의 움직이지/);
  assert.match(await progress.textContent(),/0 \/ 3/);
  await stroke([[x,y+60],[x,y-60]]);
  assert.match(await answer.textContent(),/목표 방향 성공.*위로 스윙/);
  assert.match(await progress.textContent(),/1 \/ 3/);
  await stroke([[x,y],[x+60,y]]);
  assert.match(await answer.textContent(),/좌우 이동/);
  assert.match(await progress.textContent(),/1 \/ 3/);
  await button('tap').click();await page.mouse.click(x,y);
  assert.match(await answer.textContent(),/목표 방향 성공.*터치/);
  await button('down').click();await stroke([[x,y-60],[x,y+60]]);
  assert.match(await progress.textContent(),/3 \/ 3.*타이밍 연습/);
  await page.mouse.move(x,y);await page.mouse.down();
  await page.locator('#pad').evaluate(el=>el.dispatchEvent(new PointerEvent('pointercancel',{pointerId:1,bubbles:true})));
  await page.mouse.up();assert.match(await answer.textContent(),/입력이 취소/);
  await page.mouse.click(x,y);assert.match(await answer.textContent(),/터치/,'next gesture works after cancel');
  await button('tap').focus();await page.keyboard.press('Enter');
  assert.equal(await button('tap').getAttribute('aria-pressed'),'true');
  for(const width of [390,768,1440]){
   await page.setViewportSize({width,height:900});
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  }
  assert.equal(await page.evaluate(()=>localStorage.length+sessionStorage.length),0);
  assert.deepEqual(errors,[]);
  await page.reload();assert.match(await progress.textContent(),/0 \/ 3/,'progress stays in the current page only');
  const noJs=await browser.newContext({javaScriptEnabled:false}),staticPage=await noJs.newPage();
  await staticPage.goto(url);
  assert.equal(await staticPage.getByRole('heading',{name:'연습 2: 아래에서 위로 감아 올리기'}).count(),1);
  assert.match(await staticPage.locator('noscript').textContent(),/자바스크립트/);
  await noJs.close();
  console.log('PASS guided swing input, return-to-start, cancellation, keyboard description, responsive layout and no storage');
 }finally{await browser?.close();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
