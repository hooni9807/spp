// 하단 탭 메뉴(기본). ?nav=old 로 열면 예전 화면. 기존 버튼은 그대로 두고 탭 시트에서 대신 눌러 준다(기능 중복 없음).
(()=>{
if(/[?&]nav=old/.test(location.search))return;
const $=id=>document.getElementById(id);
const TABS=[
 ['home','⌂','홈'],
 ['mode','▶','모드'],
 ['grow','⬆','성장',['rn-open','enhance-home','racket-skin-open','fit-open','mine-open']],
 ['log','★','기록',['player-info-open','q-open','ach-open','t-open','tr-open','patch-notes-open']],
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
#char-more{margin:6px auto 0;display:block}
body.tabnav #overlay .start-card{padding-bottom:80px}
body.tabnav #mail-alert,body.tabnav #friends-btn{bottom:calc(env(safe-area-inset-bottom,0px) + 72px)}`;
document.head.append(css);
const nav=document.createElement('nav');nav.id='tabnav';nav.setAttribute('role','tablist');
const sheet=document.createElement('div');sheet.id='tabsheet';sheet.hidden=true;
nav.innerHTML=TABS.map(([k,ic,n])=>`<button type="button" role="tab" data-tab="${k}" aria-selected="${k==='home'}"><b aria-hidden="true">${ic}</b>${n}</button>`).join('');
const label=t=>t[0]==='#'?'랭킹':($(t)?.textContent.trim().replace(/\s*!$/,'')||'');
const select=k=>{nav.querySelectorAll('button').forEach(b=>b.setAttribute('aria-selected',b.dataset.tab===k));sheet.hidden=true;
 if(k==='mode'){$('mode-open')?.click();return;}
 const t=TABS.find(x=>x[0]===k);if(!t[3])return;
 const items=t[3].filter(id=>id[0]==='#'||$(id));
 sheet.innerHTML=`<h4>${t[2]}</h4>`+items.map(id=>`<button type="button" data-go="${id}">${label(id)}</button>`).join('');
 sheet.hidden=false;};
// 같은 탭을 한 번 더 누르면 닫고 홈으로 돌아간다.
nav.onclick=e=>{const b=e.target.closest('[data-tab]');if(!b)return;const k=b.dataset.tab;
 if(k!=='home'&&b.getAttribute('aria-selected')==='true'){select('home');if(k==='mode')$('overlay')?.scrollIntoView({behavior:'smooth',block:'start'});return;}select(k);};
sheet.onclick=e=>{const go=e.target.closest('[data-go]')?.dataset.go;if(!go)return;sheet.hidden=true;select('home');
 if(go[0]==='#')document.querySelector('.ranking')?.scrollIntoView({behavior:'smooth'});else $(go).click();};
// 캐릭터는 고른 한 장만 보이고, 변경을 누르면 전체가 펼쳐진다. 고르면 다시 접힌다.
const pick=$('char-pick'),more=document.createElement('button');more.type='button';more.id='char-more';more.textContent='캐릭터 변경';
more.onclick=()=>{pick.classList.toggle('open');const on=pick.classList.contains('open');more.textContent=on?'접기':'캐릭터 변경';if(on)pick.scrollIntoView({behavior:'smooth',block:'start'});};
pick.after(more);pick.addEventListener('click',e=>{if(e.target.closest('[data-char]')&&pick.classList.contains('open'))setTimeout(()=>more.click(),150);});
// 새 알림(!)은 해당 탭 위 빨간 점으로 옮긴다.
setInterval(()=>{for(const t of TABS){if(!t[3])continue;const on=t[3].some(id=>$(id)?.querySelector('b:not([hidden])'));const b=nav.querySelector(`[data-tab="${t[0]}"]`);if(on!==!!b.querySelector('i'))on?b.append(document.createElement('i')):b.querySelector('i').remove();}
 nav.hidden=!!$('overlay')&&getComputedStyle($('overlay')).display==='none';if(nav.hidden)sheet.hidden=true;},500);
document.body.classList.add('tabnav');document.body.append(sheet,nav);
})();
