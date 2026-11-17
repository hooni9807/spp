const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const pages=['learn.html','guide.html','strategy.html','about.html','privacy.html','beginner.html','campaign-guide.html','help.html','stroke-lab.html','character-guide.html','updates.html'];
for(const page of pages){const html=fs.readFileSync(page,'utf8');assert.match(html,/<h1[ >]/,page);for(const [,href] of html.matchAll(/href="([^"]+)"/g)){if(/^(https?:|#|mailto:)/.test(href)||href==='./')continue;assert(fs.existsSync(path.resolve(path.dirname(page),href)),page+' → '+href);}assert(fs.readFileSync('sitemap.xml','utf8').includes('https://playspp.site/'+page),page+' sitemap');}
const index=fs.readFileSync('index.html','utf8'),login=index.slice(index.indexOf('<dialog id="auth-gate"'),index.indexOf('</dialog>',index.indexOf('<dialog id="auth-gate"')));
for(const page of ['learn.html','stroke-lab.html','about.html','updates.html','privacy.html'])assert(login.includes('href="'+page+'"'),'static login navigation: '+page);
console.log('PASS public content links, sitemap and static login navigation');
