// 만취범 취기 게이지: 내 서브마다 한 잔(취기 +1, 최대 7). 캐릭터 옆 세로 게이지 · 마시는 모션 · 잔마다 화면 흔들림.
// 효과(속도 · 회전 · 뜬 공 · 원샷 스매시)와 화면 일렁임은 index.html이 window.drunkStack을 읽어 적용한다. 경기 시작 때 0.
(()=>{
const MAX=7;window.drunkStack=0;
const css=document.createElement('style');css.textContent=`
#drunk-gauge{position:fixed;z-index:40;pointer-events:none;display:flex;flex-direction:column;align-items:center;gap:4px;transform:translate(-50%,-100%);opacity:0;transition:opacity .2s cubic-bezier(.16,1,.3,1);font:800 11px/1 'Barlow Condensed','Pretendard Variable',sans-serif;letter-spacing:.06em;color:#ffd27a}
#drunk-gauge.on{opacity:1}
#drunk-gauge .bar{width:12px;height:96px;padding:2px;border-radius:999px;background:rgba(5,9,26,.72);box-shadow:0 0 0 1px rgba(255,190,80,.4);display:flex;flex-direction:column-reverse;gap:2px}
#drunk-gauge .bar i{flex:1;border-radius:3px;background:#2a2238;transition:background .25s cubic-bezier(.16,1,.3,1)}
#drunk-gauge .bar i.f{background:#ffb020}
#drunk-gauge.max .bar i.f{background:#ff5a36;animation:drunkGlow 1s ease-in-out infinite alternate}
#drunk-gauge.max{color:#ff7a52}
@keyframes drunkGlow{to{background:#ffc94a}}
#drunk-sip{position:fixed;z-index:41;pointer-events:none;transform:translate(-50%,-50%)}
#drunk-sip svg{display:block;width:44px;height:44px;transform-origin:30% 85%;animation:drunkSip 1.1s cubic-bezier(.16,1,.3,1) forwards}
#drunk-sip b{position:absolute;left:100%;top:-6px;white-space:nowrap;font:800 13px 'Pretendard Variable',Pretendard,sans-serif;color:#ffd27a;text-shadow:0 2px 6px #000;opacity:0;animation:drunkGulp 1.1s ease forwards}
@keyframes drunkSip{0%{transform:translateY(26px) rotate(0);opacity:0}18%{opacity:1}40%{transform:translateY(0) rotate(-12deg)}62%{transform:translateY(-4px) rotate(-78deg)}82%{transform:translateY(-4px) rotate(-82deg);opacity:1}100%{transform:translateY(16px) rotate(-10deg);opacity:0}}
@keyframes drunkGulp{0%,35%{opacity:0;transform:translateY(4px)}55%{opacity:1;transform:none}100%{opacity:0;transform:translateY(-10px)}}
@media(prefers-reduced-motion:reduce){#drunk-sip svg,#drunk-sip b,#drunk-gauge.max .bar i.f{animation-duration:.01s}}`;
document.head.append(css);
const g=document.createElement('div');g.id='drunk-gauge';g.setAttribute('aria-hidden','true');g.innerHTML=`<span>취기</span><div class="bar">${'<i></i>'.repeat(MAX)}</div><span class="n">0</span>`;document.body.append(g);
const MUG='<svg viewBox="0 0 44 44" aria-hidden="true"><path d="M9 12h20v24a4 4 0 0 1-4 4H13a4 4 0 0 1-4-4z" fill="#ffb020"/><path d="M9 12h20v6H9z" fill="#fff6dc"/><circle cx="12" cy="11" r="4" fill="#fff6dc"/><circle cx="19" cy="9.5" r="4.5" fill="#fff6dc"/><circle cx="26" cy="11" r="4" fill="#fff6dc"/><path d="M29 17h4a5 5 0 0 1 5 5v4a5 5 0 0 1-5 5h-4" fill="none" stroke="#e8e2f4" stroke-width="3"/><path d="M14 22v12M20 22v12M25 22v12" stroke="#ffd27a" stroke-width="1.6" opacity=".7"/></svg><b>꿀꺽!</b>';
const isDrunk=()=>typeof LOOKS!=='undefined'&&typeof charType!=='undefined'&&!!LOOKS[charType]?.drunk;
const anchor=()=>{const c=document.getElementById('court'),x=typeof me==='object'&&Number.isFinite(me.x)?me.x:typeof paddle==='object'?paddle.x:null;if(!c||!Number.isFinite(x))return null;const r=c.getBoundingClientRect(),k=r.width/(typeof W==='number'&&W||r.width);return {r,k,x};};   // 내 캐릭터 x(화면 px), 1인칭이면 라켓 위치
const paint=()=>{const s=window.drunkStack;g.querySelectorAll('.bar i').forEach((e,i)=>e.classList.toggle('f',i<s));g.querySelector('.n').textContent=s>=MAX?'만취':s;g.classList.toggle('max',s>=MAX);};
// 내 서브 순간(index.html serve 코드)에서 부른다: 한 잔 마시고 취기 +1, 잔마다 짧게 흔들림.
window.drunkSip=()=>{if(!isDrunk()||typeof net!=='undefined'&&net&&net.trio)return;window.drunkStack=Math.min(MAX,window.drunkStack+1);paint();
 window.drunkKickT=typeof time==='number'?time:0;   /* 잔마다 0.9초 흔들림. 화면 흔들림을 끄면 취기 모션도 생략한다. */
 const a=anchor();if(!a)return;document.getElementById('drunk-sip')?.remove();const e=document.createElement('div');e.id='drunk-sip';e.innerHTML=MUG;
 e.style.left=a.r.left+(a.x+26)*a.k+'px';e.style.top=a.r.top+(typeof H==='number'?H*.6:a.r.height*.6)*a.k+'px';document.body.append(e);setTimeout(()=>e.remove(),1200);
 if(window.drunkStack>=MAX&&typeof toast==='function')toast('만취! 🍺 화면이 흔들려요 · 취권 최대 ×1.6 · PERFECT면 원샷 스매시',2);};
if(typeof onBegin==='function')onBegin('post',90,()=>{window.drunkStack=0;window.drunkKickT=-100;drunkEnv=0;paint();});
(function frame(){requestAnimationFrame(frame);
 const live=isDrunk()&&typeof playing!=='undefined'&&playing&&!(typeof paused!=='undefined'&&paused);g.classList.toggle('on',live);if(!live)return;
 const a=anchor();if(!a)return;g.style.left=a.r.left+(a.x+64)*a.k+'px';g.style.top=a.r.top+(typeof H==='number'?H*.78:a.r.height*.78)*a.k+'px';})();
paint();
})();
