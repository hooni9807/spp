// 덧씌움(wrapper) 지도: 전역 함수를 다시 대입해 감싸는 곳을 실행 순서대로 찾아 docs/wrapper-map.md로 쓴다.
// 사용: node scripts/wrapper-map.cjs   (코드를 고친 뒤 다시 돌려 문서를 갱신)
const fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..'),read=f=>fs.readFileSync(path.join(root,f),'utf8');
const html=read('index.html');
// 실행 순서: index.html 인라인 스크립트(위→아래) 다음, defer 스크립트가 태그 순서대로.
const order=['index.html',...[...html.matchAll(/<script[^>]*\bsrc="([^"?:]+\.js)/g)].map(m=>m[1]).filter(f=>fs.existsSync(path.join(root,f)))];
const src=Object.fromEntries(order.map(f=>[f,read(f)]));
const declared=new Set(['P.aiReturn','P.returnRoll','P.power','P.miss']);
for(const s of Object.values(src))for(const m of s.matchAll(/\bfunction ([A-Za-z_$][\w$]*)\s*\(/g))declared.add(m[1]);
const hits={};
for(const f of order){const lines=src[f].split('\n');lines.forEach((l,i)=>{for(const m of l.matchAll(/(?:^|[;{}\s])((?:P\.)?[A-Za-z_$][\w$]*)=(?:async function\b|function\b|\(|[A-Za-z_$][\w$]*=>)/g)){const n=m[1];if(!declared.has(n))continue;const before=l.slice(Math.max(0,m.index-10),m.index+1);if(/(const|let|var)\s*$/.test(before))continue;
  // nearby comment as a hint of purpose
  const near=(lines[i-1]||'')+' '+l.slice(Math.max(0,m.index-160),m.index);const c=(near.match(/(?:\/\/|\/\*)\s*([^*\n]{4,90})/g)||[]).pop();
  const body=l.slice(m.index+m[0].length,m.index+m[0].length+110).replace(/\s+/g,' ');(hits[n]??=[]).push({f,line:i+1,hint:c?c.replace(/^(\/\/|\/\*)\s*/,'').trim():'',body});}});}
const top=Object.entries(hits).filter(([,h])=>h.length>=2).sort((a,b)=>b[1].length-a[1].length);
let md=`# 덧씌움(wrapper) 지도\n\n자동 생성: \`node scripts/wrapper-map.cjs\` · 직접 고치지 말고 스크립트를 다시 돌려 갱신하세요.\n\n`;
md+=`게임은 핵심 함수를 여러 기능이 차례로 다시 대입해 감쌉니다(\`const old=fn;fn=function(){…old()…}\`). **나중에 실행된 덧씌움이 바깥쪽**이라 가장 먼저 실행되고, 안쪽으로 원래 함수까지 내려갑니다. 순서가 바뀌면 조건·문구가 엉뚱하게 나오는 원인이 됩니다.\n\n`;
md+=`## 정리 방향 (제안)\n\n덧씌움이 많은 함수부터, 감싸는 대신 **이벤트 훅**에 등록하게 바꿉니다. 예: \`onMatchStart(fn)\` · \`onResult(fn)\` · \`onGoHome(fn)\` · \`aiShotModifiers.push(fn)\`. 원래 함수는 등록된 훅을 정해진 순서(우선순위 숫자)로 한 번씩 부르기만 합니다. 한 번에 하나의 함수씩, 그 함수의 기존 테스트가 통과하는지 확인하며 옮깁니다.\n\n`;
md+=`## 실행 순서\n\n${order.map((f,i)=>`${i+1}. \`${f}\``).join('\n')}\n\n`;
md+=`## 두 번 이상 덧씌워지는 함수 (${top.length}개)\n\n| 함수 | 덧씌움 수 |\n|---|---|\n${top.map(([n,h])=>`| \`${n}\` | ${h.length} |`).join('\n')}\n\n`;
for(const [n,h] of top){md+=`### \`${n}\`\n\n위에서 아래로 = 안쪽(먼저 감쌈) → 바깥쪽(나중에 감쌈, 호출 시 가장 먼저 실행)\n\n| # | 위치 | 주석 | 코드 시작 부분 |\n|---|---|---|---|\n${h.map((x,i)=>`| ${i+1} | \`${x.f}:${x.line}\` | ${x.hint.replace(/\|/g,'\\|')||'—'} | \`${x.body.replace(/\|/g,'¦').replace(/`/g,"'")}…\` |`).join('\n')}\n\n`;}
fs.writeFileSync(path.join(root,'docs/wrapper-map.md'),md);console.log(`docs/wrapper-map.md · ${top.length} functions wrapped 2+ times`);
