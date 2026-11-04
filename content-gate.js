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

// 도전 무대: 보스전과 대회 출전을 한 버튼으로 묶는다. 원래 버튼은 숨겨 두고 대신 눌러 준다(잠금 · 기존 동작 그대로).
{const css=document.createElement('style');css.textContent=`html body .segmented .arena-sub{display:none!important}
#arena-pick{width:min(400px,calc(100vw - 32px));padding:22px 18px 18px;border:0;border-radius:16px;background:#0b1226;color:#eef3ff;box-shadow:0 30px 80px rgba(0,0,0,.6);font-family:'Pretendard Variable',Pretendard,sans-serif}
#arena-pick::backdrop{background:rgba(5,9,26,.82)}
#arena-pick h3{margin:0 0 4px;font-size:21px;font-weight:800;letter-spacing:-.02em}
#arena-pick>p{margin:0 0 16px;font-size:13.5px;color:#93a4cc}
#arena-pick .opt{display:block;width:100%;text-align:left;margin:0 0 10px;padding:14px 16px;border:1px solid #2a3a6a;border-radius:14px;background:#111a35;color:#eef3ff;font:inherit;cursor:pointer}
#arena-pick .opt:hover{background:#18244a}
#arena-pick .opt:focus-visible{outline:2px solid #14e0ff;outline-offset:2px}
#arena-pick .opt b{display:block;font-size:17px;font-weight:800}
#arena-pick .opt small{display:block;margin-top:3px;font-size:12.5px;color:#93a4cc}
#arena-pick .opt.locked b{color:#7f8fb6}
#arena-pick .x{width:100%;min-height:44px;border:0;border-radius:12px;background:#18244a;color:#c3cfee;font:700 15px inherit;cursor:pointer}
html body .control-card .segmented #arena-open{background:linear-gradient(135deg,#ff5a5a,#f6a13a);border:0;color:#2a0a06;box-shadow:0 5px 14px #ff6a4a44}
#boss-select{width:min(460px,94vw);max-height:90dvh;padding:18px}
#boss-select::backdrop{background:#080512df}
#boss-select h3{margin:0 0 5px;color:#ff8a6a}
#boss-select>p{margin:0;color:#cbbcf0;font-size:13px}
#boss-events{display:grid;gap:8px;margin-top:14px}
#boss-events button{text-align:left;padding:14px;border:1px solid #5b477e;border-radius:12px;background:#241a3b;color:#fff;font:inherit;cursor:pointer}
#boss-events button:hover{background:#2e2350}
#boss-events button:focus-visible{outline:2px solid #ff8a6a;outline-offset:2px}
#boss-events small:not(.boss-clear){display:block;margin-top:4px;color:#cbbcf0;font-size:12px}
#boss-events b{display:flex;align-items:center;justify-content:space-between;gap:8px}
#boss-events .boss-clear{padding:3px 6px;border:1px solid #7cf0b6;border-radius:999px;background:#133b35;color:#9dffd0;font-size:10px;line-height:1;white-space:nowrap}
#boss-events .boss-remake{display:inline-block;margin-left:6px;padding:2px 5px;border-radius:5px;background:#ffd166;color:#351600;font:900 9px/1 var(--num,'Barlow Condensed',sans-serif);font-style:normal;letter-spacing:.06em;vertical-align:2px}
html body #boss-pick [data-boss="boss"]{position:relative}
html body #boss-pick [data-boss="boss"]::after{content:'REMAKE';position:absolute;top:-6px;right:-4px;padding:2px 4px;border-radius:5px;background:#ffd166;color:#351600;font:900 8px/1 var(--num,sans-serif);letter-spacing:.06em;pointer-events:none}
#boss-events button.cleared{border-color:#6fe6b0;background:linear-gradient(135deg,#193d3b,#29224c)}`;document.head.append(css);
const dlg=document.createElement('dialog');dlg.id='arena-pick';dlg.setAttribute('aria-labelledby','arena-title');document.body.append(dlg);
const openArena=()=>{const t=tourOpen();dlg.innerHTML=`<h3 id="arena-title">도전 무대</h3><p>강한 상대와 겨루는 무대를 고르세요.</p><button type="button" class="opt" data-go="boss"><b>보스전</b><small>개성 강한 보스를 쓰러뜨리고 보상 받기</small></button><button type="button" class="opt${t?'':' locked'}" data-go="tour"><b>${t?'':'🔒 '}대회 출전</b><small>${t?'지역 대회에 출전해 트로피 모으기':'AI 대전 울트라 1승 시 열림'}</small></button><button type="button" class="x">닫기</button>`;
 dlg.querySelector('.x').onclick=()=>dlg.close();dlg.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>{dlg.close();b.dataset.go==='boss'?openBoss():$('tournament-open')?.click();});
 dlg.showModal();dlg.querySelector('.opt').focus();};
// 보스전도 대회처럼 팝업 명단에서 고르고 바로 시작한다. 명단은 기존 보스 선택(#boss-pick) 버튼을 그대로 읽는다.
const REMAKE_BOSSES=['boss'];   // 리메이크된 보스: 명단에 REMAKE 딱지
const BOSS_DONE={minhee:'minhee',boss:'maou2',sejong:'sejong',godyung:'godyung',aribeom:'aribeom',doorjung:'doorjung'};
const bd=document.createElement('dialog');bd.id='boss-select';bd.setAttribute('aria-labelledby','boss-select-title');document.body.append(bd);
const openBoss=()=>{const S=(()=>{try{return tS()||{};}catch{return {};}})();bd.innerHTML='<button type="button" class="dlg-x" aria-label="닫기">✕</button><h3 id="boss-select-title">보스 도전</h3><p>도전할 보스를 고르세요.</p><div id="boss-events"></div>';
 const list=bd.querySelector('#boss-events');for(const src of document.querySelectorAll('#boss-pick [data-boss]')){const id=src.dataset.boss,done=!!S[BOSS_DONE[id]||id],b=document.createElement('button'),h=document.createElement('b'),nm=document.createElement('span');b.type='button';b.dataset.boss=id;nm.textContent=src.textContent.trim().replace(/^[^\s가-힣A-Za-z0-9]+\s*/u,'').replace(/\s*\(고난도\)/,'');   /* 앞 이모지 · (고난도) 빼고 이름만 */h.append(nm);if(REMAKE_BOSSES.includes(id)){const t=document.createElement('i');t.className='boss-remake';t.textContent='REMAKE';nm.append(t);}if(done){const c=document.createElement('small');c.className='boss-clear';c.textContent='✓ 클리어';h.append(c);b.classList.add('cleared');}b.append(h);{let lv='';try{lv=TIERS[BOSS_ULT_TIER[id]]?.name||'';}catch{}if(lv){const sm=document.createElement('small');sm.textContent=lv+'급 난이도';b.append(sm);}}list.append(b);}
 bd.querySelector('.dlg-x').onclick=()=>bd.close();
 list.onclick=e=>{const id=e.target.closest('[data-boss]')?.dataset.boss;if(!id)return;bd.close();document.querySelector('.segmented [data-mode="boss"]')?.click();document.querySelector(`#boss-pick [data-boss="${id}"]`)?.click();setTimeout(()=>$('start')?.click(),50);};
 bd.showModal();list.querySelector('button')?.focus();};
document.addEventListener('click',e=>{if(e.target.closest('#arena-open'))openArena();});}
})();
