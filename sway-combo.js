// 좌우 흔들기 콤보 표시: 내가 흔들면 코트 아래(6시)에 청록 "COMBO ×1~MAX", AI가 흔들면 AI 캐릭터 옆에 빨간 글씨.
// 내 중첩 = 내 공의 aiMovePenalty(중첩당 0.0375), AI 중첩 = aiSwayStack. 경기 중에만, 값이 바뀔 때 짧게 튀어 오른다.
(()=>{
const css=document.createElement('style');css.textContent=`
.sway-combo{position:fixed;z-index:40;pointer-events:none;transform:translate(-50%,-50%);font:800 13px/1 'Barlow Condensed','Pretendard Variable',sans-serif;letter-spacing:.08em;white-space:nowrap;padding:4px 9px;border-radius:999px;background:rgba(5,9,26,.62);opacity:0;transition:opacity .2s cubic-bezier(.16,1,.3,1)}
.sway-combo.on{opacity:1}
.sway-combo b{font-size:15px;margin-left:3px}
.sway-combo.me{color:#14e0ff;box-shadow:0 0 0 1px rgba(20,224,255,.35)}
.sway-combo.ai{color:#ff3b5c;box-shadow:0 0 0 1px rgba(255,59,92,.35)}
.sway-combo.max.me{background:#14e0ff;color:#00131c}
.sway-combo.max.ai{background:#ff3b5c;color:#fff}
.sway-combo.pop{animation:swayPop .32s cubic-bezier(.16,1,.3,1)}
@keyframes swayPop{0%{transform:translate(-50%,-50%) scale(.7)}60%{transform:translate(-50%,-50%) scale(1.15)}100%{transform:translate(-50%,-50%) scale(1)}}
@media(prefers-reduced-motion:reduce){.sway-combo.pop{animation:none}}`;
document.head.append(css);
const mk=cls=>{const e=document.createElement('div');e.className='sway-combo '+cls;e.setAttribute('aria-hidden','true');document.body.append(e);return e;};
const meEl=mk('me'),aiEl=mk('ai');
const shown={me:-1,ai:-1};let mine=0,prevOwner=null;
const set=(el,key,n)=>{if(n===shown[key])return;shown[key]=n;el.classList.toggle('on',n>0);el.classList.toggle('max',n>=4);
 if(n>0){el.textContent='COMBO';const b=document.createElement('b');b.textContent=n>=4?'MAX':'×'+n;el.append(b);el.classList.remove('pop');void el.offsetWidth;el.classList.add('pop');}};
const court=()=>document.getElementById('court');
function frame(){requestAnimationFrame(frame);
 const live=typeof playing!=='undefined'&&playing&&!(typeof net!=='undefined'&&net)&&!(typeof paused!=='undefined'&&paused);
 if(!live){set(meEl,'me',0);set(aiEl,'ai',0);mine=0;return;}
 // 내 공: 공 주인이 나로 바뀌는 순간(내가 친 순간) 그 공에 붙은 흔들기 중첩을 읽는다. 공 객체는 재사용되므로 주인 변화로 판단.
 const owner=ball?ball.owner:null;if(owner==='you'&&prevOwner!=='you')mine=Math.min(4,Math.round((+ball.aiMovePenalty||0)/.0375));prevOwner=owner;
 const ai=typeof aiSwayOn==='function'&&aiSwayOn()&&typeof aiSwayStack==='number'?aiSwayStack:0;
 set(meEl,'me',mine);set(aiEl,'ai',ai);
 const c=court();if(!c)return;const r=c.getBoundingClientRect(),k=r.width/(typeof W==='number'&&W||r.width);
 if(mine>0){meEl.style.left=r.left+r.width/2+'px';meEl.style.top=r.bottom-22+'px';}
 if(ai>0&&typeof project==='function'&&typeof foe==='object'){// foe.x는 이미 화면 좌표(px), 높이만 AI 쪽 깊이로 투영
  const q=project(0,3.05,.62),fx=Number.isFinite(foe.x)?foe.x:W/2;if(Number.isFinite(q.y)){aiEl.style.left=r.left+(fx+72*(q.scale||.5)*2)*k+'px';aiEl.style.top=r.top+q.y*k+'px';}}}
requestAnimationFrame(frame);
})();
