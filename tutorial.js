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
@media(prefers-reduced-motion:reduce){#tut-ring{transition:none}}`;
document.head.append(css);
let ring,card,i=0;
const place=()=>{const el=STEPS[i].at();if(!el||!el.offsetParent&&el.id!=='tabnav'){ring.style.cssText='width:0;height:0;top:50%;left:50%';card.style.top='';card.style.bottom='96px';return;}
 el.scrollIntoView({block:'center'});const r=el.getBoundingClientRect(),p=6;
 Object.assign(ring.style,{top:r.top-p+'px',left:r.left-p+'px',width:r.width+p*2+'px',height:r.height+p*2+'px'});
 const below=r.bottom+p+12,h=card.offsetHeight;
 if(below+h<innerHeight-8){card.style.top=below+'px';card.style.bottom='';}else{card.style.top=Math.max(8,r.top-p-12-h)+'px';card.style.bottom='';}};
const show=()=>{const s=STEPS[i];card.querySelector('h3').textContent=s.t;card.querySelector('p').textContent=s.d;card.querySelector('small').textContent=`${i+1} / ${STEPS.length}`;
 $('tut-next').textContent=i===STEPS.length-1?'시작하기':'다음';place();$('tut-next').focus();};
const end=()=>{try{localStorage.setItem(KEY,'1');}catch{}ring.remove();card.remove();removeEventListener('resize',place);removeEventListener('keydown',key);};
const key=e=>{if(e.key==='Escape')end();};
window.openTutorial=()=>{if(document.getElementById('tut-card'))return;i=0;
 ring=document.createElement('div');ring.id='tut-ring';
 card=document.createElement('div');card.id='tut-card';card.setAttribute('role','dialog');card.setAttribute('aria-label','처음 하는 분을 위한 안내');
 card.innerHTML='<h3></h3><p></p><div class="row"><small></small><button type="button" id="tut-skip">건너뛰기</button><button type="button" id="tut-next"></button></div>';
 document.body.append(ring,card);$('tut-skip').onclick=end;$('tut-next').onclick=()=>{if(++i>=STEPS.length)end();else show();};
 addEventListener('resize',place);addEventListener('keydown',key);show();};
// 첫 방문: 로그인 · 프롤로그가 끝나고 처음 화면이 보일 때 한 번.
let seen=false;try{seen=!!localStorage.getItem(KEY);}catch{}
if(seen)return;
const wait=setInterval(()=>{const ov=$('overlay');if(!ov||ov.classList.contains('hidden')||getComputedStyle(ov).display==='none'||document.querySelector('dialog[open]')||document.body.classList.contains('prologue-open'))return;
 clearInterval(wait);setTimeout(openTutorial,600);},700);
})();
