const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const newPages=['rally-challenge.html','serve-and-placement.html','progress-and-records.html'];
const pages=['learn.html','guide.html','strategy.html','about.html','privacy.html','beginner.html','campaign-guide.html','help.html','stroke-lab.html','character-guide.html','updates.html','visual-guide.html','timing-study.html','decision-training.html','play-goals.html','table-tennis-and-spp.html',...newPages];
const sitemap=fs.readFileSync('sitemap.xml','utf8');
for(const page of pages){
  const html=fs.readFileSync(page,'utf8');
  const url='https://playspp.site/'+page;
  assert.match(html,/<h1[ >]/,page);
  assert(html.includes('rel="canonical" href="'+url+'"'),page+' canonical');
  assert(sitemap.includes('<loc>'+url+'</loc>'),page+' sitemap');
  for(const [,target] of html.matchAll(/(?:href|src)="([^"]+)"/g)){
    if(/^(https?:|mailto:|data:)/.test(target)||target==='./')continue;
    if(target.startsWith('#')){
      assert(html.includes('id="'+target.slice(1)+'"'),page+' → '+target);
      continue;
    }
    const [file,fragment]=target.split('#');
    const destination=path.resolve(path.dirname(page),file.split('?')[0]);
    assert(fs.existsSync(destination),page+' → '+target);
    if(fragment)assert(fs.readFileSync(destination,'utf8').includes('id="'+fragment+'"'),page+' → '+target);
  }
}
const playbook=fs.readFileSync('learn.html','utf8');
for(const page of newPages)assert(playbook.includes('href="'+page+'"'),'playbook index: '+page);
const index=fs.readFileSync('index.html','utf8'),login=index.slice(index.indexOf('<dialog id="auth-gate"'),index.indexOf('</dialog>',index.indexOf('<dialog id="auth-gate"')));
for(const page of ['learn.html','stroke-lab.html','rally-challenge.html','about.html','updates.html','privacy.html'])assert(login.includes('href="'+page+'"'),'static login navigation: '+page);
console.log('PASS public content links, sitemap and static login navigation');
const study=JSON.parse(fs.readFileSync('assets/playbook/measurements.json','utf8')),studyHtml=fs.readFileSync('timing-study.html','utf8');
assert.equal(study.rows.length,6);
for(const row of study.rows){assert(studyHtml.includes(row.nominalMilliseconds.toFixed(2)+'ms'),'published timing measurement');assert(row.perfectSpan>0);}
assert(study.rows[1].perfectSpan<study.rows[0].perfectSpan);
for(const asset of ['timing.png','dual.png','chance.png','incoming-demo.webm'])assert(fs.statSync('assets/playbook/'+asset).size>1000);
console.log('PASS published measurements and rendered guide assets');
const rankCode=index.match(/const AI_RATING_BASE=[^\n]+\nconst rankWinScore=[^\n]+/)[0];
const winScore=vm.runInNewContext(rankCode+'\nrankWinScore');
const recordGuide=fs.readFileSync('progress-and-records.html','utf8');
for(const [gap,dual,shutout,streak] of [[4,2,false,3],[11,5,true,3]]){
  const score=winScore('ultra',gap,dual,shutout,streak);
  assert(recordGuide.includes(score+'점입니다'),'published AI score example: '+score);
}
assert.equal(winScore('unight',100,100,true,100),500);
assert(recordGuide.includes('500점'),'published AI score cap');
console.log('PASS published score examples match current game calculation');
