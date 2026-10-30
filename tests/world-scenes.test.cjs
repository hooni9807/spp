const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');

(async () => {
 const server = http.createServer((req, res) => {
  const file = new URL(req.url, 'http://localhost').pathname;
  fs.readFile(path.join(process.cwd(), file === '/' ? 'index.html' : file), (e, b) => res.end(e ? '' : b));
 });
 await new Promise(r => server.listen(0, r));
 const browser = await chromium.launch({headless:true});
 try {
  const page = await browser.newPage();
  await page.goto('http://localhost:' + server.address().port);
  await page.waitForFunction(() => typeof WORLD_SCENES !== 'undefined');
  const result = await page.evaluate(() => {
   const scenes = Object.keys(WORLD_SCENES).map(id => {
    showWorldScene(id, 6);
    const layer = document.querySelector('.world-skill-scene');
    return {id, count:document.querySelectorAll('.world-skill-scene').length, country:layer.dataset.country,
     invalid:layer.innerHTML.includes('undefined'), split:layer.querySelectorAll('[class^="world-split-"]').length};
   });
   clearWorldScene();
   return {total:WORLD_COUNTRY_TOTAL, scenes, cleared:!document.querySelector('.world-skill-scene'),
    squads:distantSquads.map(([id]) => ({id, faces:Object.keys(FACES).filter(k=>k.startsWith('china_'+id+'_')).length,
     map:!!document.querySelector('[data-region="'+id+'"]'), active:WORLD_ACTIVE_COUNTRIES.includes(id)})),
    shapes:new Set(distantSquads.map(([id])=>WORLD_EXPANSION[id].shape)).size};
  });
  assert.equal(result.total,20);
  assert.equal(result.scenes.length,20);
  assert.equal(result.shapes,5);
  assert(result.cleared);
  for(const scene of result.scenes){assert.equal(scene.count,1);assert.equal(scene.country,scene.id);assert(!scene.invalid);if(['brazil','japan'].includes(scene.id))assert.equal(scene.split,2);}
  for(const squad of result.squads){assert.equal(squad.faces,7);assert(squad.map);assert(squad.active);}
  await page.emulateMedia({reducedMotion:'reduce'});
  assert.equal(await page.evaluate(()=>{showWorldScene('china');return document.querySelectorAll('.world-scene-particle').length;}),0);
  console.log('20 national scenes, 35 new portraits, map targets, cleanup and reduced motion verified');
 } finally {await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
