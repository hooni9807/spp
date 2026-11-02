// PvP 대기방: 방을 만들면 대기방이 열리고, 상대가 들어와 "준비"를 누르면 방장이 "시작"으로 경기를 연다.
// 방 코드는 화면에 쓰지 않는다(목록에서 참가). 연결은 기존 PeerJS 그대로, 경기 전 짧은 메시지 {pvpRoom:…}만 주고받는다.
(()=>{
const $=id=>document.getElementById(id);
const css=document.createElement('style');css.textContent=`
#pvp-lobby .pvp-code-row{display:none}
#pvp-room{width:min(440px,calc(100vw - 32px));max-width:none;padding:20px 18px 18px;border:0;border-radius:16px;background:#0b1226;color:#eef3ff;box-shadow:0 30px 80px rgba(0,0,0,.6);font-family:'Pretendard Variable',Pretendard,-apple-system,sans-serif}
#pvp-room::backdrop{background:rgba(5,9,26,.82)}
#pvp-room h3{margin:0 0 4px;font-size:22px;font-weight:800;letter-spacing:-.02em}
#pvp-room .sub{margin:0 0 16px;font-size:13.5px;color:#93a4cc;min-height:1.4em}
#pvp-room .court{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:8px;margin-bottom:18px}
#pvp-room .vs{font:800 26px/1 'Barlow Condensed','Pretendard Variable',sans-serif;letter-spacing:.04em;color:#ff3b5c}
#pvp-room .slot{display:grid;justify-items:center;gap:6px;padding:14px 8px 12px;border-radius:14px;background:#111a35;text-align:center;min-width:0}
#pvp-room .slot canvas{width:76px;height:76px;border-radius:50%;background:radial-gradient(circle at 50% 35%,#18244a,#0b1226 72%);box-shadow:0 0 0 3px #111a35,0 0 0 5px #2a3a6a}
#pvp-room .slot.me canvas{box-shadow:0 0 0 3px #111a35,0 0 0 5px #14e0ff}
#pvp-room .slot b{font-size:15px;font-weight:800;letter-spacing:-.02em;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
#pvp-room .slot small{font-size:12px;color:#93a4cc}
#pvp-room .tag{font:700 12px 'Barlow Condensed','Pretendard Variable',sans-serif;letter-spacing:.06em;padding:3px 10px;border-radius:999px;border:1px dashed #4a5a85;color:#93a4cc}
#pvp-room .tag.on{border:0;background:#ffc94a;color:#2a1700}
#pvp-room .slot.empty canvas{box-shadow:0 0 0 3px #111a35,0 0 0 2px #4a5a85;animation:pvpWait 1.6s ease-in-out infinite}
@keyframes pvpWait{50%{opacity:.45}}
@media(prefers-reduced-motion:reduce){#pvp-room .slot.empty canvas{animation:none}}
#pvp-room .acts{display:flex;gap:8px}
#pvp-room .acts button{min-height:52px;border:0;font:800 16px inherit;cursor:pointer}
#pvp-room [data-act="leave"]{flex:0 0 auto;padding:0 18px;border-radius:10px;background:#111a35;color:#eef3ff}
#pvp-room [data-act="leave"]:hover{background:#18244a}
#pvp-room [data-act="main"]{flex:1;background:#14e0ff;color:#00131c;clip-path:var(--chamfer,none)}
#pvp-room [data-act="main"]:hover:not(:disabled){background:#7df0ff}
#pvp-room [data-act="main"].ready{background:#ffc94a;color:#2a1700}
#pvp-room [data-act="main"]:disabled{background:#18244a;color:#5d6b92;cursor:not-allowed}
#pvp-room button:focus-visible{outline:2px solid #7df0ff;outline-offset:2px}`;
document.head.append(css);
const d=document.createElement('dialog');d.id='pvp-room';d.setAttribute('aria-labelledby','pvp-room-title');
d.innerHTML=`<h3 id="pvp-room-title">PvP 대기방</h3><p class="sub" aria-live="polite"></p>
<div class="court"><div class="slot me" data-slot="host"><canvas width="96" height="96" aria-hidden="true"></canvas><b></b><small></small><span class="tag"></span></div>
<span class="vs" aria-hidden="true">VS</span>
<div class="slot" data-slot="guest"><canvas width="96" height="96" aria-hidden="true"></canvas><b></b><small></small><span class="tag"></span></div></div>
<div class="acts"><button type="button" data-act="leave">나가기</button><button type="button" data-act="main"></button></div>`;
document.body.append(d);
const me=()=>({name:(typeof myName==='function'&&myName())||LOOKS?.[charType]?.nick||'선수',char:typeof charType==='string'?charType:'',lv:$('lv-label')?.textContent||''});
let st=null;   // {role,conn,go,onLeave,host,guest,ready}
const paint=(slot,p,tag,on)=>{const el=d.querySelector(`[data-slot="${slot}"]`),cv=el.querySelector('canvas'),g=cv.getContext('2d');g.clearRect(0,0,96,96);
 el.classList.toggle('empty',!p);el.classList.toggle('me',!!p&&st&&slot===(st.role==='host'?'host':'guest'));
 const src=p&&document.querySelector(`#char-pick [data-char="${p.char}"] canvas`);if(src)g.drawImage(src,0,0,96,96);
 el.querySelector('b').textContent=p?p.name:'빈 자리';el.querySelector('small').textContent=p?[LOOKS?.[p.char]?.nick,p.lv].filter(Boolean).join(' · '):'참가를 기다리는 중';
 const t=el.querySelector('.tag');t.textContent=tag;t.classList.toggle('on',!!on);};
const render=()=>{if(!st)return;const host=st.role==='host',main=d.querySelector('[data-act="main"]'),sub=d.querySelector('.sub');
 paint('host',st.host,'방장',true);paint('guest',st.guest,st.guest?(st.ready?'준비 완료':'준비 중'):'대기',st.ready);
 main.classList.remove('ready');
 if(host){main.textContent='시작';main.disabled=!(st.guest&&st.ready);sub.textContent=!st.guest?'공개 방을 열었어요. 상대가 목록에서 들어오면 여기에 보여요.':st.ready?'상대가 준비됐어요. 시작을 눌러 경기를 여세요.':'상대가 준비를 누르면 시작할 수 있어요.';}
 else{main.disabled=!st.conn;main.textContent=st.ready?'준비 취소':'준비';main.classList.toggle('ready',st.ready);sub.textContent=st.ready?'방장이 시작하면 바로 경기가 열려요.':'준비를 누르면 방장이 경기를 시작할 수 있어요.';}};
const send=m=>{try{st?.conn?.send({pvpRoom:m.t,...m});}catch{}};
const close=()=>{window.pvpRoomBusy=false;st=null;if(d.open)d.close();};
// 방장이 방 만들기를 누른 순간: 빈 대기방부터 연다.
window.pvpRoomHost=lobby=>{lobby?.close();st={role:'host',conn:null,host:me(),guest:null,ready:false,lobby};render();if(!d.open)d.showModal();};
// 연결이 열린 뒤: 서로 이름 · 캐릭터를 주고받고, 준비 → 시작 순서로 경기를 연다.
window.pvpWaitRoom=(role,conn,go,onLeave)=>{
 if(role==='host'){window.pvpRoomBusy=true;st={...(st||{}),role,conn,go,onLeave,host:me(),guest:{name:'입장 중…',char:'',lv:''},ready:false};}
 else st={role,conn,go,onLeave,host:{name:'방장',char:'',lv:''},guest:me(),ready:false};
 if(!d.open)d.showModal();render();
 const mine=st,started=()=>st!==mine;
 conn.on('data',m=>{if(started())return;
  if(!m||typeof m!=='object'||!m.pvpRoom){   // 대기방을 모르는 옛 버전 방장이 바로 경기를 연 경우: 그대로 이어 받는다
   if(role==='guest'){close();go();window.onNet?.(m);}return;}
  const peer={name:String(m.name||'선수').slice(0,12),char:String(m.char||'').slice(0,24),lv:String(m.lv||'').slice(0,10)};
  if(m.pvpRoom==='hello'){if(role==='host')st.guest=peer;else st.host=peer;}
  else if(m.pvpRoom==='ready'&&role==='host')st.ready=!!m.on;
  else if(m.pvpRoom==='start'&&role==='guest'){close();go();return;}
  else if(m.pvpRoom==='leave'){leftByPeer();return;}
  render();});
 conn.on('close',()=>{if(!started())leftByPeer();});
 send({t:'hello',...me()});};
const leftByPeer=()=>{if(!st)return;const s=st;
 if(s.role==='host'){window.pvpRoomBusy=false;st={...s,conn:null,guest:null,ready:false};try{s.conn?.close();}catch{}s.onLeave?.();render();d.querySelector('.sub').textContent='상대가 나갔어요. 다른 상대를 기다리는 중…';}
 else{close();s.onLeave?.();typeof toast==='function'&&toast('방장이 방을 닫았어요',2.2);}};
d.addEventListener('click',e=>{const act=e.target.closest('[data-act]')?.dataset.act;if(!act||!st)return;
 if(act==='main'){if(st.role==='host'){if(!st.guest||!st.ready)return;send({t:'start'});const go=st.go;close();go();}
  else{st.ready=!st.ready;send({t:'ready',on:st.ready});render();}}
 if(act==='leave')leave();});
d.addEventListener('cancel',e=>{e.preventDefault();leave();});
function leave(){if(!st)return;const s=st;send({t:'leave'});try{s.conn?.close();}catch{}close();
 if(s.role==='host'){if(lobbyPeer&&!net){roomClose();try{lobbyPeer.destroy();}catch{}lobbyPeer=null;}else if(!net)try{s.conn?.provider?.destroy();}catch{}const l=s.lobby;if(l){l.querySelector('[data-pvp-create]').disabled=false;l.querySelector('.pvp-cancel-wait').hidden=true;}}
 else s.onLeave?.();}
})();
