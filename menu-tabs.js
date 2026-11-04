// 하단 탭 메뉴(기본). ?nav=old 로 열면 예전 화면. 기존 버튼은 그대로 두고 탭 시트에서 대신 눌러 준다(기능 중복 없음).
(()=>{
if(/[?&]nav=old/.test(location.search))return;
const $=id=>document.getElementById(id);
const TABS=[
 ['home','⌂','홈'],
 ['mode','▶','모드'],
 ['grow','⬆','성장',['rn-open','enhance-home','racket-skin-open','fit-open','mine-open']],
 ['log','★','기록',['player-info-open','q-open','ach-open','t-open','tr-open','patch-notes-open','#tutorial','#play-tutorial']],
 ['social','♥','소셜',['friends-btn','#ranking','attendance-open']]
];
const css=document.createElement('style');css.textContent=`
body.tabnav #lv-box>button,body.tabnav #enhance-bar,body.tabnav #mode-open{display:none!important}
body.tabnav #char-pick:not(.open)>[data-char]:not([aria-checked="true"]){display:none}
body.tabnav #char-pick:not(.open){display:flex;justify-content:center}
#tabnav{position:fixed;left:0;right:0;bottom:0;z-index:60;display:flex;background:#0d1420f2;border-top:1px solid #ffffff22;padding-bottom:env(safe-area-inset-bottom)}
#tabnav button{flex:1;background:none;border:0;color:#9fb0c4;font:600 12px/1.2 inherit;padding:8px 0 10px;display:grid;gap:2px;justify-items:center;position:relative}
#tabnav button b{font-size:18px;line-height:1}
#tabnav button[aria-selected="true"]{color:#46e0b0}
#tabnav i{position:absolute;top:4px;right:calc(50% - 22px);width:8px;height:8px;border-radius:50%;background:#ff5a5a}
#tabsheet{position:fixed;left:0;right:0;bottom:58px;z-index:59;background:#131c2b;border-radius:16px 16px 0 0;padding:14px 16px 18px;display:grid;grid-template-columns:1fr 1fr;gap:8px;box-shadow:0 -8px 30px #0008}
#tabsheet[hidden]{display:none}
#tabsheet h4{grid-column:1/-1;margin:0 0 4px;color:#e8eef6}
#tabsheet button{padding:14px 10px;border-radius:12px;border:1px solid #ffffff1f;background:#1b2638;color:#e8eef6;font:600 14px inherit;text-align:left}
/* 접힌 상태의 내 선수: 가로로 긴 카드 대신 금테 원형 초상 메달 */
html body.tabnav #char-pick:not(.open)>[aria-checked="true"]{flex-direction:column;align-items:center;gap:6px;width:auto;min-width:0;padding:4px 18px 2px;background:none!important;border:0!important;box-shadow:none!important;font:800 18px/1.2 'Pretendard Variable',Pretendard,sans-serif;letter-spacing:-.02em;color:#eef3ff}
html body.tabnav #char-pick:not(.open)>[aria-checked="true"] canvas{width:104px!important;height:104px!important;border-radius:50%;background:radial-gradient(circle at 50% 35%,#18244a,#0b1226 72%);box-shadow:0 0 0 3px #0b1226,0 0 0 5px #ffc94a,0 10px 24px rgba(0,0,0,.5)!important;margin-bottom:6px}
html body.tabnav #char-pick:not(.open)>[aria-checked="true"] .char-difficulty{font:700 12px 'Barlow Condensed','Pretendard Variable',sans-serif!important;letter-spacing:.06em;padding:3px 10px!important;border-radius:999px!important}
html body.tabnav #char-pick:not(.open)>[aria-checked="true"]::after{display:none}
html body.tabnav #char-pick:not(.open)>[aria-checked="true"]{outline:0!important}
html body.tabnav #char-pick:not(.open)>[aria-checked="true"]:focus-visible canvas{box-shadow:0 0 0 3px #0b1226,0 0 0 5px #14e0ff,0 10px 24px rgba(0,0,0,.5)!important}
html body #char-more{margin:12px auto 24px;display:block;width:min(100%,300px)!important;min-height:54px;padding:12px 24px;border-radius:14px;border:1px solid rgba(150,180,255,.4);background:linear-gradient(135deg,#20365a,#18244a);color:#eef3ff;font:800 18px/1.3 'Pretendard Variable',Pretendard,sans-serif;box-shadow:0 5px 16px #0003}
#char-more:hover{background:#18244a}
body.tabnav #overlay .start-card{padding-bottom:80px}
body.tabnav #mail-alert,body.tabnav #friends-btn{bottom:calc(env(safe-area-inset-bottom,0px) + 76px)}`;
document.head.append(css);
const nav=document.createElement('nav');nav.id='tabnav';nav.setAttribute('role','tablist');
const sheet=document.createElement('div');sheet.id='tabsheet';sheet.hidden=true;
nav.innerHTML=TABS.map(([k,ic,n])=>`<button type="button" role="tab" data-tab="${k}" aria-selected="${k==='home'}"><b aria-hidden="true">${ic}</b>${n}</button>`).join('');
const label=t=>t==='#tutorial'?'튜토리얼 다시 보기':t==='#play-tutorial'?'경기 튜토리얼':t[0]==='#'?'랭킹':($(t)?.textContent.trim().replace(/\s*!$/,'')||'');
const rewardCount=id=>{try{return id==='q-open'?readyQuestEntries().length:id==='ach-open'?pendingAchievementRewards().length:0;}catch{return 0;}};
const rewardBadges=()=>{sheet.querySelectorAll('[data-go]').forEach(b=>{const count=rewardCount(b.dataset.go);let badge=b.querySelector('.reward-ready');if(!count){badge?.remove();return;}if(!badge){badge=document.createElement('span');badge.className='reward-ready';badge.style.cssText='display:inline-block;margin-left:6px;padding:2px 6px;border-radius:9px;background:#ffc94a;color:#302006;font-size:11px;font-weight:800;white-space:nowrap';b.append(badge);}badge.textContent=`보상 ${count}`;badge.setAttribute('aria-label',`수령 가능한 보상 ${count}개`);});};
const select=k=>{nav.querySelectorAll('button').forEach(b=>b.setAttribute('aria-selected',b.dataset.tab===k));sheet.hidden=true;
 if(k==='mode'){$('mode-open')?.click();return;}
 const t=TABS.find(x=>x[0]===k);if(!t[3])return;
 const items=t[3].filter(id=>id[0]==='#'||$(id)&&!$(id).hidden);
 sheet.innerHTML=`<h4>${t[2]}</h4>`+items.map(id=>`<button type="button" data-go="${id}">${label(id)}</button>`).join('');
 rewardBadges();sheet.hidden=false;};
// 같은 탭을 한 번 더 누르면 닫고 홈으로 돌아간다.
nav.onclick=e=>{const b=e.target.closest('[data-tab]');if(!b)return;const k=b.dataset.tab;
 if(k!=='home'&&b.getAttribute('aria-selected')==='true'){select('home');if(k==='mode')$('overlay')?.scrollIntoView({behavior:'smooth',block:'start'});return;}select(k);};
sheet.onclick=e=>{const go=e.target.closest('[data-go]')?.dataset.go;if(!go)return;sheet.hidden=true;select('home');
 if(go==='#tutorial')window.openTutorial?.();else if(go==='#play-tutorial')window.openPlayTutorial?.();else if(go[0]==='#')document.querySelector('.ranking')?.scrollIntoView({behavior:'smooth'});else $(go).click();};
// 캐릭터는 고른 한 장만 보이고, 변경을 누르면 전체가 펼쳐진다. 고르면 다시 접힌다.
const pick=$('char-pick'),more=document.createElement('button');more.type='button';more.id='char-more';more.textContent='캐릭터 변경';
more.onclick=()=>{pick.classList.toggle('open');const on=pick.classList.contains('open');more.textContent=on?'접기':'캐릭터 변경';if(on)pick.scrollIntoView({behavior:'smooth',block:'start'});};
pick.before(more);pick.addEventListener('click',e=>{if(e.target.closest('[data-char]')&&pick.classList.contains('open'))setTimeout(()=>more.click(),150);});
// 새 알림(!)은 해당 탭 위 빨간 점으로 옮긴다.
setInterval(()=>{if(typeof playing!=='undefined'&&playing){nav.hidden=true;sheet.hidden=true;return;}if(!sheet.hidden)rewardBadges();for(const t of TABS){if(!t[3])continue;const on=t[3].some(id=>rewardCount(id)>0||$(id)?.querySelector('b:not([hidden])'));const b=nav.querySelector(`[data-tab="${t[0]}"]`);if(on!==!!b.querySelector('i'))on?b.append(document.createElement('i')):b.querySelector('i').remove();}
 nav.hidden=!!$('overlay')&&getComputedStyle($('overlay')).display==='none';if(nav.hidden)sheet.hidden=true;},500);
document.body.classList.add('tabnav');document.body.append(sheet,nav);
})();
