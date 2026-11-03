// 첫 방문 튜토리얼: 처음 화면에서 한 번만 자리를 짚어 주며 4단계로 안내한다. 기록 탭의 "튜토리얼 다시 보기"로 언제든 다시 연다.
(()=>{
const KEY='spp_tutorial_done',$=id=>document.getElementById(id);
const STEPS=[
 {at:()=>document.querySelector('#char-pick [aria-checked="true"]'),t:'내 선수',d:'지금 고른 캐릭터예요. 아래 "캐릭터 변경"으로 다른 동호회원을 고를 수 있어요.'},
 {at:()=>$('start'),t:'플레이 시작',d:'누르면 바로 AI와 한 경기. 처음엔 쉬움 난이도로 감을 잡아 보세요.'},
 {at:()=>document.querySelector('.timing-legend'),t:'치는 법',d:'공 주위 링이 줄어들다 라켓 크기 원과 딱 겹치는 순간, 손가락을 끌어 스윙하세요. 정확할수록 PERFECT.'},
 {at:()=>$('tabnav'),t:'더 하고 싶을 때',d:'모드 · 성장 · 기록 · 소셜은 아래 탭에 모여 있어요. 같은 탭을 한 번 더 누르면 닫혀요.'}
];
const css=document.createElement('style');css.textContent=`
#tut-ring{position:fixed;z-index:200;pointer-events:none;border-radius:12px;box-shadow:0 0 0 2px #14e0ff,0 0 0 9999px rgba(5,9,26,.74);transition:top .35s cubic-bezier(.16,1,.3,1),left .35s cubic-bezier(.16,1,.3,1),width .35s cubic-bezier(.16,1,.3,1),height .35s cubic-bezier(.16,1,.3,1)}
#tut-card{position:fixed;z-index:201;left:16px;right:16px;max-width:380px;margin:0 auto;padding:16px 16px 14px;background:#111a35;color:#eef3ff;border-radius:16px;box-shadow:0 18px 48px rgba(0,0,0,.55);font-family:'Pretendard Variable',Pretendard,-apple-system,sans-serif}
#tut-card h3{margin:0 0 6px;font-size:19px;font-weight:800;letter-spacing:-.02em}
#tut-card p{margin:0 0 14px;font-size:14px;line-height:1.55;color:#c3cfee}
#tut-card .row{display:flex;align-items:center;gap:10px}
#tut-card small{font:700 13px 'Barlow Condensed','Pretendard Variable',sans-serif;letter-spacing:.06em;color:#93a4cc;margin-right:auto}
#tut-card button{min-height:44px;padding:0 16px;border:0;font:800 15px inherit;cursor:pointer}
#tut-skip{background:none;color:#93a4cc}
#tut-next{background:#14e0ff;color:#00131c;clip-path:var(--chamfer,none)}
#tut-next:hover{background:#7df0ff}
#tut-card button:focus-visible{outline:2px solid #7df0ff;outline-offset:2px}
#play-coach{position:fixed;z-index:120;left:50%;top:calc(env(safe-area-inset-top,0px) + 96px);transform:translateX(-50%);width:min(360px,calc(100vw - 32px));padding:12px 14px;background:rgba(17,26,53,.94);color:#eef3ff;border-radius:14px;box-shadow:0 12px 32px rgba(0,0,0,.5);pointer-events:none;font-family:'Pretendard Variable',Pretendard,sans-serif;transition:opacity .25s cubic-bezier(.16,1,.3,1)}
#play-coach b{display:block;font-size:16px;font-weight:800;letter-spacing:-.02em;margin-bottom:3px}
#play-coach span{font-size:13.5px;line-height:1.5;color:#c3cfee}
#play-coach i{float:right;font:700 13px 'Barlow Condensed','Pretendard Variable',sans-serif;font-style:normal;letter-spacing:.06em;color:#14e0ff}
#play-coach.done{background:rgba(42,23,0,.94);box-shadow:0 0 0 2px #ffc94a,0 12px 32px rgba(0,0,0,.5)}
@media(prefers-reduced-motion:reduce){#tut-ring{transition:none}}`;
document.head.append(css);
let ring,card,i=0;
const place=()=>{const el=STEPS[i].at();if(!el||!el.offsetParent&&el.id!=='tabnav'){ring.style.cssText='width:0;height:0;top:50%;left:50%';card.style.top='';card.style.bottom='96px';return;}
 el.scrollIntoView({block:'center'});const r=el.getBoundingClientRect(),p=6;
 Object.assign(ring.style,{top:r.top-p+'px',left:r.left-p+'px',width:r.width+p*2+'px',height:r.height+p*2+'px'});
 const below=r.bottom+p+12,h=card.offsetHeight;
 if(below+h<innerHeight-8){card.style.top=below+'px';card.style.bottom='';}else{card.style.top=Math.max(8,r.top-p-12-h)+'px';card.style.bottom='';}};
const show=()=>{const s=STEPS[i];card.querySelector('h3').textContent=s.t;card.querySelector('p').textContent=s.d;card.querySelector('small').textContent=`${i+1} / ${STEPS.length}`;
 $('tut-next').textContent=i===STEPS.length-1?'연습 경기로 배우기':'다음';place();$('tut-next').focus();};
const end=(go)=>{try{localStorage.setItem(KEY,'1');}catch{}if(go===true)setTimeout(()=>window.openPlayTutorial?.(),300);ring.remove();card.remove();removeEventListener('resize',place);removeEventListener('keydown',key);};
const key=e=>{if(e.key==='Escape')end();};
window.openTutorial=()=>{if(document.getElementById('tut-card'))return;i=0;
 ring=document.createElement('div');ring.id='tut-ring';
 card=document.createElement('div');card.id='tut-card';card.setAttribute('role','dialog');card.setAttribute('aria-label','처음 하는 분을 위한 안내');
 card.innerHTML='<h3></h3><p></p><div class="row"><small></small><button type="button" id="tut-skip">건너뛰기</button><button type="button" id="tut-next"></button></div>';
 document.body.append(ring,card);$('tut-skip').onclick=end;$('tut-next').onclick=()=>{if(++i>=STEPS.length)end(true);else show();};
 addEventListener('resize',place);addEventListener('keydown',key);show();};
// 경기 튜토리얼: 연습장에서 AI가 보내는 공을 받아 넘기며 단계별로 배운다. 내 타구 성공 = 공 주인이 AI에서 나로 바뀐 순간.
const PLAY=[
 {t:'링에 맞춰 스윙',d:'공 주위 링이 줄어들어 라켓 원과 겹칠 때, 손가락을 위로 끌어 쳐 보세요.',need:s=>s.hits>=1},
 {t:'포핸드와 백핸드',d:'공이 몸 오른쪽이면 포핸드, 왼쪽이면 백핸드로 자동으로 바뀌어요. 3번 더 넘겨 보세요.',need:s=>s.hits>=4},
 {t:'좌우로 흔들기',d:'같은 쪽만 치면 AI가 읽어요. 왼쪽과 오른쪽을 번갈아 보내 보세요.',need:s=>s.switches>=s.swMark+2},
 {t:'타이밍 다듬기',d:'링이 딱 겹칠수록 PERFECT. 빠르고 깊게 넘어가요. 2번 더 넘기면 끝!',need:s=>s.hits>=s.mark+2}
];
let playTimer=null;
window.openPlayTutorial=()=>{if(playTimer||typeof begin!=='function')return;
 try{setMode('practice');begin();if(paused)pause();}catch{return;}
 const box=document.createElement('div');box.id='play-coach';box.setAttribute('role','status');box.setAttribute('aria-live','polite');document.body.append(box);
 const st={step:0,hits:0,switches:0,side:null,mark:0,swMark:0,owner:null};
 const draw=()=>{const p=PLAY[st.step];box.innerHTML='';const i=document.createElement('i'),b=document.createElement('b'),sp=document.createElement('span');i.textContent=`${st.step+1} / ${PLAY.length}`;b.textContent=p.t;sp.textContent=p.d;box.append(i,b,sp);};
 const stop=()=>{clearInterval(playTimer);playTimer=null;box.remove();};
 draw();
 playTimer=setInterval(()=>{if(!playing||mode!=='practice'){stop();return;}
  const o=ball?ball.owner:null;
  if(o==='you'&&st.owner==='ai'&&!ball.serving){st.hits++;const side=ball.aiRouteLabel?(ball.aiRouteLabel==='왼쪽'?'L':'R'):(ball.x+(ball.vx||0)*.4<0?'L':'R');if(st.side&&side!==st.side)st.switches++;st.side=side;}
  st.owner=o;
  if(PLAY[st.step].need(st)){st.step++;st.mark=st.hits;st.swMark=st.switches;
   if(st.step>=PLAY.length){clearInterval(playTimer);playTimer=null;box.className='done';box.innerHTML='<b>튜토리얼 완료</b><span>이제 AI 대전에서 실력을 보여 주세요. 처음 화면은 ⌂ 버튼.</span>';
    let first=false;try{prog.q??={};first=!prog.q._playTut;prog.q._playTut=1;}catch{}
    if(first&&typeof gainCoins==='function')gainCoins(300,'경기 튜토리얼 완료');setTimeout(()=>box.remove(),5000);}
   else draw();}},80);};
// 첫 방문: 로그인 · 프롤로그가 끝나고 처음 화면이 보일 때 한 번.
let seen=false;try{seen=!!localStorage.getItem(KEY);}catch{}
if(seen)return;
const wait=setInterval(()=>{if(typeof prog!=='undefined'&&prog.xp>0){clearInterval(wait);try{localStorage.setItem(KEY,'1');}catch{}return;}const ov=$('overlay');if(typeof playing!=='undefined'&&playing||!ov||ov.classList.contains('hidden')||getComputedStyle(ov).display==='none'||document.querySelector('dialog[open]')||document.body.classList.contains('prologue-open'))return;
 clearInterval(wait);setTimeout(()=>{if(!(typeof playing!=='undefined'&&playing))openTutorial();},600);},700);
})();
