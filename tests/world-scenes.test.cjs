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
   const singapore=document.querySelector('[data-region="singapore"]');
   singapore.dispatchEvent(new PointerEvent('pointerup',{bubbles:true,pointerType:'touch'}));
   const singaporePlayable=/싱가포르 제패/.test(document.getElementById('world-detail').textContent)&&!!document.getElementById('euro-depart');
   const state=tS();
   state.world_japan=state.world_space=1;
   state['spaceWar_'+SPACE_WAR_IDS[0]]=1;
   euroColors();
   const {countries,count}=worldConquestRow();
   const oldRank=cleanWorldConquestRow({countries:['china','japan','space'],count:3,at:{seconds:1}});
   const currentRank=cleanWorldConquestRow({countries:['china','japan','space'],count:3,at:{seconds:Math.ceil(CHINA_RESET_AT/1000)}});
   return {total:worldCountryTotal(),scenes,cleared:!document.querySelector('.world-skill-scene'),singaporePlayable,singaporeTarget:singapore.getAttribute('d'),
    countries,count,oldRank,currentRank,progress:$('world-progress').textContent,spaceClears:spaceWarClears(),
    squads:distantSquads.map(([id]) => ({id, faces:Object.keys(FACES).filter(k=>k.startsWith('china_'+id+'_')).length,
     map:!!document.querySelector('[data-region="'+id+'"]'), active:Object.hasOwn(WORLD_COUNTRY_NAMES,id)})),
    shapes:new Set(distantSquads.map(([id])=>WORLD_EXPANSION[id].shape)).size};
  });
  assert.equal(result.total,22);
  assert.equal(result.scenes.length,22);
  assert.deepEqual(result.countries,['japan']);
  assert.equal(result.count,1);
  assert.deepEqual(result.oldRank.countries,['japan']);
  assert.equal(result.oldRank.count,1);
  assert.deepEqual(result.currentRank.countries,['china','japan']);
  assert.equal(result.currentRank.count,2);
  assert.equal(result.progress,'정복 완료 1 / 22');
  assert.equal(result.spaceClears,1);
  assert.equal(result.shapes,6);
  assert(result.cleared);
  assert(result.singaporePlayable);
  assert.equal(result.singaporeTarget,'M697 291L719 291L722 307L700 310Z');
  for(const scene of result.scenes){assert.equal(scene.count,1);assert.equal(scene.country,scene.id);assert(!scene.invalid);if(['brazil','japan'].includes(scene.id))assert.equal(scene.split,2);}
  for(const squad of result.squads){assert.equal(squad.faces,7);assert(squad.map);assert(squad.active);}
  await page.emulateMedia({reducedMotion:'reduce'});
  assert.equal(await page.evaluate(()=>{showWorldScene('china');return document.querySelectorAll('.world-scene-particle').length;}),0);
  console.log('22 national scenes, 7 Hong Kong portraits, map targets, cleanup and reduced motion verified');
 } finally {await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
