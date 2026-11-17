const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const pages=['learn.html','guide.html','strategy.html','about.html','privacy.html','beginner.html','campaign-guide.html','help.html','stroke-lab.html','character-guide.html','updates.html','visual-guide.html','timing-study.html','decision-training.html','play-goals.html','table-tennis-and-spp.html'];
for(const page of pages){const html=fs.readFileSync(page,'utf8');assert.match(html,/<h1[ >]/,page);for(const [,href] of html.matchAll(/href="([^"]+)"/g)){if(/^(https?:|#|mailto:)/.test(href)||href==='./')continue;assert(fs.existsSync(path.resolve(path.dirname(page),href)),page+' → '+href);}assert(fs.readFileSync('sitemap.xml','utf8').includes('https://playspp.site/'+page),page+' sitemap');}
const index=fs.readFileSync('index.html','utf8'),login=index.slice(index.indexOf('<dialog id="auth-gate"'),index.indexOf('</dialog>',index.indexOf('<dialog id="auth-gate"')));
for(const page of ['learn.html','stroke-lab.html','about.html','updates.html','privacy.html'])assert(login.includes('href="'+page+'"'),'static login navigation: '+page);
console.log('PASS public content links, sitemap and static login navigation');
const study=JSON.parse(fs.readFileSync('assets/playbook/measurements.json','utf8')),studyHtml=fs.readFileSync('timing-study.html','utf8');
assert.equal(study.rows.length,6);
for(const row of study.rows){assert(studyHtml.includes(row.nominalMilliseconds.toFixed(2)+'ms'),'published timing measurement');assert(row.perfectSpan>0);}
assert(study.rows[1].perfectSpan<study.rows[0].perfectSpan);
for(const asset of ['timing.png','dual.png','chance.png','incoming-demo.webm'])assert(fs.statSync('assets/playbook/'+asset).size>1000);
console.log('PASS published measurements and rendered guide assets');
