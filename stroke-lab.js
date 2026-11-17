(()=>{
const pad=document.getElementById('pad'),line=document.getElementById('line'),answer=document.getElementById('answer');
const goal=document.getElementById('stroke-goal'),progress=document.getElementById('stroke-progress');
const descriptions={tap:'터치 · 손을 거의 움직이지 않았습니다. 경기에서는 쇼트·블록을 익히는 기본 입력입니다.',up:'위로 스윙 · 드라이브 방향입니다. 실제 타구 결과는 상대 공과 캐릭터 특성에 따라 달라집니다.',down:'아래로 스윙 · 커트 방향입니다. 경기에서는 공의 바운드와 타이밍도 함께 맞춰야 합니다.',side:'좌우 이동이 더 큽니다. 위·아래 타구 방향을 익히려면 세로로 조금 더 분명하게 그려 보세요.',return:'시작점으로 되돌아온 선입니다. 터치와 구분하려면 손을 뗄 때까지 한 방향으로 그려 보세요.'};
const goals={tap:'터치 · 손을 거의 움직이지 않고 눌렀다 떼세요.',up:'드라이브 · 아래에서 출발해 위로 그리세요.',down:'커트 · 위에서 출발해 아래로 그리세요.'};
let start=null,points=[],excursion=0,target='up';
const completed=new Set();
const point=e=>{const r=pad.getBoundingClientRect();return {x:e.clientX-r.left,y:e.clientY-r.top};};
function draw(p){
 excursion=Math.max(excursion,Math.hypot(p.x-start.x,p.y-start.y));
 points.push(p);if(points.length>400)points.splice(1,1);
 line.setAttribute('d',points.map((v,i)=>(i?'L':'M')+v.x+' '+v.y).join(' '));
}
function choose(key){
 start=null;target=key;line.setAttribute('d','');pad.dataset.goal=key;
 goal.textContent=goals[key];answer.textContent=descriptions[key];
 document.querySelectorAll('[data-stroke]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.stroke===key)));
}
pad.addEventListener('pointerdown',e=>{if(start||e.button>0)return;start={...point(e),id:e.pointerId};points=[start];excursion=0;line.setAttribute('d','');pad.setPointerCapture(e.pointerId);});
pad.addEventListener('pointermove',e=>{if(!start||e.pointerId!==start.id)return;draw(point(e));});
pad.addEventListener('pointerup',e=>{
 if(!start||e.pointerId!==start.id)return;
 const end=point(e);draw(end);
 const dx=end.x-start.x,dy=end.y-start.y,distance=Math.hypot(dx,dy);
 const key=excursion<18?'tap':distance<18?'return':Math.abs(dx)>Math.abs(dy)?'side':dy<0?'up':'down';
 const success=key===target;start=null;
 answer.textContent=(success?'목표 방향 성공. ':'목표 방향을 다시 확인하세요. ')+descriptions[key];
 if(success)completed.add(key);
 progress.textContent=`직접 입력한 동작 ${completed.size} / 3종 확인`+(completed.size===3?' · 타이밍 연습에서 공에 맞춰 입력해 보세요.':' · 다른 동작도 골라 연습해 보세요.');
});
pad.addEventListener('pointercancel',e=>{if(!start||e.pointerId!==start.id)return;start=null;line.setAttribute('d','');answer.textContent='입력이 취소됐습니다. 다시 그려 보세요.';});
pad.addEventListener('lostpointercapture',e=>{if(start?.id===e.pointerId){start=null;line.setAttribute('d','');answer.textContent='입력이 중단됐습니다. 다시 그려 보세요.';}});
document.querySelectorAll('[data-stroke]').forEach(b=>b.onclick=()=>choose(b.dataset.stroke));
choose(target);
})();
