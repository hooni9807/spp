const {chromium}=require('playwright'),fs=require('node:fs'),http=require('node:http'),path=require('node:path'),assert=require('node:assert/strict');
(async()=>{
 const root=path.resolve(__dirname,'..'),server=http.createServer((q,r)=>{const file=path.join(root,new URL(q.url,'http://local').pathname);fs.readFile(file,(e,b)=>{r.statusCode=e?404:200;r.setHeader('Content-Type',file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':'text/html; charset=utf-8');r.end(e?'':b);});});
 await new Promise(r=>server.listen(0,'127.0.0.1',r));
 const browser=await chromium.launch({executablePath:process.env.CHROME_PATH||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
 try{
  const page=await browser.newPage({viewport:{width:390,height:844}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
  const url='http://127.0.0.1:'+server.address().port+'/decision-training.html';
  await page.goto(url);assert.equal(await page.locator('fieldset').count(),12);
  await page.getByRole('button',{name:'12문제 채점하기'}).click();assert.match(await page.locator('#quiz-summary').textContent(),/0\/12문제 응답/);
  const answers=[1,0,1,0,2,1,0,2,1,0,2,1];
  for(let i=0;i<answers.length;i++)await page.locator('input[name="question-'+i+'"][value="'+answers[i]+'"]').check();
  await page.getByRole('button',{name:'12문제 채점하기'}).click();assert.match(await page.locator('#quiz-summary').textContent(),/12개 정답/);
  await page.getByRole('button',{name:'12문제 채점하기'}).click();assert.match(await page.locator('#quiz-summary').textContent(),/12개 정답/);
  await page.locator('input[name="question-0"][value="0"]').check();
  await page.getByRole('button',{name:'12문제 채점하기'}).click();assert.match(await page.locator('#quiz-summary').textContent(),/11개 정답/);
  assert.match(await page.locator('fieldset').first().locator('.feedback').textContent(),/다시 생각/);
  await page.getByRole('button',{name:'답 지우고 다시 풀기'}).click();assert.equal(await page.locator('input:checked').count(),0);assert.equal(await page.locator('.feedback:visible').count(),0);
  assert.equal(await page.evaluate(()=>localStorage.length+sessionStorage.length),0);
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  await page.screenshot({path:'/tmp/spp-decision-training-mobile.png',fullPage:true});
  const noJs=await browser.newContext({javaScriptEnabled:false}),staticPage=await noJs.newPage();
  await staticPage.goto(url);assert.equal(await staticPage.locator('details').count(),12);
  await staticPage.locator('summary').first().click();assert.match(await staticPage.locator('details').first().textContent(),/正答|정답/);
  assert.deepEqual(errors,[]);await noJs.close();
  console.log('PASS 12 answers, partial/repeated grading, correction, reset, no storage, mobile and no-JS explanations');
 }finally{await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
