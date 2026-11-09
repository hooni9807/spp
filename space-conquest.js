// Space War: Earth fields three different players against a planet's delegation.
(()=>{
if(window.sppSpaceConquest)return;
const RULES={tier:'unight',label:'???',normalReturn:.97,ultimateReturn:.90,power:2.5};
const PLANETS=[
 {id:'mars',name:'화성',sub:'붉은 모래의 결투',color:'#ff9671',tier:'unight',return:.97,style:'drive',fx:'meteor',ci:'shatter',ults:['meteor','phoenix','sunflare'],names:['아레스','루브라','포보스'],skills:['붉은 유성 드라이브','모래폭풍 커브','포보스 스매시']},
 {id:'jupiter',name:'목성',sub:'대적점의 폭풍',color:'#e9bf87',tier:'unight',return:.98,style:'side',fx:'drill',ci:'vortex',ults:['twister','blitz','thunderc'],names:['제피르','이오','가니메데'],skills:['대적점 회전','이오 플릭','중력 스매시']},
 {id:'saturn',name:'토성',sub:'고리를 가르는 궤적',color:'#ffe6a1',tier:'unight',return:.98,style:'cut',fx:'ring',ci:'frame',ults:['eclipse','mirror','bladerx'],names:['크로노스','타이탄','레아'],skills:['고리 커트','타이탄 방어','레아 카운터']},
 {id:'neptune',name:'해왕성',sub:'푸른 심해의 반격',color:'#71baff',tier:'unight',return:.98,style:'cut',fx:'water',ci:'split',ults:['tsunami','tide','frostloop'],names:['넵투누스','트리톤','네레이드'],skills:['심해 하회전','해류 커브','푸른 파도 스매시']},
 {id:'proxima',name:'프록시마 b',sub:'가장 가까운 별의 사절',color:'#d09cff',tier:'unight',return:.99,style:'side',fx:'star',ci:'rays',ults:['rocket','radiant','lunar'],names:['프록스','센타우리','알파'],skills:['적색 왜성 커브','광속 리시브','알파 드라이브']},
 {id:'kepler',name:'케플러-22b',sub:'녹색 성운의 수호자',color:'#76e1bf',tier:'unight',return:.99,style:'defend',fx:'shard',ci:'shatter',ults:['dragon','hawk','feather'],names:['케이론','베르다','루멘'],skills:['성운 수비','에메랄드 커트','루멘 반격']},
 {id:'trappist',name:'트라피스트-1e',sub:'일곱 별의 마지막 관문',color:'#ff8bc0',tier:'unight',return:.99,style:'mix',fx:'mist',ci:'vortex',ults:['banana','flick','eclipse'],names:['트리아','에코','오리온'],skills:['항성풍 커브','에코 커트','오리온 스매시']}
];
const $=id=>document.getElementById(id);
let selected='mars',run=null,starting=false;
const key=()=> 'space-war:'+ (googleUser?.uid||'local');
const opponent=(p,i)=>'space_'+p.id+'_'+i;
const planet=id=>PLANETS.find(p=>p.id===id);
const active=()=>!!run?.live&&!net&&mode==='match'&&aiChar===opponent(planet(run.planet),run.round);
function face(p,i){
 const path=(d,fill='url(#skin)',stroke='#142039',width=2)=>'<path d="'+d+'" fill="'+fill+'" stroke="'+stroke+'" stroke-width="'+width+'" stroke-linejoin="round" stroke-linecap="round"/>';
 const ellipse=(x,y,rx,ry,fill)=>'<ellipse cx="'+x+'" cy="'+y+'" rx="'+rx+'" ry="'+ry+'" fill="'+fill+'"/>';
 const eye=(x,y,r=8)=>ellipse(x,y,r,r*1.18,'#071528')+ellipse(x+1,y-1,r*.53,r*.7,'#e8ffff');
 let art='';
 if(p.id==='mars'){
  art=path(['M45 65L30 32L64 42L90 24L117 42L151 29L138 77L130 130L90 158L47 129Z','M34 65L50 20L78 42L103 31L142 55L133 128L90 157L45 126Z','M31 57L65 47L90 15L116 47L149 57L131 133L90 160L48 133Z'][i])+path('M45 77L90 66L136 77L124 105L90 111L55 105Z','#14243a');
  art+=i===0?path('M58 88L77 83M104 83L123 88','none','#ffe9a4',5):i===1?ellipse(90,88,26,8,'#ffeeab'):eye(90,88,14);
  art+=path('M64 122L90 132L115 122M90 111V132','none','#652e2c',3)+path('M51 55L66 60M115 59L129 54','none','#fff3c2',3);
 }else if(p.id==='jupiter'){
  art=path(['M40 74Q22 43 57 40Q70 12 96 31Q135 14 142 53Q163 75 141 103Q139 147 93 156Q43 151 35 118Z','M43 54Q43 22 78 32Q113 8 137 44Q162 49 145 81L145 120Q115 168 73 151Q30 143 33 99Z','M25 76Q14 48 48 47Q61 11 90 30Q125 12 136 48Q171 47 155 84L140 131Q89 174 41 130Z'][i]);
  art+=path('M45 62Q80 78 133 57M39 111Q90 95 144 114M57 135Q95 119 123 137','none','#8b583b66',8);
  art+=i===0?eye(66,92,9)+eye(113,92,9):i===1?eye(61,88,8)+eye(90,81,9)+eye(120,88,8):eye(90,94,18);
  art+=path('M66 119Q90 135 116 118','none','#5c3d42',4)+path('M52 43Q70 27 85 43T123 40','none','#fff7df',4);
 }else if(p.id==='saturn'){
  art='<ellipse cx="90" cy="80" rx="76" ry="22" fill="none" stroke="#c4a5ff" stroke-width="5" transform="rotate('+[-24,0,24][i]+' 90 80)"/>';
  art+=path(['M55 45L90 26L126 45L140 102L120 140L90 154L59 137L39 103Z','M51 38H129L144 70V125L121 151H60L36 125V70Z','M90 22L138 55L130 125L90 160L50 125L42 55Z'][i],'url(#metal)','#839bc1',3);
  art+=i===0?eye(90,88,23):i===1?path('M51 75H129V103H51Z','#080f26')+path('M61 89H119','none','#ffeab1',6):eye(71,84,9)+eye(109,84,9)+eye(90,111,6);
  art+=path('M66 127H113M72 137H107','none','#8ca9ca',3)+path('M65 45L90 34L115 45','none',p.color,4);
 }else if(p.id==='neptune'){
  art=path(['M47 70L19 43L26 104L45 118L61 145Q90 165 119 145L139 116L156 100L161 43L134 70Q90 24 47 70Z','M39 89L22 59L51 61L67 24L90 46L114 24L131 64L159 60L139 94L132 136L90 158L49 136Z','M44 76L13 70L30 109L49 121L58 148L90 165L122 146L131 117L151 107L168 69L136 76L125 43Q90 26 55 44Z'][i]);
  art+=i===2?eye(68,83,7)+eye(112,83,7)+eye(74,104,5)+eye(106,104,5):ellipse(67,92,14,9,'#092d4a')+ellipse(113,92,14,9,'#092d4a')+ellipse(68,91,5,7,'#a2ffff')+ellipse(112,91,5,7,'#a2ffff');
  art+=path('M42 93L52 101M38 106L51 112M130 101L141 93M129 112L144 104M80 128Q90 134 101 127','none','#b3ffec',3);
 }else if(p.id==='proxima'){
  art=path(['M90 18L119 47L147 59L135 117L112 146L90 163L62 140L44 113L32 59L61 47Z','M48 59L58 21L84 48L115 18L130 59L145 84L127 132L90 157L51 130L35 86Z','M90 16L110 44L148 42L134 88L147 126L112 139L90 164L66 140L33 127L47 90L31 43L70 44Z'][i],'url(#crystal)','#e6b3ff',2);
  art+=path('M90 20V158M35 60L90 91L145 60M46 117L90 91L133 117','none','#f1d6ff66',2);
  art+=i===0?path('M57 78L78 87L62 101Z M123 78L102 87L118 101Z','#fff7c3'):i===1?eye(90,82,17):eye(64,81,7)+eye(115,81,7)+eye(90,117,6);
  art+=path('M79 132L90 140L103 131','none','#f9eaff',2);
 }else if(p.id==='kepler'){
  art=path(['M42 82Q17 46 58 52Q43 12 82 37Q99 9 115 42Q158 23 137 66Q161 88 139 116L117 145L90 157L59 143L38 112Z','M41 73Q18 35 65 43L90 14L113 42Q161 31 138 73L133 125L112 148L90 155L62 145L46 120Z','M34 82L18 53L59 58L56 23L90 46L125 22L122 58L163 52L142 83L139 126L113 147L90 161L64 145L42 122Z'][i]);
  art+=path('M90 36L90 148M59 54L76 72M122 51L104 72M53 117L76 126M127 117L103 128','none','#1d705d',3);
  art+=i===1?eye(90,92,16):ellipse(66,96,13,8,'#09362d')+ellipse(114,96,13,8,'#09362d')+ellipse(66,95,4,5,'#fff0a6')+ellipse(114,95,4,5,'#fff0a6');
  art+=path('M76 134Q90 141 106 132','none','#12453c',3)+ellipse(90,58,6,8,'#e8fff0');
 }else{
  art=path(['M90 20Q116 47 128 54Q156 78 135 118L115 141L90 160L66 140L46 113Q25 77 52 55Q72 44 90 20Z','M47 49L68 39L90 17L113 39L136 49L142 106L122 138L90 162L58 138L37 105Z','M90 21L107 49L139 41L131 75L155 95L126 112L126 145L96 136L75 160L64 129L34 124L51 97L30 72L64 69L65 39Z'][i],'url(#cosmos)','#ffe1f3',2);
  art+=i===0?eye(66,88,11)+eye(114,88,11):i===1?eye(65,89,8)+eye(90,77,8)+eye(115,89,8):eye(90,94,21);
  art+=path('M78 124L90 133L103 124M70 54L90 44L110 54','none','#ffc4ed',3);
  for(const [x,y] of [[55,69],[126,113],[86,148]])art+=path('M'+x+' '+(y-4)+'V'+(y+4)+'M'+(x-4)+' '+y+'H'+(x+4),'none','#fff3c0',1.5);
 }
 const svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180" role="img"><title>'+p.names[i]+' · '+p.name+' 대표</title><defs><linearGradient id="skin" x2=".7" y2="1"><stop stop-color="#fff0cf"/><stop offset=".3" stop-color="'+p.color+'"/><stop offset="1" stop-color="'+(p.id==='kepler'?'#167564':'#634165')+'"/></linearGradient><linearGradient id="metal" x2="1" y2="1"><stop stop-color="#d8e5ff"/><stop offset=".4" stop-color="#526b92"/><stop offset="1" stop-color="#16223d"/></linearGradient><linearGradient id="crystal" x2="1" y2="1"><stop stop-color="#ffdaa4"/><stop offset=".4" stop-color="'+p.color+'"/><stop offset="1" stop-color="#503086"/></linearGradient><radialGradient id="cosmos"><stop stop-color="#7767ba"/><stop offset="1" stop-color="#131d41"/></radialGradient></defs>'+art+'</svg>';
 return 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);
}
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
 '<header class="sw-header"><small>EARTH DELEGATION · GALACTIC CUP</small><h2 id="space-title">우주전쟁</h2><p>지구 대표 3명, 우리 은하의 행성 대표단에 도전하다.</p><div class="sw-tags"><span>3인 단체전</span><span>3전 2선승</span><span>캐릭터 중복 출전 불가</span><span>난이도 ???</span><span>일반 리턴 97~99% · 필살기 리턴 90%</span></div></header>'+
 '<section class="sw-earth"><span aria-hidden="true">🌍</span><div><small>YOUR HOME · 지구 대표팀</small><b>다음 승부는 지구의 이름으로.</b><p>각 단식은 11점 · 2점 차 승리. 두 경기를 먼저 이기면 행성전 승리입니다.</p></div><strong>'+PLANETS.filter(cleared).length+'<small>/ '+PLANETS.length+' 행성 승리</small></strong></section>'+
 '<section><h3>01 <span>도전할 행성</span></h3><div class="sw-planets">'+PLANETS.map(q=>'<button type="button" data-planet="'+q.id+'" aria-pressed="'+(q.id===selected)+'" style="--planet:'+q.color+'"><i class="sw-orb '+(q.id==='saturn'?'ringed':'')+'" aria-hidden="true"></i><b>'+q.name+'</b><small>'+q.sub+'</small><em>'+(RULES.label+(cleared(q)?' · ✓ 승리 기록':''))+'</em></button>').join('')+'</div></section>'+
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
 setCharacter(r.team[r.round]);aiTier=RULES.tier;setMode('match');starting=true;
 try{begin(opponent(p,r.round));}finally{starting=false;}
 if(!playing)return;
 aiFit=null;nightmareDomainEnd();aiCharge=100;aiUltSet=[...new Set([p.ults[r.round],...rollAiUlts(),...rollAiUlts()])].slice(0,3);save();
 $('cpu-name').textContent=p.name+' · '+p.names[r.round]+' · '+(r.round+1)+'단식 · '+r.my+':'+r.ai;
 $('mode-label').textContent='우주전쟁 · '+RULES.label;
 toast('우주전쟁 · 지구 '+r.my+' : '+r.ai+' '+p.name+' · '+(r.round+1)+'단식',2.5);
}
onBegin('pre',25,()=>{if(!starting){save();run=null;}});
onHome('pre',25,save);
const normalRecord=rankRecord;rankRecord=function(...args){const record=normalRecord.apply(this,args);if(active()||run?.last===matchId&&aiChar.startsWith('space_'))record.event=true;return record;};
const normalReturn=P.returnRoll;P.returnRoll=function(b,t,c,bonus=0){const rate=normalReturn(b,t,c,bonus);if(!active())return rate;return b?.ult?RULES.ultimateReturn:planet(run.planet).return;};
const normalSpaceUlt=aiUltForTier;aiUltForTier=function(u){const out=normalSpaceUlt(u);if(!active()||!out)return out;const p=planet(run.planet),rgb=p.color.match(/[\da-f]{2}/gi).map(v=>parseInt(v,16)).join(',');return {...out,name:p.skills[run.round],rgb,glow:p.color,fx:p.fx,ci:p.ci};};
function spaceUltEffect(p,name){document.querySelector('.space-ult-effect')?.remove();const e=document.createElement('div');e.className='space-ult-effect '+p.id;e.style.setProperty('--space-ult',p.color);e.setAttribute('role','status');e.innerHTML='<i></i><b>'+name+'</b><small>'+p.name+' 대표 필살기</small>';document.body.append(e);setTimeout(()=>e.remove(),1700);}
const normalSpaceFireUlt=fireUlt;fireUlt=function(u,x,y,ai=false,...rest){if(ai&&active())spaceUltEffect(planet(run.planet),u.name);return normalSpaceFireUlt(u,x,y,ai,...rest);};
onAiShot('pre',45,a=>{
 if(!active())return;const p=planet(run.planet),style=run.round===2?'drive':p.style;
 if(style==='side'){a.kind='side';a.spin*=1.4;}
 if(style==='cut'){a.kind=rally%3?'cut':'drive';a.spin*=1.4;}
 if(style==='defend'){a.kind=rally%2?'cut':'block';a.speed*=.95;}
 if(style==='mix')a.kind=['side','cut','drive'][(rally+run.round)%3];
 if(style==='drive'){a.kind='drive';a.speed*=1.12;}
 a.speed=Math.min(a.speed*RULES.power,6);a.spin=P.clamp(a.spin*RULES.power,-3.4,3.4);a.aim=P.clamp(a.aim,-.55,.55);
});
onResult('pre',45,c=>{
 const r=run;if(!r||(!active()&&r.last!==matchId))return;c.spaceWar=r;
 if(r.last===matchId)return;r.last=matchId;c.won?r.my++:r.ai++;r.round++;
 if(r.my>=2||r.ai>=2||r.round>=3){r.live=false;if(r.my>=2){tS()['spaceWar_'+r.planet]=(tS()['spaceWar_'+r.planet]||0)+1;saveProg();const p=planet(r.planet),record={...rankRecord(false),id:'space_'+matchId,event:false,rmode:'boss',level:BOSS_LABEL.space,boss:(r.my===2&&r.ai===0?200:100)+Math.min(99,matchBest),bossDetail:r.my+':'+r.ai+' · '+p.name};localRank(record);remoteRank(record).catch(()=>{});}}
 save();
});
onResult('post',95,c=>{
 if(!c.spaceWar){$('result').querySelector('.sw-save-exit')?.remove();return;}
 const r=c.spaceWar,p=planet(r.planet),d=$('result');
 $('rs-title').textContent=r.live?(c.won?'지구 대표 단식 승리!':'다음 단식을 준비하세요'):r.my>=2?p.name+' 대표단 격파!':'지구 대표팀 도전 종료';
 const line=document.createElement('li');line.textContent='우주전쟁 · 지구 '+r.my+' : '+r.ai+' '+p.name+' · '+r.round+'/3 단식';$('rs-lines').prepend(line);const original=$('rs-lines').children[1];if(original)original.textContent='난이도 '+RULES.label+' · 상대 '+p.names[Math.min(2,r.round-1)];
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
.space-ult-effect{position:fixed;inset:0;z-index:90;display:grid;place-content:center;text-align:center;pointer-events:none;overflow:hidden;color:#fff;background:radial-gradient(circle at 50% 52%,color-mix(in srgb,var(--space-ult) 42%,transparent),#030611d9 52%,#01030be8);animation:spaceUltIn 1.65s ease-out both}.space-ult-effect i{position:absolute;inset:8%;border:3px solid var(--space-ult);border-radius:50%;box-shadow:0 0 28px var(--space-ult),inset 0 0 38px var(--space-ult);animation:spaceUltOrbit 1.25s cubic-bezier(.2,.8,.2,1) both}.space-ult-effect b{position:relative;font-size:clamp(28px,8vw,64px);letter-spacing:-.06em;text-shadow:0 0 20px var(--space-ult),0 4px 0 #081020}.space-ult-effect small{position:relative;margin-top:8px;color:#dbeaff;font-weight:800}.space-ult-effect.mars i{border-radius:0;transform:rotate(-18deg) skewX(-16deg)}.space-ult-effect.jupiter i,.space-ult-effect.trappist i{border-style:dashed}.space-ult-effect.saturn i{inset:27% 4%;transform:rotate(-12deg)}.space-ult-effect.neptune i{border-width:8px 0}.space-ult-effect.proxima i{border-radius:12%;transform:rotate(45deg)}.space-ult-effect.kepler i{border-radius:0;clip-path:polygon(50% 0,100% 50%,50% 100%,0 50%)}@keyframes spaceUltIn{0%{opacity:0}12%,72%{opacity:1}100%{opacity:0}}@keyframes spaceUltOrbit{0%{transform:scale(.15) rotate(-35deg);opacity:0}45%{opacity:1}100%{transform:scale(1.28) rotate(18deg);opacity:0}}
@media(prefers-reduced-motion:reduce){.space-ult-effect,.space-ult-effect i{animation:none}.space-ult-effect{opacity:.9}.space-ult-effect i{opacity:.55}}
@media(max-width:540px){#space-conquest .sw-header{padding:25px 18px 20px}#space-conquest section{margin:18px 16px}.sw-planets{grid-template-columns:repeat(2,minmax(0,1fr))}.sw-earth>span{font-size:34px}.sw-earth>strong{font-size:24px}.sw-section-heading{display:block}.sw-section-heading>small{display:block;margin:-5px 0 10px}.sw-opponents{padding:14px 5px;gap:5px}.sw-opponents figcaption{font-size:12px}.sw-opponents figcaption small{font-size:9px}.sw-team{gap:6px}.sw-team label{padding:10px 5px}.sw-team select{font-size:11px}.sw-team canvas{width:52px;height:52px}#space-conquest footer{padding:13px 16px}}
`;document.head.append(style);
window.sppSpaceConquest={open:openSpace,profiles:PLANETS,rules:RULES,get run(){return run;},active};
})();
