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

PATCH_NOTES.unshift(['복식 종료 · 단식 통합','복식 모드와 증강 탁구를 비활성화했습니다. 단체전은 모두 단식으로 진행하며, 3티어 필살기는 울트라 하드, 4티어는 울트라 익스트림 이상 단식 승리로 해금됩니다.']);

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
