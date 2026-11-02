# 덧씌움(wrapper) 지도

자동 생성: `node scripts/wrapper-map.cjs` · 직접 고치지 말고 스크립트를 다시 돌려 갱신하세요.

게임은 핵심 함수를 여러 기능이 차례로 다시 대입해 감쌉니다(`const old=fn;fn=function(){…old()…}`). **나중에 실행된 덧씌움이 바깥쪽**이라 가장 먼저 실행되고, 안쪽으로 원래 함수까지 내려갑니다. 순서가 바뀌면 조건·문구가 엉뚱하게 나오는 원인이 됩니다.

## 정리 방향 (제안)

덧씌움이 많은 함수부터, 감싸는 대신 **이벤트 훅**에 등록하게 바꿉니다. 예: `onMatchStart(fn)` · `onResult(fn)` · `onGoHome(fn)` · `aiShotModifiers.push(fn)`. 원래 함수는 등록된 훅을 정해진 순서(우선순위 숫자)로 한 번씩 부르기만 합니다. 한 번에 하나의 함수씩, 그 함수의 기존 테스트가 통과하는지 확인하며 옮깁니다.

## 실행 순서

1. `index.html`
2. `china-cup.js`
3. `world-conquest.js`
4. `europe-cups.js`
5. `europe-design.js`
6. `world-expansion.js`
7. `world-effects.js`
8. `partner-training.js`
9. `prologue-match.js`
10. `prologue.js`
11. `ceremony-media.js`

## 두 번 이상 덧씌워지는 함수 (16개)

| 함수 | 덧씌움 수 |
|---|---|
| `renderMine` | 6 |
| `hit` | 5 |
| `point` | 4 |
| `fireUlt` | 4 |
| `serve` | 3 |
| `rankRecord` | 3 |
| `showBoard` | 3 |
| `drawNationalKit` | 3 |
| `P.returnRoll` | 2 |
| `renderTournament` | 2 |
| `stepBody` | 2 |
| `openDoublesPartner` | 2 |
| `showAttendance` | 2 |
| `perfectCeremony` | 2 |
| `chinaGame` | 2 |
| `ultBodyOffset` | 2 |

### `renderMine`

위에서 아래로 = 안쪽(먼저 감쌈) → 바깥쪽(나중에 감쌈, 호출 시 가장 먼저 실행)

| # | 위치 | 주석 | 코드 시작 부분 |
|---|---|---|---|
| 1 | `index.html:3458` | — | `)=>{renderMineAll();const d=$('mine');if(!d)return;const crew=d._mineCrew??=[...unlockedCharacters()].sort(()=…` |
| 2 | `index.html:3466` | — | `)=>{renderMineLesson();const d=$('mine');if(!d)return;const crew=d._mineCrew¦¦[],student=d._lessonStudent??=(M…` |
| 3 | `index.html:3470` | — | `)=>{renderLessonText();const d=$('mine');if(d)d.querySelector('.mine-upgrade-rate').textContent='성공 확률 ${Math.…` |
| 4 | `index.html:3471` | — | `)=>{renderTwoTableLesson();const d=$('mine');if(!d)return;const cv=d.querySelector('canvas[data-lesson]'),coac…` |
| 5 | `index.html:3473` | — | `)=>{renderMineHalfRate();const note=$('mine')?.querySelector('.mine-note');if(note)note.textContent=note.textC…` |
| 6 | `index.html:3474` | — | `)=>{renderMineWallet();const d=$('mine');if(!d)return;let wallet=d.querySelector('#mine-wallet');if(!wallet){w…` |

### `hit`

위에서 아래로 = 안쪽(먼저 감쌈) → 바깥쪽(나중에 감쌈, 호출 시 가장 먼저 실행)

| # | 위치 | 주석 | 코드 시작 부분 |
|---|---|---|---|
| 1 | `index.html:1685` | — | `(...args){const actor=myTurn,charged=mode==='doubles'&&!net&&doublesLink===100,before=lastHit,relay=doublesRel…` |
| 2 | `index.html:1686` | — | `(...args){const before=lastHit,serve=!!ball?.serving,actor=myTurn;harmonyPlayerHit(...args);if(mode==='doubles…` |
| 3 | `index.html:1688` | — | `(...args){const partnerTurn=mode==='doubles'&&!net&&doublesCourtActor()==='mate';if(!partnerTurn)return player…` |
| 4 | `index.html:4256` | — | `(...args){const before=ball,owner=ball?.owner,held=ball?.held;const result=hitWithFeedback(...args);if(ball&&b…` |
| 5 | `partner-training.js:10` | — | `(...args){if(mode==='doubles'&&!net&&doublesCourtActor()==='mate')return;return manualPartnerHit(...args);};…` |

### `point`

위에서 아래로 = 안쪽(먼저 감쌈) → 바깥쪽(나중에 감쌈, 호출 시 가장 먼저 실행)

| # | 위치 | 주석 | 코드 시작 부분 |
|---|---|---|---|
| 1 | `index.html:1859` | — | `(...args){ajaeSecretPoint(...args);if(!net&&!playing&&you>cpu&&charType==='ajae'&&ajaeUsed.me>=3)unlockAjaeSec…` |
| 2 | `index.html:1860` | — | `(...args){const wasDoubles=mode==='doubles'&&!net;doublesHarmonyPoint(...args);if(wasDoubles){doublesLink=0;do…` |
| 3 | `index.html:1861` | — | `(player,reason){if(!net&&bossDoor()&&ball?.type==='serve'&&ball.owner==='you'&&Math.random()<.1){foe.taunt='손바…` |
| 4 | `index.html:3673` | — | `(player,reason){if(survival()&&ball){if(player){ball=null;wait=1.25;rally=0;swingMemory=null;updateScore();toa…` |

### `fireUlt`

위에서 아래로 = 안쪽(먼저 감쌈) → 바깥쪽(나중에 감쌈, 호출 시 가장 먼저 실행)

| # | 위치 | 주석 | 코드 시작 부분 |
|---|---|---|---|
| 1 | `china-cup.js:53` | — | `(u,x,y,ai=false,...rest){const result=chinaFire(u,x,y,ai,...rest);if(ai&&chinaActive()){const p=CHINA_PLAYERS[…` |
| 2 | `europe-cups.js:42` | — | `(u,x,y,ai=false,...args){const on=ai&&euroActive(),c=on&&EURO_CUPS[euroRun.country],i=on&&euroRun.order[euroRu…` |
| 3 | `europe-design.js:52` | — | `(u,x,y,ai=false,...args){const on=ai&&euroActive(),id=on&&euroRun.country,i=on&&euroRun.order[euroRun.round],r…` |
| 4 | `world-effects.js:47` | — | `(u,x,y,ai=false,...args){const id=ai&&(chinaActive()?'china':euroActive()?euroRun.country:null),i=id==='china'…` |

### `serve`

위에서 아래로 = 안쪽(먼저 감쌈) → 바깥쪽(나중에 감쌈, 호출 시 가장 먼저 실행)

| # | 위치 | 주석 | 코드 시작 부분 |
|---|---|---|---|
| 1 | `index.html:1763` | 투클릭 연습은 상대 서브부터 시작해, 받는 모든 공에 ①→② 리듬을 적용한다. const practiceServe=serve | `(){practiceServe();if(clickPrac()&&ball?.owner==='ai'&&!ball.unreturn){Object.assign(ball,{dual:true,dualHit:f…` |
| 2 | `index.html:1772` | — | `(){const variant=aiServeVariant();baseAiServeWithVariants();if(!variant¦¦!ball¦¦ball.owner!=='ai'¦¦!ball.servi…` |
| 3 | `index.html:1774` | Finalize once, after character effects and serve variants. One fault roll per serve. const | `(){uncheckedAiServe();if(net¦¦!ball¦¦ball.owner!=='ai')return;if(ball.shortServe&&ball.dual){if(clickPrac())ba…` |

### `rankRecord`

위에서 아래로 = 안쪽(먼저 감쌈) → 바깥쪽(나중에 감쌈, 호출 시 가장 먼저 실행)

| # | 위치 | 주석 | 코드 시작 부분 |
|---|---|---|---|
| 1 | `index.html:3675` | — | `(quit){const rec=baseRankRecord(quit);if(mode==='survival'&&!net){rec.rmode='survival';rec.wins=0;rec.level='생…` |
| 2 | `china-cup.js:42` | — | `(...args){const record=chinaRecord(...args);if(chinaRun&&aiChar.startsWith('china_'))record.event=true;return …` |
| 3 | `europe-cups.js:36` | — | `(...args){const r=euroRecord(...args);if(euroRun)r.event=true;return r;};…` |

### `showBoard`

위에서 아래로 = 안쪽(먼저 감쌈) → 바깥쪽(나중에 감쌈, 호출 시 가장 먼저 실행)

| # | 위치 | 주석 | 코드 시작 부분 |
|---|---|---|---|
| 1 | `index.html:3680` | — | `(k){$('boss-filter').hidden=k!=='boss';return k==='survival'?showSurvivalBoard():baseShowBoard(k);};…` |
| 2 | `index.html:3799` | — | `(k){if(k==='stage'){$('boss-filter').hidden=true;const best=tS().stageBest¦¦0;try{const L=JSON.parse(store.get…` |
| 3 | `index.html:3804` | Retired modes cannot be opened through stale links or an older saved UI state. const enabl | `(k){return k==='inf'¦¦k==='survival'?enabledRankingBoard('pvp'):enabledRankingBoard(k);};…` |

### `drawNationalKit`

위에서 아래로 = 안쪽(먼저 감쌈) → 바깥쪽(나중에 감쌈, 호출 시 가장 먼저 실행)

| # | 위치 | 주석 | 코드 시작 부분 |
|---|---|---|---|
| 1 | `world-expansion.js:47` | — | `(g,look,x,y,h,s){expansionKit(g,look,x,y,h,s);const c=WORLD_EXPANSION[look.nationalKit];if(!c)return;g.save();…` |
| 2 | `world-expansion.js:66` | — | `(g,look,x,y,h,s){…` |
| 3 | `world-expansion.js:80` | — | `(g,look,x,y,h,s){…` |

### `P.returnRoll`

위에서 아래로 = 안쪽(먼저 감쌈) → 바깥쪽(나중에 감쌈, 호출 시 가장 먼저 실행)

| # | 위치 | 주석 | 코드 시작 부분 |
|---|---|---|---|
| 1 | `index.html:730` | — | `ball,tier,chance,bonus=0)=>{const rate=rankOn&&rankGame?.returnRate,norm=rankGame?.returnNorm,ult=rankOn&&rank…` |
| 2 | `world-conquest.js:98` | — | `(ball,tier,chance,bonus=0){if(worldCampaignActive()&&ball?.ult)return worldUltReturn(ball.ultTier);const rate=…` |

### `renderTournament`

위에서 아래로 = 안쪽(먼저 감쌈) → 바깥쪽(나중에 감쌈, 호출 시 가장 먼저 실행)

| # | 위치 | 주석 | 코드 시작 부분 |
|---|---|---|---|
| 1 | `index.html:1503` | — | `(){renderTournamentBase();if(tournament?.state==='champion'){const reward=TOUR_REWARDS.find(item=>item.id===to…` |
| 2 | `index.html:3702` | — | `(){baseRenderTournament();if(tourEvent().id!=='pyeongtaek')return;const p=tourPlayer(),event=tourEvent(),entry…` |

### `stepBody`

위에서 아래로 = 안쪽(먼저 감쌈) → 바깥쪽(나중에 감쌈, 호출 시 가장 먼저 실행)

| # | 위치 | 주석 | 코드 시작 부분 |
|---|---|---|---|
| 1 | `index.html:1682` | — | `(who,x,...args){if(mode==='doubles'&&!net){const actor=doublesCourtActor();if(who===mate)x=actor==='mate'?Math…` |
| 2 | `world-effects.js:25` | — | `(who,x,...args){const frost=greenlandFrost();if(who===me&&frost&&Number.isFinite(who.x))x=who.x+(x-who.x)*(1-f…` |

### `openDoublesPartner`

위에서 아래로 = 안쪽(먼저 감쌈) → 바깥쪽(나중에 감쌈, 호출 시 가장 먼저 실행)

| # | 위치 | 주석 | 코드 시작 부분 |
|---|---|---|---|
| 1 | `index.html:3878` | — | `(){baseDoublesPick();const d=$('doubles-partner'),owned=[...new Set(UNLOCKABLE().concat(START_CHARS).filter(k=…` |
| 2 | `partner-training.js:45` | — | `(...args){trainingPartnerSelect(...args);const d=document.getElementById('doubles-partner');if(!d)return;d.que…` |

### `showAttendance`

위에서 아래로 = 안쪽(먼저 감쌈) → 바깥쪽(나중에 감쌈, 호출 시 가장 먼저 실행)

| # | 위치 | 주석 | 코드 시작 부분 |
|---|---|---|---|
| 1 | `index.html:4329` | — | `(force=false){if(!force){baseAttendanceVisual();$('attendance')?.querySelector('.attendance-art')?.remove();re…` |
| 2 | `index.html:4330` | — | `(force=false){const q=prog.q??={},today=attendanceDate();if(!force&&q.attendanceDate===today)return;if(!q.atte…` |

### `perfectCeremony`

위에서 아래로 = 안쪽(먼저 감쌈) → 바깥쪽(나중에 감쌈, 호출 시 가장 먼저 실행)

| # | 위치 | 주석 | 코드 시작 부분 |
|---|---|---|---|
| 1 | `china-cup.js:41` | — | `(st,look){chinaPerfect(st,look);if(chinaActive())chinaSay('好好');};…` |
| 2 | `europe-cups.js:39` | — | `(st,look){euroPerfect(st,look);if(euroActive())euroSay();};…` |

### `chinaGame`

위에서 아래로 = 안쪽(먼저 감쌈) → 바깥쪽(나중에 감쌈, 호출 시 가장 먼저 실행)

| # | 위치 | 주석 | 코드 시작 부분 |
|---|---|---|---|
| 1 | `world-conquest.js:83` | Some Android WebViews deliver only click for SVG paths.  Ignore the synthetic click follow | `(){const r=game();persist();return r;};…` |
| 2 | `world-expansion.js:109` | — | `(...args){prog.q??={};prog.q._lastWorldCountry='china';saveProg();return startChina.apply(this,args);};documen…` |

### `ultBodyOffset`

위에서 아래로 = 안쪽(먼저 감쌈) → 바깥쪽(나중에 감쌈, 호출 시 가장 먼저 실행)

| # | 위치 | 주석 | 코드 시작 부분 |
|---|---|---|---|
| 1 | `europe-design.js:53` | — | `(st,side,s){const m=st.ultMove,id=m?.euroCountry;if(!id¦¦matchMedia('(prefers-reduced-motion: reduce)').matche…` |
| 2 | `world-effects.js:48` | — | `(st,side,s){const m=st.ultMove,c=WORLD_SCENES[m?.worldScene];if(!c¦¦matchMedia('(prefers-reduced-motion: reduc…` |

