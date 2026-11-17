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
{
  const gate=fs.readFileSync('content-gate.js','utf8'),state={},won=new Set();let countries=0;
  const context={window:{},document:{getElementById:()=>null,querySelectorAll:()=>['daejeon','sejong','busan','okcheon','pyeongtaek','villain','seoul'].map(tour=>({dataset:{tour}}))},tS:()=>state,trophyIds:()=>[...won],conquestCount:()=>countries};
  vm.runInNewContext(gate.slice(gate.indexOf('const $='),gate.indexOf('const LOCK=')),context);
  const access=context.window.contentGate;
  assert.equal(access.tourOpen(),false);assert.equal(access.worldOpen(),false);
  state.ultra=1;assert.equal(access.tourOpen(),true);assert.equal(access.worldOpen(),false);
  for(const id of ['daejeon','sejong','okcheon'])won.add(id);
  assert.equal(access.worldOpen(),false,'three of seven tournaments is below half');
  state.villain=1;assert.equal(access.worldOpen(),true,'the team event counts as a distinct fourth clear');
  delete state.ultra;assert.equal(access.tourOpen(),true,'old tournament progress keeps tournaments open');
  won.clear();delete state.villain;countries=1;
  assert.equal(access.tourOpen(),true);assert.equal(access.worldOpen(),true,'old conquest progress keeps both modes open');
  const campaign=fs.readFileSync('campaign-guide.html','utf8');
  assert(campaign.includes('7개 대회 중 4개'),'published tournament progression');
  assert(campaign.includes('울트라 이상 난이도로 1승'),'published first tournament gate');
  const dialog={open:false,innerHTML:'',querySelector:()=>({focus(){}}),showModal(){this.open=true;}};
  vm.runInNewContext(gate.slice(gate.indexOf('const openPath=focus=>'),gate.indexOf('window.openContentPath=openPath;'))+'\nopenPath("world");',{d:dialog,aiDone:()=>false,tourOpen:()=>false,tourDone:()=>0,tourNeed:()=>4,worldOpen:()=>false,worldCountryTotal:()=>29});
  assert(dialog.innerHTML.includes('총 29개국'),'progress dialog follows the country registry');
  assert(!dialog.innerHTML.includes('중국부터'),'locked China is not the recommended first country');
}
console.log('PASS published mode gates match live progression and preserve returning players');

for(const page of ['about.html','privacy.html','help.html'])assert(fs.readFileSync(page,'utf8').includes('href="mailto:dchkimppi@naver.com"'),page+' private contact');
console.log('PASS private account and privacy contact is discoverable');
