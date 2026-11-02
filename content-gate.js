// 콘텐츠 순서: AI 대전 울트라 이상 승리 → 대회 열림 → 대회 절반 이상 클리어 → 세계제패 열림.
// 이미 대회 트로피나 정복 국가가 있는 선수는 그대로 열어 둔다. 잠긴 버튼을 누르면 길잡이 창을 보여 준다.
(()=>{
const $=id=>document.getElementById(id);
const S=()=>{try{return tS()||{};}catch{return {};}};
const tourIds=()=>[...document.querySelectorAll('#tour-events [data-tour]')].map(b=>b.dataset.tour);
const tourDone=()=>{let won;try{won=new Set(trophyIds());}catch{won=new Set();}return tourIds().filter(id=>id==='villain'?!!S().villain:won.has(id)).length;};
const tourNeed=()=>Math.ceil(Math.max(1,tourIds().length)/2);
const aiDone=()=>{const s=S();return !!(s.ultra||s.uhard||s.uext||s.unightN);};
const conquered=()=>{try{return conquestCount()>0;}catch{return false;}};
const tourOpen=()=>aiDone()||tourDone()>0||conquered();
const worldOpen=()=>tourDone()>=tourNeed()||conquered();
window.contentGate={tourOpen,worldOpen};

const LOCK='<svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true"><rect x="3" y="7" width="10" height="7" rx="1.5" fill="currentColor"/><path d="M5 7V5a3 3 0 0 1 6 0v2" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>';
const css=document.createElement('style');css.textContent=`
html body #tournament-open.gate-locked,html body #world-open.gate-locked{background:#0b1226!important;background-image:none!important;color:#7f8fb6!important;border:1px dashed #3a4a75!important;box-shadow:none!important;animation:none!important;text-shadow:none!important;flex-direction:column;line-height:1.15}
html body #tournament-open.gate-locked::after,html body #world-open.gate-locked::after{display:none!important}
.gate-locked svg{vertical-align:-1px;margin-right:4px}
.gate-why{display:block;margin-top:3px;font:600 11px 'Pretendard Variable',Pretendard,sans-serif;letter-spacing:0;color:#5d6b92}
#gate-path{width:min(420px,calc(100vw - 32px));max-width:none;padding:22px 18px 18px;border:0;border-radius:16px;background:#0b1226;color:#eef3ff;box-shadow:0 30px 80px rgba(0,0,0,.6);font-family:'Pretendard Variable',Pretendard,-apple-system,sans-serif}
#gate-path::backdrop{background:rgba(5,9,26,.82)}
#gate-path h3{margin:0 0 4px;font-size:21px;font-weight:800;letter-spacing:-.02em}
#gate-path>p{margin:0 0 18px;font-size:13.5px;line-height:1.5;color:#93a4cc}
#gate-path ol{list-style:none;margin:0 0 18px;padding:0;display:grid;gap:0}
#gate-path li{display:grid;grid-template-columns:34px 1fr;gap:12px;position:relative;padding-bottom:16px}
#gate-path li:last-child{padding-bottom:0}
#gate-path li:not(:last-child)::before{content:'';position:absolute;left:16px;top:34px;bottom:2px;width:2px;background:#18244a}
#gate-path li.done:not(:last-child)::before{background:#ffc94a}
#gate-path .dot{width:34px;height:34px;border-radius:50%;display:grid;place-items:center;font:800 15px 'Barlow Condensed','Pretendard Variable',sans-serif;background:#111a35;color:#5d6b92;box-shadow:inset 0 0 0 2px #2a3a6a}
#gate-path li.done .dot{background:#ffc94a;color:#2a1700;box-shadow:none}
#gate-path li.now .dot{background:#14e0ff;color:#00131c;box-shadow:0 0 0 4px rgba(20,224,255,.18)}
#gate-path b{display:block;font-size:16px;font-weight:800;letter-spacing:-.02em;margin-top:6px}
#gate-path small{display:block;font-size:13px;color:#93a4cc;margin-top:2px}
#gate-path li.locked b{color:#7f8fb6}
#gate-path .bar{height:6px;border-radius:999px;background:#18244a;margin-top:8px;overflow:hidden}
#gate-path .bar i{display:block;height:100%;background:#14e0ff;border-radius:inherit}
#gate-path button{width:100%;min-height:52px;border:0;background:#14e0ff;color:#00131c;font:800 16px inherit;clip-path:var(--chamfer,none);cursor:pointer}
#gate-path button:hover{background:#7df0ff}
#gate-path button:focus-visible{outline:2px solid #7df0ff;outline-offset:2px}`;
document.head.append(css);

const d=document.createElement('dialog');d.id='gate-path';d.setAttribute('aria-labelledby','gate-title');document.body.append(d);
const openPath=focus=>{const a=aiDone(),t=tourOpen(),done=tourDone(),need=tourNeed(),w=worldOpen();
 const step=(cls,n,title,sub,bar)=>`<li class="${cls}"><span class="dot">${cls==='done'?'<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>':n}</span><div><b>${title}</b><small>${sub}</small>${bar!=null?`<div class="bar"><i style="width:${Math.round(bar*100)}%"></i></div>`:''}</div></li>`;
 d.innerHTML=`<h3 id="gate-title">${focus==='world'?'세계제패는 아직 잠겨 있어요':'대회는 아직 잠겨 있어요'}</h3><p>한 단계씩 깨면 다음 무대가 열려요.</p><ol>
 ${step(a||t?'done':'now',1,'AI 대전 울트라 승리',a||t?'완료':'AI 대전에서 울트라 이상 난이도로 1승')}
 ${step(w?'done':t?'now':'locked',2,'대회 절반 클리어',w?'완료':`${Math.min(done,need)} / ${need} 대회 우승`,t&&!w?Math.min(1,done/need):null)}
 ${step(w?'now':'locked',3,'세계제패','중국부터 세계 21개국 정복')}</ol><button type="button">확인</button>`;
 d.querySelector('button').onclick=()=>d.close();if(!d.open)d.showModal();d.querySelector('button').focus();};
window.openContentPath=openPath;

const mark=(btn,open,label)=>{if(!btn)return;if(open){if(btn.classList.contains('gate-locked')){btn.classList.remove('gate-locked');btn.removeAttribute('aria-disabled');btn.querySelector('.gate-ico')?.remove();btn.querySelector('.gate-why')?.remove();}return;}
 btn.classList.add('gate-locked');btn.setAttribute('aria-disabled','true');if(!btn.querySelector('.gate-ico')){const ico=document.createElement('span');ico.className='gate-ico';ico.innerHTML=LOCK;btn.prepend(ico);}
 let why=btn.querySelector('.gate-why');if(!why){why=document.createElement('small');why.className='gate-why';btn.append(why);}why.textContent=label;};
let was=null;
const sync=()=>{if(typeof playing!=='undefined'&&playing)return;const t=tourOpen(),w=worldOpen();
 mark($('tournament-open'),t,'울트라 1승 시 열림');mark($('world-open'),w,`대회 ${tourNeed()}개 우승 시 열림`);
 if(was&&(t&&!was.t||w&&!was.w)&&typeof toast==='function')toast(w&&!was.w?'세계제패가 열렸어요! 모드에서 도전해 보세요':'대회가 열렸어요! 모드에서 출전해 보세요',3);
 was={t,w};};
// 잠긴 버튼은 원래 동작보다 먼저 가로채 길잡이 창을 연다.
document.addEventListener('click',e=>{const b=e.target.closest('#tournament-open,#world-open');if(!b||!b.classList.contains('gate-locked'))return;
 e.preventDefault();e.stopImmediatePropagation();openPath(b.id==='world-open'?'world':'tour');},true);
window.contentGate.sync=sync;setInterval(sync,1500);setTimeout(sync,300);
})();
