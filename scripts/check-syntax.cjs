// 배포 전 문법 검사: index.html 안의 모든 인라인 <script>와 루트의 게임 .js 파일을 node --check로 확인한다.
const fs=require('fs'),path=require('path'),{execFileSync}=require('child_process'),os=require('os');
const root=path.resolve(__dirname,'..'),tmp=fs.mkdtempSync(path.join(os.tmpdir(),'spp-check-'));let bad=0;
const check=(file,label)=>{try{execFileSync(process.execPath,['--check',file],{stdio:'pipe'});}catch(e){bad++;console.error(`✗ ${label}\n${String(e.stderr).split('\n').slice(0,6).join('\n')}`);}};
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');let i=0;
for(const m of html.matchAll(/<script(?![^>]*\bsrc=)(?![^>]*type="(?:application\/ld\+json|importmap)")[^>]*>([\s\S]*?)<\/script>/g)){const f=path.join(tmp,`inline-${i++}.js`);fs.writeFileSync(f,m[1]);check(f,`index.html inline script #${i}`);}
for(const name of fs.readdirSync(root))if(name.endsWith('.js')&&!['capacitor.config.js'].includes(name))check(path.join(root,name),name);
if(bad){console.error(`${bad} file(s) failed the syntax check`);process.exit(1);}console.log(`syntax ok: ${i} inline scripts + root .js files`);
