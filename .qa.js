(()=>{const Z=window.QAH={};
Z.reset=()=>{Z.r={pts:0,err:[],nan:0,stuck:0,badOut:[],voided:0};};
const origPoint=window.point;window.point=function(player,reason){try{const b=ball;if(b&&!b.held&&Z.r){const outish=/밖으로|아웃|네트|자기 코트/.test(reason);if(outish&&!b.miss&&!b.unreturn&&!b.serving&&!b.faultAt&&!b.chance&&b.bounces===0&&(b.owner==='ai'||Z.lastOk))Z.r.badOut.push({who:b.owner,reason,type:b.type,ult:b.ult,gamble:b.gamble,spin:+(+b.spin).toFixed(2),ch:b.owner==='you'?charType:aiChar,tier:aiTier,mode});}}catch(e){}return origPoint.apply(this,arguments);};
const origRec=window.recoverGameLoop;window.recoverGameLoop=function(e,ph){if(Z.r){Z.r.err.push('recover '+(ph||'sim')+': '+(e&&e.message));if(ph!=='render')Z.r.voided++;}return origRec.apply(this,arguments);};
Z.mot=q=>{const vx=(Math.random()-.5)*1600,vy=-(600+Math.random()*1800),dx=vx*.12,rise=-vy*.12;return{until:time+1,vx,vy,x:q.x,y:q.y,fromX:q.x-dx,fromY:q.y+rise,dx,rise,drop:Math.random()<.3?40:0,dir:Math.random()<.75?'up':'down',side:Math.random()<.5?'left':'right',above:Math.random()<.5,below:false};};
Z.bad=()=>{const v=[YAW.a];if(ball)v.push(ball.x,ball.y,ball.z,ball.vx,ball.vy,ball.vz);return v.some(x=>x!=null&&!Number.isFinite(x));};
Z.run=(label,setup,ms)=>{Z.reset();const R=Z.r;try{setup();}catch(e){R.err.push('setup '+e.message);return R;}cdUntil=0;const end=performance.now()+ms;let n=0,lastScore=you+cpu,since=0;
 while(performance.now()<end){n++;try{ultHoldUntil=0;}catch{}
  try{if(ball&&ball.held&&ball.owner==='you'){ball.tossed=true;ball.z=.3;ball.vz=-.5;swingMemory=Z.mot({x:0,y:0});serveHit();Z.lastOk=true;}
  else if(ball&&!ball.held&&ball.owner==='ai'&&ball.bounces===1&&(mode!=='trio'||ball.rcv===0)&&(mode!=='doubles'||myTurn!=='mate')){if(Math.random()<.15&&charge<100)charge=100;if(preLeft()){const q=project(ball.x,ball.y,ball.z);paddle.x=q.x;paddle.y=q.y;hit(true);}const q=project(ball.dual&&ball.dualHit&&ball.dualX!=null?ball.dualX:ball.x,ball.y,ball.z);paddle.x=q.x;paddle.y=q.y;lastHit=-10;if(ball.dual&&ball.dualHit)ball.dualT=time-DUAL_GAP-DUAL_CLOSE;swingMemory=Z.mot(q);hit(Math.random()<.2?'short':undefined);if(ball&&ball.owner==='you')Z.lastOk=!ball.miss;}}catch(e){R.err.push('hit: '+e.message);}
  try{update(1/60);}catch(e){R.err.push('update: '+e.message);ball=null;wait=1;}
  if(n%9===0){try{render();}catch(e){R.err.push('render: '+e.message);}}
  if(Z.bad())R.nan++;
  if(you+cpu!==lastScore){lastScore=you+cpu;since=0;R.pts++;}else if(++since>60*90&&playing){R.stuck++;since=0;R.stuckAt=R.stuckAt||JSON.stringify({mode,ball:ball&&{owner:ball.owner,b:ball.bounces,held:ball.held,type:ball.type,y:+(+ball.y).toFixed(2)},wait});}
  if(!playing){try{for(const d of document.querySelectorAll('dialog[open]'))d.close();}catch{}try{setup();}catch(e){R.err.push('re '+e.message);break;}cdUntil=0;lastScore=you+cpu;}
 }R.err=[...new Set(R.err)].slice(0,5);R.badN=R.badOut.length;return R;};
Z.fmt=r=>`pts ${r.pts} err ${r.err.length} nan ${r.nan} stuck ${r.stuck} void ${r.voided} badOut ${r.badN}`+(r.badN?' e.g. '+JSON.stringify(r.badOut[0]):'')+(r.err.length?' | '+r.err[0]:'')+(r.stuck?' | stuckAt '+r.stuckAt:'');
window.ALL=['jersey','leesin','percival','drunk','ajae','minhee','yunhwan','seohyun','jongryeong','kumho','chungdae','songstar','ttalgak','jiseong','sleepy','gambler','glass','adam','aribeom','ninja'];prog.unlocked=[...new Set([...prog.unlocked,...ALL])];})();
