(()=>{
const pad=document.getElementById('pad'),line=document.getElementById('line'),answer=document.getElementById('answer');
const descriptions={tap:'터치 · 손을 거의 움직이지 않았습니다. 경기에서는 쇼트·블록을 익히는 기본 입력입니다.',up:'위로 스윙 · 드라이브 방향입니다. 실제 타구 결과는 상대 공과 캐릭터 특성에 따라 달라집니다.',down:'아래로 스윙 · 커트 방향입니다. 경기에서는 공의 바운드와 타이밍도 함께 맞춰야 합니다.',side:'좌우 이동이 더 큽니다. 위·아래 타구 방향을 익히려면 세로로 조금 더 분명하게 그려 보세요.'};
let start=null,points=[];
const point=e=>{const r=pad.getBoundingClientRect();return {x:e.clientX-r.left,y:e.clientY-r.top};};
pad.addEventListener('pointerdown',e=>{if(start||e.button>0)return;start={...point(e),id:e.pointerId};points=[start];line.setAttribute('d','');pad.setPointerCapture(e.pointerId);});
pad.addEventListener('pointermove',e=>{if(!start||e.pointerId!==start.id)return;points.push(point(e));line.setAttribute('d',points.map((p,i)=>(i?'L':'M')+p.x+' '+p.y).join(' '));});
pad.addEventListener('pointerup',e=>{if(!start||e.pointerId!==start.id)return;const end=point(e),dx=end.x-start.x,dy=end.y-start.y,key=Math.hypot(dx,dy)<18?'tap':Math.abs(dx)>Math.abs(dy)?'side':dy<0?'up':'down';answer.textContent=descriptions[key];start=null;});
pad.addEventListener('pointercancel',()=>{start=null;answer.textContent='입력이 취소됐습니다. 다시 그려 보세요.';});
document.querySelectorAll('[data-stroke]').forEach(b=>b.onclick=()=>{answer.textContent=descriptions[b.dataset.stroke];});
})();
