// Space War: Earth fields three different players against a planet's delegation.
(()=>{
if(window.sppSpaceConquest)return;
const PLANETS=[
 {id:'mars',name:'화성',sub:'붉은 모래의 결투',color:'#ff9671',tier:'ultra',return:.94,style:'drive',names:['아레스','루브라','포보스'],skills:['붉은 유성 드라이브','모래폭풍 커브','포보스 스매시']},
 {id:'jupiter',name:'목성',sub:'대적점의 폭풍',color:'#e9bf87',tier:'uhard',return:.95,style:'side',names:['제피르','이오','가니메데'],skills:['대적점 회전','이오 플릭','중력 스매시']},
 {id:'saturn',name:'토성',sub:'고리를 가르는 궤적',color:'#ffe6a1',tier:'uext',return:.96,style:'cut',names:['크로노스','타이탄','레아'],skills:['고리 커트','타이탄 방어','레아 카운터']},
 {id:'neptune',name:'해왕성',sub:'푸른 심해의 반격',color:'#71baff',tier:'unight',return:.97,style:'cut',names:['넵투누스','트리톤','네레이드'],skills:['심해 하회전','해류 커브','푸른 파도 스매시']},
 {id:'proxima',name:'프록시마 b',sub:'가장 가까운 별의 사절',color:'#d09cff',tier:'uext',return:.96,style:'side',names:['프록스','센타우리','알파'],skills:['적색 왜성 커브','광속 리시브','알파 드라이브']},
 {id:'kepler',name:'케플러-22b',sub:'녹색 성운의 수호자',color:'#76e1bf',tier:'unight',return:.97,style:'defend',names:['케이론','베르다','루멘'],skills:['성운 수비','에메랄드 커트','루멘 반격']},
 {id:'trappist',name:'트라피스트-1e',sub:'일곱 별의 마지막 관문',color:'#ff8bc0',tier:'unight',return:.98,style:'mix',names:['트리아','에코','오리온'],skills:['항성풍 커브','에코 커트','오리온 스매시']}
];
const $=id=>document.getElementById(id);
let selected='mars',run=null,starting=false;
const key=()=> 'space-war:'+ (googleUser?.uid||'local');
const opponent=(p,i)=>'space_'+p.id+'_'+i;
const planet=id=>PLANETS.find(p=>p.id===id);
const active=()=>!!run?.live&&!net&&mode==='match'&&aiChar===opponent(planet(run.planet),run.round);
const face=(p,i)=>'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(
 '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180"><defs><radialGradient id="bg"><stop stop-color="'+p.color+'" stop-opacity=".3"/><stop offset="1" stop-color="#101b38"/></radialGradient></defs><circle cx="90" cy="90" r="88" fill="url(#bg)"/><path d="M45 68Q29 33 64 47Q88 '+(8+i*9)+' 116 47Q153 29 135 68L143 96Q137 151 90 156Q43 151 37 96Z" fill="'+p.color+'"/><path d="M51 '+(77+i*3)+'Q66 69 79 88Q69 112 53 99ZM129 '+(77+i*3)+'Q114 69 101 88Q111 112 127 99Z" fill="#101628"/><circle cx="64" cy="87" r="5" fill="#fff"/><circle cx="116" cy="87" r="5" fill="#fff"/><path d="M72 127Q90 '+(132+i*5)+' 108 127" fill="none" stroke="#253249" stroke-width="5" stroke-linecap="round"/><path d="M59 50L90 '+(31+i*5)+'L121 50" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="3"/></svg>');
for(const p of PLANETS)for(let i=0;i<3;i++){
 const id=opponent(p,i),im=new Image();im.src=face(p,i);FACES[id]=im;
 LOOKS[id]={name:p.names[i],nick:p.names[i],face:id,boss:true,spacePlayer:true,split:true,faceFit:{h:46,b:22,cx:.5},shirt:p.color,sleeve:'#17213e',collar:p.color,pants:'#11182a',hair:'#17234a',skin:p.color,skinShade:'#59718c',kit:{name:'COSMOS',color:p.color},ceremony:p.skills[i]};
}
function valid(r){return r&&planet(r.planet)&&Array.isArray(r.team)&&r.team.length===3&&new Set(r.team).size===3&&r.team.every(k=>LOOKS[k]&&characterAvailable(k))&&Number.isInteger(r.round)&&r.round>=0&&r.round<=3&&Number.isInteger(r.my)&&Number.isInteger(r.ai)&&r.my>=0&&r.ai>=0&&r.my+r.ai===r.round&&r.my<=2&&r.ai<=2;}
function save(){if(valid(run))store.set(key(),JSON.stringify(run));}
function load(){try{const r=JSON.parse(store.get(key())||'null');if(valid(r))return r;}catch{}return null;}
const cleared=p=>!!tS()['spaceWar_'+p.id];
const dialog=document.createElement('dialog');dialog.id='space-conquest';dialog.setAttribute('aria-labelledby','space-title');document.body.append(dialog);
function openSpace(){
 if(net){toast('온라인 경기를 종료한 뒤 도전해 주세요.',2);return;}
 if(!run)run=load();
 if(run?.live)selected=run.planet;
 render();if(!dialog.open)dialog.showModal();
}
function render(){
 const p=planet(selected),live=run?.live&&run.planet===selected;
 const chars=unlockedCharacters().filter(k=>LOOKS[k]),draft=live?[...run.team]:[...new Set([charType,...chars])].filter(k=>chars.includes(k)).slice(0,3);
 dialog.style.setProperty('--space-accent',p.color);
 dialog.innerHTML='<button type="button" class="space-x" aria-label="닫기">✕</button>'+
 '<header class="sw-header"><small>EARTH DELEGATION · GALACTIC CUP</small><h2 id="space-title">우주전쟁</h2><p>지구 대표 3명, 우리 은하의 행성 대표단에 도전하다.</p><div class="sw-tags"><span>3인 단체전</span><span>3전 2선승</span><span>캐릭터 중복 출전 불가</span></div></header>'+
 '<section class="sw-earth"><span aria-hidden="true">🌍</span><div><small>YOUR HOME · 지구 대표팀</small><b>다음 승부는 지구의 이름으로.</b><p>각 단식은 11점 · 2점 차 승리. 두 경기를 먼저 이기면 행성전 승리입니다.</p></div><strong>'+PLANETS.filter(cleared).length+'<small>/ '+PLANETS.length+' 행성 승리</small></strong></section>'+
 '<section><h3>01 <span>도전할 행성</span></h3><div class="sw-planets">'+PLANETS.map(q=>'<button type="button" data-planet="'+q.id+'" aria-pressed="'+(q.id===selected)+'" style="--planet:'+q.color+'"><i class="sw-orb '+(q.id==='saturn'?'ringed':'')+'" aria-hidden="true"></i><b>'+q.name+'</b><small>'+q.sub+'</small><em>'+(cleared(q)?'✓ 승리 기록':TIERS[q.tier].name)+'</em></button>').join('')+'</div></section>'+
 '<section class="sw-delegation"><div class="sw-section-heading"><h3>02 <span>'+p.name+' 대표단</span></h3><small>'+p.sub+'</small></div><div class="sw-opponents">'+p.names.map((n,i)=>'<figure><span>0'+(i+1)+' · '+(i+1)+'단식</span><img src="'+FACES[opponent(p,i)].src+'" alt="'+n+'"><figcaption>'+n+'<small>'+p.skills[i]+'</small></figcaption></figure>').join('')+'</div></section>'+
 '<section><div class="sw-section-heading"><h3>03 <span>지구 대표 출전 명단</span></h3><small>'+(live?'진행 중 · 지구 '+run.my+' : '+run.ai+' '+p.name:'단식마다 다른 캐릭터를 선택하세요')+'</small></div><div class="sw-team">'+[0,1,2].map(i=>'<label class="'+(live&&i<run.round?'done':'')+'"><span><b>'+(i+1)+'단식</b><small>'+(live&&i<run.round?'경기 완료':live&&i===run.round?'다음 출전':'EARTH PLAYER')+'</small></span><canvas width="88" height="88" data-team-face="'+i+'"></canvas><select aria-label="'+(i+1)+'단식 출전 캐릭터" data-space-slot="'+i+'" '+(live?'disabled':'')+'>'+chars.map(k=>'<option value="'+k+'" '+(k===draft[i]?'selected':'')+'>'+(LOOKS[k].nick||LOOKS[k].name)+'</option>').join('')+'</select></label>').join('')+'</div><p class="sw-help" role="status">명단 확인 후 출전 버튼을 누르면 1단식부터 시작합니다.</p></section>'+
 '<footer><button type="button" class="sw-back">도전 무대</button><button type="button" class="sw-launch">'+(live?(run.round+1)+'단식 이어서 출전 · '+run.my+':'+run.ai:'지구 대표팀 출전')+' <span aria-hidden="true">↗</span></button></footer>'+
 '<p class="sw-fiction">SF 테마의 가상 행성 대표단입니다. 태양계와 우리 은하의 외계행성에서 영감을 받았습니다.</p>';
 dialog.querySelector('.space-x').onclick=()=>dialog.close();
 dialog.querySelector('.sw-back').onclick=()=>{dialog.close();$('arena-open')?.click();};
 dialog.querySelectorAll('[data-planet]').forEach(b=>b.onclick=()=>{
  if(run?.live&&b.dataset.planet!==run.planet){toast('진행 중인 행성전을 완료하거나 포기한 뒤 다른 행성을 선택하세요.',2);return;}
  selected=b.dataset.planet;render();
 });
 const selectors=[...dialog.querySelectorAll('[data-space-slot]')],button=dialog.querySelector('.sw-launch');
 const refresh=()=>{
  const team=selectors.map(s=>s.value),unique=new Set(team).size===3&&team.every(Boolean);
  selectors.forEach((s,i)=>{drawFace(dialog.querySelector('[data-team-face="'+i+'"]'),LOOKS[s.value]||LOOKS.jersey);for(const o of s.options)o.disabled=team.some((k,j)=>i!==j&&k===o.value);});
  button.disabled=!unique;dialog.querySelector('.sw-help').textContent=unique?(live?'선택한 명단으로 '+(run.round+1)+'단식부터 이어갑니다.':'3명의 지구 대표가 준비되었습니다. 먼저 2승을 거두세요.'):'서로 다른 캐릭터 3명을 선택해 주세요.';
 };
 selectors.forEach(s=>s.onchange=refresh);refresh();
 button.onclick=()=>{
  if(!prepareWorldDeparture())return;
  if(!live)run={planet:selected,team:selectors.map(s=>s.value),round:0,my:0,ai:0,live:true,last:null};
  if(!valid(run)||new Set(run.team).size!==3)return;
  dialog.close();save();game();
 };
 if(live){
  const quit=document.createElement('button');quit.type='button';quit.className='sw-forfeit';quit.textContent='현재 행성전 포기';quit.onclick=()=>{if(!confirm('진행 중인 행성전을 포기할까요?'))return;run.live=false;save();render();};dialog.querySelector('.sw-help').after(quit);
 }
}
function game(){
 const r=run,p=r&&planet(r.planet);if(!r?.live||!p||r.my>=2||r.ai>=2||r.round>=3)return;
 setCharacter(r.team[r.round]);aiTier=p.tier;setMode('match');starting=true;
 try{begin(opponent(p,r.round));}finally{starting=false;}
 if(!playing)return;
 aiFit=null;nightmareDomainEnd();aiCharge=40+r.round*10;save();
 $('cpu-name').textContent=p.name+' · '+p.names[r.round]+' · '+(r.round+1)+'단식 · '+r.my+':'+r.ai;
 toast('우주전쟁 · 지구 '+r.my+' : '+r.ai+' '+p.name+' · '+(r.round+1)+'단식',2.5);
}
onBegin('pre',25,()=>{if(!starting){save();run=null;}});
onHome('pre',25,save);
const normalRecord=rankRecord;rankRecord=function(...args){const record=normalRecord.apply(this,args);if(active()||run?.last===matchId&&aiChar.startsWith('space_'))record.event=true;return record;};
const normalReturn=P.returnRoll;P.returnRoll=function(b,t,c,bonus=0){const rate=normalReturn(b,t,c,bonus);if(!active())return rate;return b?.ult?Math.max(.6,rate):P.normalShot(b)?Math.max(planet(run.planet).return,rate):rate;};
onAiShot('pre',45,a=>{
 if(!active())return;const p=planet(run.planet),style=run.round===2?'drive':p.style;
 if(style==='side'){a.kind='side';a.spin*=1.4;}
 if(style==='cut'){a.kind=rally%3?'cut':'drive';a.spin*=1.4;}
 if(style==='defend'){a.kind=rally%2?'cut':'block';a.speed*=.95;}
 if(style==='mix')a.kind=['side','cut','drive'][(rally+run.round)%3];
 if(style==='drive'){a.kind='drive';a.speed*=1.12;}
 a.speed=Math.min(a.speed,4.2);a.spin=P.clamp(a.spin,-2.3,2.3);a.aim=P.clamp(a.aim,-.55,.55);
});
onResult('pre',45,c=>{
 const r=run;if(!r||(!active()&&r.last!==matchId))return;c.spaceWar=r;
 if(r.last===matchId)return;r.last=matchId;c.won?r.my++:r.ai++;r.round++;
 if(r.my>=2||r.ai>=2||r.round>=3){r.live=false;if(r.my>=2){tS()['spaceWar_'+r.planet]=(tS()['spaceWar_'+r.planet]||0)+1;saveProg();}}
 save();
});
onResult('post',95,c=>{
 if(!c.spaceWar){$('result').querySelector('.sw-save-exit')?.remove();return;}
 const r=c.spaceWar,p=planet(r.planet),d=$('result');
 $('rs-title').textContent=r.live?(c.won?'지구 대표 단식 승리!':'다음 단식을 준비하세요'):r.my>=2?p.name+' 대표단 격파!':'지구 대표팀 도전 종료';
 const line=document.createElement('li');line.textContent='우주전쟁 · 지구 '+r.my+' : '+r.ai+' '+p.name+' · '+r.round+'/3 단식';$('rs-lines').prepend(line);
 d.querySelectorAll('.rs-grid [data-rs]').forEach(b=>b.hidden=b.dataset.rs!=='retry'&&b.dataset.rs!=='close');
 d.querySelector('[data-rs="retry"]').textContent=r.live?'다음 단식 · '+(r.round+1)+'단식':'행성 선택으로';
 d.querySelectorAll('.rs-grid [data-rs="close"]').forEach(b=>b.hidden=true);
 let exit=d.querySelector('.sw-save-exit');if(!exit){exit=document.createElement('button');exit.type='button';exit.className='sw-save-exit';d.querySelector('.rs-grid').append(exit);}
 exit.textContent='저장하고 나가기';exit.onclick=()=>{save();d.close();goHome();};
});
window.addEventListener('click',e=>{
 if(!e.target.closest?.('#result [data-rs="retry"]')||!run||!aiChar.startsWith('space_'))return;
 e.preventDefault();e.stopImmediatePropagation();$('result').close();if(run.live)game();else{run=null;openSpace();}
},true);
const oldButton=$('space-open');if(oldButton)oldButton.remove();
const style=document.createElement('style');style.textContent=String.raw`
#space-conquest{width:min(820px,95vw);max-height:92dvh;overflow:auto;padding:0;border:1px solid #8c9cce80;border-radius:22px;background:radial-gradient(ellipse at 95% 0%,#633b824d,transparent 42%),radial-gradient(circle at 20% 10%,#fff5 0 1px,transparent 2px),radial-gradient(circle at 80% 20%,#fff6 0 1px,transparent 2px),linear-gradient(155deg,#0b1530,#070c1d);color:#edf6ff;box-shadow:0 30px 100px #000b;font-family:'Pretendard Variable',Pretendard,sans-serif}
#space-conquest::backdrop{background:#030615d9;backdrop-filter:blur(5px)}
#space-conquest .space-x{position:absolute;right:18px;top:18px;width:40px;height:40px;border:1px solid #a4b2d55c;border-radius:50%;background:#14213f;color:#fff;font-size:22px}
#space-conquest .sw-header{height:auto;display:block;padding:30px 28px 24px;border:0;border-bottom:1px solid #8ba2d72b;background:linear-gradient(115deg,#20396980,#402b6150)}
#space-conquest .sw-header>small{color:#91e5ff;font-size:10px;font-weight:800;letter-spacing:.2em}
#space-conquest h2{margin:9px 0;font-size:clamp(30px,7vw,44px);letter-spacing:-.06em}
#space-conquest p{font-size:12px;line-height:1.7;color:#b4c3df;margin:6px 0}
.sw-tags{display:flex;flex-wrap:wrap;gap:6px;margin-top:16px}.sw-tags span{padding:5px 9px;border:1px solid #8ba2d744;border-radius:20px;color:#dae7ff;font-size:10px;background:#0c142b60}
#space-conquest section{margin:20px 26px}#space-conquest .sw-earth{display:flex;align-items:center;gap:15px;padding:16px;border:1px solid #66e1ca44;background:linear-gradient(110deg,#123b3d50,#12213d);border-radius:15px}
.sw-earth>span{font-size:43px}.sw-earth>div{flex:1}.sw-earth small{display:block;color:#7ae7d6;font-size:9px;letter-spacing:.07em}.sw-earth b{display:block;margin-top:4px;font-size:15px}.sw-earth>strong{font-size:30px;text-align:right;color:#adf6ea}.sw-earth>strong small{font-size:9px;white-space:nowrap}
#space-conquest h3{margin:0 0 12px;color:var(--space-accent);font-size:12px;letter-spacing:.06em}#space-conquest h3 span{margin-left:7px;color:#f1f5ff;font-size:16px;letter-spacing:-.02em}
.sw-planets{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:9px}
#space-conquest .sw-planets button{position:relative;display:grid;justify-items:center;gap:5px;padding:14px 5px 10px;min-width:0;border:1px solid #7793c633;border-radius:14px;background:linear-gradient(145deg,#19294b,#10172d);color:#f0f5ff;font:inherit}
#space-conquest .sw-planets button[aria-pressed="true"]{border-color:var(--planet);box-shadow:inset 0 0 24px color-mix(in srgb,var(--planet) 15%,transparent),0 0 0 1px var(--planet)}
.sw-orb{display:block;position:relative;width:40px;height:40px;margin:4px 0 6px;border-radius:50%;background:radial-gradient(circle at 30% 25%,#fff8,transparent 38%),linear-gradient(135deg,var(--planet),#10172d);box-shadow:0 0 22px color-mix(in srgb,var(--planet) 25%,transparent)}
.sw-orb.ringed:after{content:'';position:absolute;inset:12px -10px;border:3px solid #eacb8799;border-radius:50%;transform:rotate(-25deg)}
.sw-planets b{font-size:12px}.sw-planets small{font-size:9px;color:#9eafcf;text-align:center}.sw-planets em{font:700 9px/1.3 inherit;color:var(--planet);font-style:normal}
.sw-section-heading{display:flex;align-items:center;justify-content:space-between;gap:10px}.sw-section-heading>small{font-size:10px;color:#9cafd0}
.sw-opponents{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;border:1px solid #7593c738;border-radius:16px;background:linear-gradient(120deg,#17223f,#191b37);padding:16px 10px}
.sw-opponents figure{margin:0;text-align:center;min-width:0}.sw-opponents figure>span{display:block;font:700 9px/1.3 monospace;color:#8eabd1}.sw-opponents img{width:min(100%,94px);height:auto;aspect-ratio:1;object-fit:contain;margin:10px auto 4px}.sw-opponents figcaption{font-size:14px;font-weight:800}.sw-opponents figcaption small{display:block;font-size:10px;font-weight:400;color:var(--space-accent);margin-top:5px}
.sw-team{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}.sw-team label{display:grid;justify-items:center;gap:8px;min-width:0;padding:12px 8px;border:1px solid #748bbe4d;border-radius:13px;background:#14213a}.sw-team label.done{opacity:.55}.sw-team label>span{display:flex;flex-direction:column;align-items:center;gap:4px}.sw-team label b{font-size:12px;color:#b9dcff}.sw-team label small{font-size:8px;color:#92a8ca}.sw-team canvas{width:60px;height:60px}.sw-team select{width:100%;min-width:0;min-height:42px;padding:7px 4px;border:1px solid #708db05c;border-radius:7px;background:#0b1429;color:#edf6ff;font:700 12px inherit}.sw-team option{background:#0b1429;color:#edf6ff}
#space-conquest .sw-help{margin:12px 0;color:#b3c9e9}.sw-forfeit{border:0;background:transparent;color:#f1a5ae;text-decoration:underline;padding:6px;font:inherit;font-size:11px}
#space-conquest footer{position:sticky;bottom:0;margin:0;padding:15px 26px;border-top:1px solid #829dc642;background:#0b1327f5;display:flex;gap:10px;letter-spacing:0}
#space-conquest footer button{min-height:48px;padding:0 16px;border-radius:10px;font:800 13px inherit}.sw-back{background:#19243c;color:#ccdcf6;border:1px solid #758db447}.sw-launch{flex:1;display:flex;justify-content:space-between;align-items:center;background:linear-gradient(110deg,#8ce8f3,#bdabff);color:#081629;border:0}.sw-launch:disabled{opacity:.4}
#space-conquest .sw-fiction{margin:12px 26px 18px;font-size:9px;color:#7689ae}
#space-conquest button:focus-visible,#space-conquest select:focus-visible{outline:2px solid #bcf0ff;outline-offset:3px}
@media(max-width:540px){#space-conquest .sw-header{padding:25px 18px 20px}#space-conquest section{margin:18px 16px}.sw-planets{grid-template-columns:repeat(2,minmax(0,1fr))}.sw-earth>span{font-size:34px}.sw-earth>strong{font-size:24px}.sw-section-heading{display:block}.sw-section-heading>small{display:block;margin:-5px 0 10px}.sw-opponents{padding:14px 5px;gap:5px}.sw-opponents figcaption{font-size:12px}.sw-opponents figcaption small{font-size:9px}.sw-team{gap:6px}.sw-team label{padding:10px 5px}.sw-team select{font-size:11px}.sw-team canvas{width:52px;height:52px}#space-conquest footer{padding:13px 16px}}
`;document.head.append(style);
window.sppSpaceConquest={open:openSpace,profiles:PLANETS,get run(){return run;},active};
})();
