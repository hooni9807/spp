// Retired doubles and augment-table-tennis entry points.
{const s=document.createElement('script');s.src='pixelfx-runtime.js?v=2';s.defer=true;document.head.append(s);}
document.querySelector('[data-mode="doubles"]')?.remove();
document.querySelector('[data-stage]')?.remove();
document.querySelector('[data-board="stage"]')?.remove();
for(const id of ['aug-btn','stage-life-hud','syn-hud'])document.getElementById(id)?.remove();

const ultCopy=document.querySelector('#ults>p');
if(ultCopy)ultCopy.innerHTML='게이지가 <b>100%</b>가 되면 다음 타격에, 상대 공 종류에 맞는 <b>장착 필살기</b>가 자동 발동합니다.<br><b>슬롯</b> Lv1 1칸 · Lv10 2칸 · Lv20 3칸 ｜ <b>해금</b> 1티어 Lv1 · 2티어 Lv5 · 3티어 울트라 하드 단식 승리 · 4티어 울트라 익스트림 이상 단식 승리';
if(mode==='doubles')setMode('match');
for(const id of ['dbl','dbl20','doublesHarmony']){const at=TITLES.findIndex(t=>t[0]===id);if(at>=0)TITLES.splice(at,1);}
for(const id of ['doubles','online2','aug']){const at=MODE_STATS.findIndex(m=>m[0]===id);if(at>=0)MODE_STATS.splice(at,1);}
{const s=document.querySelector('#char-tiers .tier-row.s span'),note=document.querySelector('#char-tiers .tier-note'),option=document.querySelector('#character option[value="sleepy"]');if(s)s.childNodes[0].nodeValue='퍼시벌 · 날먹세';if(note)note.textContent='카사노바 윤 · 화잡이 · 아담 성 · 유리대포는 현재 선택 비활성 상태라 표에서 제외합니다.';if(option)option.textContent='지킬앤 하이범 · 타구와 득점으로 변신 게이지 충전 · 지킬은 약한 공격과 안정 수비 · 하이범은 초강력 공격';}

const jekyllHud=document.createElement('aside');
jekyllHud.id='jekyll-gauge';jekyllHud.hidden=true;jekyllHud.setAttribute('aria-label','지킬앤 하이범 변신 게이지');
jekyllHud.innerHTML='<small>변신</small><div><i></i></div><b>0%</b>';
document.querySelector('.court-wrap')?.append(jekyllHud);
const jekyllScene=document.createElement('div');
jekyllScene.id='jekyll-transform';jekyllScene.hidden=true;jekyllScene.innerHTML='<div class="jekyll-aura" aria-hidden="true"><i></i><i></i><i></i></div><div class="jekyll-copy"><small>전투 본능 해방</small><strong>하이범 변신 준비</strong><p>현재 랠리가 끝났습니다. 변신 후 경기를 계속합니다.</p><button type="button">변신</button></div>';
document.body.append(jekyllScene);
{const s=document.createElement('style');s.textContent=`#jekyll-gauge{position:absolute;z-index:9;left:12px;top:42%;width:40px;padding:7px 5px;border:1px solid #9ac9e8;border-radius:9px;background:#071220dc;color:#d9efff;text-align:center;box-shadow:0 8px 24px #0009}#jekyll-gauge small{display:block;font-size:9px;font-weight:900;letter-spacing:.08em}#jekyll-gauge>div{position:relative;width:10px;height:94px;margin:5px auto;border:1px solid #83b9d8;border-radius:99px;background:#02070d;overflow:hidden}#jekyll-gauge i{position:absolute;inset:auto 0 0;height:0;background:linear-gradient(0deg,#4f173f,#d63d63 48%,#95d9ff);box-shadow:0 0 12px #d63d63;transition:height .25s ease}#jekyll-gauge b{font-size:9px}#jekyll-gauge.ready{border-color:#e6607d;box-shadow:0 0 22px #d63d6388}#jekyll-transform[hidden]{display:none}#jekyll-transform{position:fixed;z-index:120;inset:0;display:grid;place-items:center;background:radial-gradient(circle at 50% 46%,#591c46 0,#11152ae8 36%,#03050bf5 72%);color:#f7f3ff;text-align:center;overflow:hidden}#jekyll-transform .jekyll-aura{position:absolute;width:min(70vw,520px);aspect-ratio:1;border:2px solid #d9567d;border-radius:50%;box-shadow:0 0 80px #d63d6377,inset 0 0 60px #4c9fd755;animation:jekyllPulse 1.1s ease-in-out infinite alternate}#jekyll-transform .jekyll-aura i{position:absolute;inset:8%;border:1px solid #8fcff0;border-radius:50%;transform:rotate(35deg)}#jekyll-transform .jekyll-aura i:nth-child(2){transform:rotate(95deg) scale(.75)}#jekyll-transform .jekyll-aura i:nth-child(3){transform:rotate(155deg) scale(.52)}#jekyll-transform .jekyll-copy{position:relative;width:min(84vw,430px);padding:28px;border:1px solid #b25578;border-radius:18px;background:#080b16d9;box-shadow:0 20px 70px #000}#jekyll-transform small{color:#91d5f5;letter-spacing:.2em}#jekyll-transform strong{display:block;margin:8px 0;font-size:clamp(26px,5vw,48px)}#jekyll-transform p{font-size:13px;color:#c8c8dc}#jekyll-transform button{margin-top:10px;min-width:150px;padding:12px 22px;border:1px solid #ff8aa5;border-radius:8px;background:linear-gradient(135deg,#792849,#d64a69);color:white;font-weight:900}#jekyll-transform.transforming .jekyll-copy{animation:jekyllShift 1.6s ease both}#jekyll-transform.transforming .jekyll-aura{animation:jekyllBurst 1.6s ease both}@keyframes jekyllPulse{to{transform:scale(1.08) rotate(8deg);filter:brightness(1.3)}}@keyframes jekyllShift{45%{transform:scale(.9);filter:brightness(.6)}75%{transform:scale(1.08);filter:brightness(2)}100%{transform:scale(1);filter:brightness(1)}}@keyframes jekyllBurst{55%{transform:scale(.65) rotate(110deg)}78%{transform:scale(1.55);opacity:1;filter:brightness(3)}100%{transform:scale(2);opacity:0}}@media(prefers-reduced-motion:reduce){#jekyll-transform *{animation:none!important;transition:none!important}}`;document.head.append(s);}
let jekyllReady=false;
function syncJekyllGauge(){const active=playing&&charType==='sleepy';jekyllHud.hidden=!active;if(!active)return;const n=jekyllTransformed?100:jekyllGauge;jekyllHud.querySelector('i').style.height=n+'%';jekyllHud.querySelector('b').textContent=jekyllTransformed?'완료':n+'%';jekyllHud.classList.toggle('ready',jekyllReady||jekyllTransformed);}
function addJekyllGauge(n){if(charType!=='sleepy'||jekyllTransformed||jekyllReady||!playing)return;jekyllGauge=Math.min(100,Math.round((jekyllGauge+n)*10)/10);jekyllReady=jekyllGauge===100;syncJekyllGauge();if(jekyllReady)toast('변신 게이지 충전 완료 · 이 랠리가 끝나면 변신할 수 있습니다',2.2);}
function syncJekyllPause(on){paused=on;if(net?.conn?.open)try{net.conn.send({t:'J',pause:on});}catch{}}
function offerJekyllTransform(){if(!playing||charType!=='sleepy'||!jekyllReady||jekyllTransformed)return;syncJekyllPause(true);release();jekyllScene.hidden=false;jekyllScene.classList.remove('transforming');jekyllScene.querySelector('button').disabled=false;jekyllScene.querySelector('strong').textContent='하이범 변신 준비';}
jekyllScene.querySelector('button').onclick=()=>{const button=jekyllScene.querySelector('button');button.disabled=true;jekyllScene.classList.add('transforming');jekyllScene.querySelector('strong').textContent='하이범 각성';beep(180);setTimeout(()=>{jekyllTransformed=true;jekyllReady=false;refreshJekyllPortraits();me.jk=-1;me.taunt='하이범';me.tauntT=time;syncJekyllGauge();jekyllScene.hidden=true;jekyllScene.classList.remove('transforming');syncJekyllPause(false);toast('하이범 변신 완료 · 공격 ×1.65 · 수비 구제 8%',2.2);beep(760);},matchMedia('(prefers-reduced-motion: reduce)').matches?250:1650);};
function refreshJekyllPortraits(){if(charType==='sleepy'){drawFace($('you-face'),LOOKS.sleepy);drawFace($('char-face'),LOOKS.sleepy);}renderCharPick();}
function resetJekyllState(){jekyllGauge=0;jekyllReady=false;jekyllTransformed=false;foe.jekyllGauge=0;foe.jekyllTransformed=false;jekyllScene.hidden=true;syncJekyllGauge();refreshJekyllPortraits();}
function addAiJekyllGauge(n){if(net||!LOOKS[aiChar]?.jekyll||foe.jekyllTransformed)return;foe.jekyllGauge=Math.min(100,(foe.jekyllGauge||0)+n);}
onPoint('post',86,c=>{if(!c.player)addAiJekyllGauge(7);if(playing&&!net&&LOOKS[aiChar]?.jekyll&&foe.jekyllGauge>=100&&!foe.jekyllTransformed){foe.jekyllTransformed=true;foe.jk=-1;foe.taunt='하이범 변신!';foe.tauntT=time;toast('상대 변신 게이지 100% · 하이범으로 변신했습니다',2);}});
onBegin('post',85,resetJekyllState);
const jekyllGuestStart=guestStart;guestStart=function(...args){const out=jekyllGuestStart.apply(this,args);resetJekyllState();return out;};
const jekyllApplySnap=applySnap;applySnap=function(S){const mine=you,out=jekyllApplySnap.call(this,S);if(net?.role==='guest'&&S.cpu>mine){addJekyllGauge(7);if(jekyllReady)setTimeout(offerJekyllTransform,350);}return out;};
const jekyllOnNet=onNet;onNet=function(m){if(m?.t==='J'){paused=!!m.pause;if(paused)release();if(net?.role==='host'&&net.conn.open)try{net.conn.send({t:'J',pause:paused});}catch{}return;}return jekyllOnNet.call(this,m);};
onPoint('pre',90,c=>{const local=c.player&&charType==='jiseong'&&jiseongHero()&&(cpu-you>=3||cpu===10&&you===8),remote=net?.role==='host'&&!c.player&&net.opp.ch==='jiseong'&&net.opp.jhro&&(you-cpu>=3||you===10&&cpu===8);if(local||remote){c.player?you++:cpu++;c.reason+=' · '+(remote?'상대 ':'')+'역전의 용사 보너스 1점';}});
onPoint('post',85,c=>{if(c.player)addJekyllGauge(7);if(jekyllReady)setTimeout(offerJekyllTransform,350);});

const techniqueHit=hit;
hit=function(...args){
 const before=lastHit,incoming=ball&&P.family(ball.type),fore=playerSide*fhDir(),blind=charType==='leesin'&&time>=blindT&&time-blindT<leesinBlindDuration(),chance=!!ball?.chance,serving=!!ball?.serving,fullDrunk=(window.drunkStack||0)>=7,behind=cpu-you>=3;techniqueHit(...args);
 if(lastHit===before||!ball||ball.owner!=='you'||ball.miss||ball.held)return;
 addJekyllGauge((4+(ball.pf?2:0))*(techDone('tech_sleepy_hyde')?1.1:1));
 const key=charType==='jersey'&&fore<0&&ball.power?'tech_jersey_backpower':charType==='leesin'&&blind?'tech_leesin_sense':charType==='percival'&&ball.pf?'tech_percival_perfect':charType==='drunk'&&fullDrunk&&ball.pf&&ball.power?'tech_drunk_oneshot':charType==='minhee'&&ball.unreturnWhy?.startsWith('공 재끼기')?'tech_minhee_jaetgi':charType==='seohyun'&&incoming==='drive'&&P.family(ball.type)==='drive'?'tech_seohyun_counter':charType==='jongryeong'&&fore<0&&incoming==='drive'&&ball.type==='smash'?'tech_jongryeong_smash':charType==='kumho'&&ball.lob?'tech_kumho_lob':charType==='songstar'&&ball.type==='cut'?'tech_songstar_cut':charType==='jiseong'&&behind&&ball.power?'tech_jiseong_comeback':charType==='pyeongtaek'&&chance&&ball.type==='smash'?'tech_pyeongtaek_chance':charType==='ninja'&&['short','block'].includes(ball.type)?'tech_ninja_short':charType==='gambler'&&ball.gamble?'tech_gambler_jackpot':charType==='ttalgak'&&serving?'tech_ttalgak_serve':'';
 if(key&&playing&&!pracNoQuest())qMatch[key]=(qMatch[key]||0)+1;
};

const pt=TOUR_EVENTS.find(e=>e.id==='pyeongtaek');
if(pt){pt.name='평택 3인 단체전';pt.teamSize=3;pt.formats=['1단식','2단식','3단식'];}
const reward=TOUR_REWARDS.find(e=>e.id==='pyeongtaek');
if(reward)reward.name='평택 3인 단체전';
if(TOUR_MAP.pyeongtaek)TOUR_MAP.pyeongtaek.name='평택 3인 단체전';
const ptButton=document.querySelector('[data-tour="pyeongtaek"]');
if(ptButton)ptButton.innerHTML='<b>평택 3인 단체전 <span class="tour-level">매우 어려움</span></b><small>32강 · 3단식 2선승 · 캐릭터 3명 출전</small>';

newPyeongtaekTournament=function(order){
 order=[...new Set(order||[])];for(const k of UNLOCKABLE().concat(START_CHARS))if(order.length<3&&charUnlocked(k)&&characterAvailable(k)&&!order.includes(k))order.push(k);if(order.length<3)return toast('캐릭터 3명을 해금해야 출전할 수 있어요',2.4);
 const pick=()=>AI_CHARS.slice().sort(()=>Math.random()-.5).slice(0,3),names=new Set(['내 팀']),teams=[];
 for(let i=0;i<31;i++){const team=pick();let name=`${LOOKS[team[0]].nick||LOOKS[team[0]].name} 팀`,n=2;while(names.has(name))name=`${LOOKS[team[0]].nick||LOOKS[team[0]].name} ${n++}팀`;names.add(name);teams.push({id:'pt'+i,name,char:team[0],team,named:true});}
 const me={id:'me',name:'내 팀',char:order[0],team:order.slice(),named:true,me:true};
 tournament={event:'pyeongtaek',teamOrder:order.slice(),slots:[Array(64).fill(null),tourShuffle([me,...teams]),Array(16).fill(null),Array(8).fill(null),Array(4).fill(null),Array(2).fill(null)],round:1,state:'ready',last:null,move:null,series:null};
 tourResolve();tourSave();
};

openPyeongtaekPick=function(){
 if([...new Set(UNLOCKABLE().concat(START_CHARS).filter(k=>charUnlocked(k)&&characterAvailable(k)))].length<3)return toast('캐릭터 3명을 해금해야 출전할 수 있어요',2.4);
 openTeamPick();
 const d=document.getElementById('team-pick');
 d.querySelector('.tp-logo').textContent='PT';
 d.querySelector('#tp-title').textContent='평택 3인 단체전 출전 명단';
 d.querySelector('#tp-copy').textContent='32강부터 1단식, 2단식, 3단식으로 진행하며 먼저 2승하면 진출합니다.';
 d.querySelector('#tp-go').onclick=()=>{const order=[...d.querySelectorAll('[data-tp]')].map(x=>x.value);if(order[0]===order[1]||order[1]===order[2])return;d.close();pendingTeam=order;setCharacter(order[0]);newPyeongtaekTournament(order);pendingTeam=null;document.getElementById('tournament-select').close();tournamentArrival('pyeongtaek',openTournament);};
};
if(ptButton)ptButton.onclick=openPyeongtaekPick;

PATCH_NOTES.unshift(['색다른 플레이 히든 업적','이지 10승·AI전 50패·한 번의 연습에서 타구 100회·필살기 없이 10승·확률 불이익 1,000회 조건과 실제 보너스를 추가했습니다.'],['Firebase 히든 업적 복원 수정','achievements 컬렉션에서 직접 변경한 히든 업적의 complete 값을 로그인 시 기기에 복원해 다시 false로 덮어쓰지 않도록 수정했습니다.'],['Firebase 업적 동기화 수정','로그인할 때 achievements 컬렉션의 캐릭터 업적 진행도를 기준값으로 적용해 Firebase에서 수정한 값이 기기 기록으로 되돌아가지 않습니다.'],['찬스 스매싱 업적 · 세계지도 터치 수정','스매싱 퀘스트와 누적 업적은 찬스볼 스매싱만 집계합니다. 싱가포르를 포함한 확장 국가가 터치 환경에서도 정상 선택됩니다.'],['지킬앤 하이범 업적 효과 수정','하이범 50승 달성 시 시작 게이지 +5% 대신 성공 타구로 얻는 변신 게이지가 110%로 쌓입니다.'],['캐릭터 전용 업적 효과 개편','11개 캐릭터의 업적 목표와 실제 전투 효과를 새 규칙으로 변경하고, 수비 커트 장인·로빙 마술사·쇼트 지배자 칭호 효과도 개편했습니다.'],['전용 라켓 자동 적용','목판·러버와 라켓 직접 선택을 제거했습니다. 캐릭터마다 쉐이크핸드·일본식 펜홀더·중국식 펜홀더 중 하나가 고정되며 자동 교체됩니다.']);

PATCH_NOTES.unshift(['캐릭터 업적 Firebase 분리 저장','캐릭터 전용 업적은 character_achievements 컬렉션에 사용자 이름, 업적별 누적 횟수·목표·달성 여부와 전체 달성 수를 저장합니다. 기존 progress 기록은 로그인할 때 자동 이전합니다.'],['송스타 백핸드 커트 안정화','포핸드 드라이브를 백핸드로 깎는 성공률이 100%에서 시작해 시도마다 2.5%p씩 감소하며, 80% 아래로는 내려가지 않습니다. 1점이 끝나면 다시 100%로 초기화됩니다.'],['빽종령 · 송스타 백핸드 강화','빽종령은 포핸드 쪽 커트·블록·드라이브의 70%를 백핸드 타법과 모션으로 처리합니다. 송스타는 포핸드에서 커트 커맨드를 입력하면 90% 확률로 돌아서서 백핸드 롱 커트를 합니다.'],['PVP 캐릭터 효과 동기화','지킬앤 하이범의 게이지·변신 상태·변신 연출 중 경기 정지를 양쪽에 동기화했습니다. 김치성 역전의 용사 보너스는 방장이 양쪽 업적 보유 상태를 확인해 한 번만 점수를 계산합니다.'],['김치성 · 역전의 용사','김치성의 열세 강공 100회 업적을 달성하면 3점 이상 뒤진 상태의 득점이 2점으로 계산됩니다. 예외로 상대 10점·내 8점에서도 발동해 득점 시 10:10이 됩니다.'],['지킬앤 하이범 변신 리메이크','성공 타구 +4, PERFECT 추가 +2, 득점 +7로 게이지를 채워 보통 총점 9~10점 전후에 변신합니다. 100%가 된 랠리 종료 후 변신 버튼을 누르면 전용 장면과 함께 하이범으로 영구 변신하며, 캐릭터 선택창에 리메이크 딱지를 표시합니다. 지킬은 공격 −35%와 수비 구제 15%, 하이범은 공격 ×1.65와 수비 구제 8%가 적용됩니다.'],['캐릭터 기술 업적 · 칭호','복식·증강 전용 보상을 제거하고 선택 가능한 캐릭터 15명의 고유 기술 업적을 추가했습니다. 아재범은 기존 히든 업적을 유지하며, 결과창 하단에서 이번 경기 누적 횟수를 확인할 수 있습니다.'],['복식 종료 · 단식 통합','복식 모드와 증강 탁구를 비활성화했습니다. 단체전은 모두 단식으로 진행하며, 3티어 필살기는 울트라 하드, 4티어는 울트라 익스트림 이상 단식 승리로 해금됩니다.']);

const renderSinglesTournament=renderTournament;
renderTournament=function(){
 renderSinglesTournament();
 if(tourEvent().id!=='pyeongtaek')return;
 const p=tourPlayer(),format=tourEvent().formats[tournament.series?.g||0];
 document.querySelector('.tour-heading small').textContent='32강부터 결승까지 · 1단식 - 2단식 - 3단식 · 3경기 중 2승한 팀이 진출합니다';
 if(p){document.getElementById('tour-status').textContent=`${TOUR_LABELS[p.r]} · 상대 ${tournament.slots[p.r][p.i^1]?.name||'대기'} · ${TIERS[tourTier(p.r)].name} · ${format}`;document.getElementById('tour-play').textContent=`${TOUR_LABELS[p.r]} ${format} 시작`;}
};

startTournamentMatch=function(){
 if(tourEvent().id!=='pyeongtaek')return baseStartTournamentMatch();
 const p=tourPlayer(),op=p&&tournament.slots[p.r][p.i^1];if(!p||!op)return;
 aiTier=tourTier(p.r);
 if(!tournament.series||tournament.series.op!==op.id)tournament.series={op:op.id,g:0,my:0,ai:0,live:true};
 const g=tournament.series.g,format=tourEvent().formats[g],mine=tournament.teamOrder[g],theirs=(op.team||[op.char])[g]||op.char;
 tournament.state='playing';tournament.round=p.r;tournament.opponent=op;prog.q??={};prog.q._tourBest=Math.max(+(prog.q._tourBest)||0,p.r+1);tourSave();
 document.getElementById('tournament').close();setCharacter(mine);setMode('match');begin(theirs);
 document.getElementById('cpu-name').textContent=`AI ${op.name} · ${format} ${LOOKS[theirs].nick||LOOKS[theirs].name} · ${TIERS[aiTier].name}`;
 toast(`평택 3인 단체전 ${format} · ${LOOKS[mine].nick||LOOKS[mine].name} · 팀 ${tournament.series.my}:${tournament.series.ai}`,2.4);
};
