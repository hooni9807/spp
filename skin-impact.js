// 디자인 컬렉션 라켓 스킨 타구 임팩트: 내가 공을 치는 순간 라켓 스킨마다 다른 이펙트를 코트 위 겹친 캔버스에 그린다.
// pixelfx 원칙: 빠르게 터지고 천천히 사라짐(outExpo) · 첫 2프레임 흰 섬광 · 중심 하나 + 2차 입자 · 색은 스킨 팔레트 3단.
// PERFECT 타구에만 크게(×2.2) 터진다. 경기 중에는 장착한 스킨의 배경 효과도 가장자리에 깐다. 게임 판정에는 영향 없음(연출 전용).
(()=>{
const cv=document.createElement('canvas');cv.id='skin-impact';cv.setAttribute('aria-hidden','true');
cv.style.cssText='position:fixed;pointer-events:none;z-index:39;left:0;top:0';document.body.append(cv);
const g=cv.getContext('2d'),live=[];
const TAU=Math.PI*2,outExpo=t=>t>=1?1:1-Math.pow(2,-10*t),inQuad=t=>t*t;
let seed=1;const rnd=()=>(seed=(seed*16807)%2147483647)/2147483647;   // 시드 고정 난수(매 타구 새 시드)

// 스킨마다: 지속 시간(초)과 그리기 함수(k 0→1 진행, s 크기 배율, c 팔레트 [밝음, 중간, 어둠])
const FX={
 eclipse:{d:.6,make(s){return {rays:[...Array(s>1?12:8)].map((_,i)=>({a:i/(s>1?12:8)*TAU+rnd()*.2,l:.7+rnd()*.5}))};},
  draw(e,k,s,c){const R=26*s*outExpo(k),fade=1-inQuad(k);   // 검은 원반을 금빛 코로나가 감싸고 광선이 뻗는다
   g.globalCompositeOperation='lighter';g.strokeStyle=c[0];g.globalAlpha=fade;g.lineWidth=3*s*(1-k)+1;g.beginPath();g.arc(0,0,R,0,TAU);g.stroke();
   g.strokeStyle=c[1];g.lineWidth=2;for(const r of e.rays){const a=R*.9,b=R*(1.2+r.l*outExpo(k));g.beginPath();g.moveTo(Math.cos(r.a)*a,Math.sin(r.a)*a);g.lineTo(Math.cos(r.a)*b,Math.sin(r.a)*b);g.stroke();}
   g.globalCompositeOperation='source-over';g.globalAlpha=fade*.9;g.fillStyle=c[2];g.beginPath();g.arc(0,0,R*.62,0,TAU);g.fill();}},
 glacier:{d:.65,make(s){return {sh:[...Array(s>1?10:7)].map((_,i,a)=>({a:i/a.length*TAU+rnd()*.4,v:30+rnd()*30,r:rnd()*TAU,w:(rnd()-.5)*8,z:4+rnd()*4}))};},
  draw(e,k,s,c){const p=outExpo(k),fade=1-inQuad(k);   // 육각 서리 고리 + 회전하며 튀는 결정 조각
   g.globalAlpha=fade*.8;g.strokeStyle=c[1];g.lineWidth=1.5;g.beginPath();for(let i=0;i<=6;i++){const a=i/6*TAU+.5,R=22*s*p;g.lineTo(Math.cos(a)*R,Math.sin(a)*R);}g.stroke();
   for(const h of e.sh){const d=h.v*s*p,x=Math.cos(h.a)*d,y=Math.sin(h.a)*d,z=h.z*s*(1-k*.5);g.save();g.translate(x,y);g.rotate(h.r+h.w*k);g.globalAlpha=fade;
    g.fillStyle=c[0];g.beginPath();g.moveTo(0,-z);g.lineTo(z*.45,0);g.lineTo(0,z);g.lineTo(-z*.45,0);g.closePath();g.fill();g.fillStyle=c[1];g.beginPath();g.moveTo(0,-z);g.lineTo(z*.45,0);g.lineTo(0,0);g.closePath();g.fill();g.restore();}}},
 ember:{d:.7,make(s){return {arcs:[...Array(s>1?6:4)].map((_,i,a)=>({a:i/a.length*TAU+rnd(),sp:2+rnd()*2})),sp:[...Array(s>1?16:10)].map(()=>({a:rnd()*TAU,v:20+rnd()*40,up:20+rnd()*30,z:1+rnd()*2}))};},
  draw(e,k,s,c){const p=outExpo(k),fade=1-inQuad(k);g.globalCompositeOperation='lighter';   // 소용돌이치는 불꽃 곡선 + 위로 떠오르는 불티
   for(const a of e.arcs){const R=24*s*p,st=a.a+k*a.sp;g.strokeStyle=c[1];g.globalAlpha=fade;g.lineWidth=4*s*(1-k)+1;g.lineCap='round';g.beginPath();g.arc(0,0,R,st,st+1.4*(1-k*.6));g.stroke();
    g.strokeStyle=c[0];g.lineWidth=1.2;g.beginPath();g.arc(0,0,R*.85,st+.2,st+1.1*(1-k*.6));g.stroke();}
   for(const q of e.sp){const d=q.v*s*p;g.globalAlpha=fade;g.fillStyle=k<.4?c[0]:c[1];g.fillRect(Math.cos(q.a)*d,Math.sin(q.a)*d-q.up*s*k,q.z*s,q.z*s);}g.globalCompositeOperation='source-over';}},
 jade:{d:.75,make(s){return {mist:[...Array(s>1?14:9)].map(()=>({a:rnd()*TAU,r:.4+rnd()*.8,z:1.5+rnd()*2.5}))};},
  draw(e,k,s,c){const p=outExpo(k),fade=1-inQuad(k),rot=k*3.4;   // 두 갈래 용 소용돌이가 돌며 퍼지고 비취 안개 점이 따라 돈다
   g.lineCap='round';for(let arm=0;arm<2;arm++){g.beginPath();for(let i=0;i<=24;i++){const t=i/24,a=rot+arm*Math.PI+t*4.2,R=(6+t*26)*s*p;g.lineTo(Math.cos(a)*R,Math.sin(a)*R);}
    g.globalAlpha=fade;g.strokeStyle=c[1];g.lineWidth=3.2*s*(1-k*.7);g.stroke();g.strokeStyle=c[0];g.lineWidth=1;g.stroke();}
   g.fillStyle=c[0];for(const m of e.mist){const a=m.a+rot*.6,R=30*s*p*m.r;g.globalAlpha=fade*.7;g.beginPath();g.arc(Math.cos(a)*R,Math.sin(a)*R,m.z*s*(1-k*.5),0,TAU);g.fill();}}},
 sakura:{d:.9,make(s){return {pe:[...Array(s>1?12:8)].map(()=>({a:rnd()*TAU,v:18+rnd()*26,r:rnd()*TAU,w:(rnd()-.5)*10,sw:rnd()*TAU,z:4+rnd()*3}))};},
  draw(e,k,s,c){const p=outExpo(k),fade=1-inQuad(k);   // 달빛 고리 + 흔들리며 흩날려 떨어지는 꽃잎
   g.globalAlpha=fade*.6;g.strokeStyle=c[0];g.lineWidth=1.5;g.beginPath();g.arc(0,0,20*s*p,0,TAU);g.stroke();
   for(const f of e.pe){const d=f.v*s*p,x=Math.cos(f.a)*d+Math.sin(f.sw+k*9)*4*s,y=Math.sin(f.a)*d+18*s*k*k,z=f.z*s;g.save();g.translate(x,y);g.rotate(f.r+f.w*k);g.globalAlpha=fade;
    g.fillStyle=c[1];g.beginPath();g.ellipse(0,0,z*.55,z,0,0,TAU);g.fill();g.fillStyle=c[0];g.beginPath();g.ellipse(0,-z*.35,z*.25,z*.45,0,0,TAU);g.fill();g.restore();}}},
 circuit:{d:.55,make(s){return {tr:[...Array(s>1?8:6)].map((_,i,a)=>{const dir=i/a.length*TAU,pts=[[0,0]];let x=0,y=0,h=Math.round(dir/(Math.PI/2))%2===0;for(let j=0;j<3;j++){const L=(8+rnd()*10);if(h)x+=Math.sign(Math.cos(dir)||1)*L;else y+=Math.sign(Math.sin(dir)||1)*L;pts.push([x,y]);h=!h;}return pts;})};},
  draw(e,k,s,c){const p=Math.min(1,k/.45),fade=k<.45?1:1-(k-.45)/.55;g.globalCompositeOperation='lighter';   // 중심에서 직각으로 꺾이며 뻗는 회로선 + 끝 노드 + 주사선 섬광
   g.lineWidth=1.6;g.strokeStyle=c[1];g.fillStyle=c[0];
   for(const t of e.tr){const n=t.length-1,upto=p*n;g.globalAlpha=fade;g.beginPath();g.moveTo(0,0);let end=[0,0];
    for(let j=1;j<=n;j++){const f=Math.min(1,upto-(j-1));if(f<=0)break;const [ax,ay]=t[j-1],[bx,by]=t[j];end=[(ax+(bx-ax)*f)*s,(ay+(by-ay)*f)*s];g.lineTo(end[0],end[1]);}
    g.stroke();g.fillRect(end[0]-2*s,end[1]-2*s,4*s,4*s);}
   if(k<.25){g.globalAlpha=(1-k/.25)*.5;g.fillStyle=c[0];g.fillRect(-40*s,-1.5,80*s,3);}g.globalCompositeOperation='source-over';}}
};

const court=()=>document.getElementById('court');
function spawn(){const def=typeof equippedSkin==='function'?equippedSkin():null,fx=def&&FX[def.skin];if(!fx||!ball||typeof project!=='function')return;
 const q=project(ball.x,ball.y,ball.z);if(!Number.isFinite(q?.x))return;const perfect=document.getElementById('timing')?.textContent==='PERFECT',s=2.2;if(!perfect)return;   /* PERFECT 타구에만, 크게 */
 seed=(Date.now()%100000)+1;live.push({x:q.x,y:q.y,t:performance.now(),fx,s,c:def.colors,e:fx.make(s),perfect});if(live.length>6)live.shift();}
// 미리보기/점검용: 코트 좌표(x, y)에 해당 스킨 이펙트를 한 번 띄운다.
window.skinImpactPreview=(id,x,y,perfect=false)=>{const def=typeof allRacketSkins==='function'&&allRacketSkins().find(r=>r.skin===id),fx=FX[id];if(!def||!fx)return false;const s=perfect?2.2:1;seed=(Date.now()%100000)+1;live.push({x,y,t:performance.now(),fx,s,c:def.colors,e:fx.make(s),perfect});return true;};
// 배경 효과: 디자인 라켓을 끼고 경기하는 동안 코트 가장자리에 스킨 분위기를 옅게 깐다(공 길을 가리지 않게 낮은 투명도 · 가장자리 위주).
// 입자는 코트 크기 비율(0~1) 좌표로 두고 매 프레임 시간으로만 계산한다(상태 없음, 끊김 없는 반복).
const AMB_N={eclipse:10,glacier:22,ember:24,jade:16,sakura:18,circuit:6};
const R_=(i,j)=>{const h=Math.sin(i*91.3+j*47.9)*24634.6345;return h-Math.floor(h);};
function ambient(now,w,h,def){const id=def.skin,c=def.colors,t=now/1000,n=AMB_N[id];if(!n)return;
 const edge=(i)=>{const u=R_(i,1);return u<.5?u*.36:1-(u-.5)*.36;};   // 좌우 가장자리 18% 띠에 몰아 둔다
 g.save();
 if(id==='eclipse'){const x=w*.88,y=h*.12,R=Math.min(w,h)*.09,rot=t*.08;   // 오른쪽 위 작은 일식: 검은 원반 · 숨쉬는 금빛 코로나 · 천천히 도는 광선
  const gr=g.createRadialGradient(x,y,R*.6,x,y,R*2.4);gr.addColorStop(0,c[0]+'66');gr.addColorStop(1,c[0]+'00');g.fillStyle=gr;g.globalAlpha=.55+.15*Math.sin(t*1.3);g.beginPath();g.arc(x,y,R*2.4,0,TAU);g.fill();
  g.globalAlpha=.35;g.strokeStyle=c[1];g.lineWidth=1.2;for(let i=0;i<n;i++){const a=rot+i/n*TAU,l=R*(1.5+.6*Math.sin(t*.9+i));g.beginPath();g.moveTo(x+Math.cos(a)*R*1.1,y+Math.sin(a)*R*1.1);g.lineTo(x+Math.cos(a)*l,y+Math.sin(a)*l);g.stroke();}
  g.globalAlpha=.85;g.fillStyle=c[2];g.beginPath();g.arc(x,y,R,0,TAU);g.fill();g.globalAlpha=.9;g.strokeStyle=c[0];g.lineWidth=1;g.stroke();
  const ba=t*.5;g.fillStyle='#fff';g.globalAlpha=.6+.4*Math.sin(t*3);g.beginPath();g.arc(x+Math.cos(ba)*R,y+Math.sin(ba)*R,2.2,0,TAU);g.fill();}   // 다이아몬드 링 반짝임
 else if(id==='glacier'){for(let i=0;i<n;i++){const sp=.03+R_(i,2)*.04,y=((R_(i,3)+t*sp)%1)*h,x=edge(i)*w+Math.sin(t*.7+i)*8,z=1.5+R_(i,4)*2.5;   // 가장자리로 천천히 내리는 얼음 결정 · 가끔 반짝
   g.globalAlpha=.25+.35*Math.max(0,Math.sin(t*1.6+i*1.7));g.fillStyle=c[0];g.save();g.translate(x,y);g.rotate(t*.4+i);g.beginPath();g.moveTo(0,-z*1.6);g.lineTo(z*.7,0);g.lineTo(0,z*1.6);g.lineTo(-z*.7,0);g.closePath();g.fill();g.restore();}}
 else if(id==='ember'){g.globalCompositeOperation='lighter';for(let i=0;i<n;i++){const sp=.05+R_(i,2)*.08,k=(R_(i,3)+t*sp)%1,y=h*(1-k),x=edge(i)*w+Math.sin(t*1.1+i*2)*10*k,z=1+R_(i,4)*2;   // 아래 가장자리에서 떠오르는 불티
   g.globalAlpha=(1-k)*.6;g.fillStyle=k<.3?c[0]:c[1];g.fillRect(x,y,z,z);}
  const gr=g.createLinearGradient(0,h,0,h*.75);gr.addColorStop(0,c[1]+'44');gr.addColorStop(1,c[1]+'00');g.globalAlpha=.6+.25*Math.sin(t*2.1);g.fillStyle=gr;g.fillRect(0,h*.75,w,h*.25);}   // 바닥 쪽 맥동하는 붉은 빛
 else if(id==='jade'){for(let arm=0;arm<2;arm++){const cx=arm?w*.92:w*.08,cy=h*(arm?.3:.7);g.beginPath();for(let i=0;i<=30;i++){const k=i/30,a=t*.35*(arm?1:-1)+k*5,R=(6+k*44);g.lineTo(cx+Math.cos(a)*R,cy+Math.sin(a)*R*.7);}   // 양쪽 가장자리에 천천히 도는 용 소용돌이 · 비취 안개
   g.globalAlpha=.22;g.strokeStyle=c[1];g.lineWidth=3;g.stroke();g.globalAlpha=.35;g.strokeStyle=c[0];g.lineWidth=1;g.stroke();}
  for(let i=0;i<n;i++){const a=t*.2+i,x=edge(i)*w+Math.cos(a)*14,y=((R_(i,3)+t*.02)%1)*h,z=2+R_(i,4)*3;g.globalAlpha=.18+.12*Math.sin(t+i);g.fillStyle=c[0];g.beginPath();g.arc(x,y,z,0,TAU);g.fill();}}
 else if(id==='sakura'){for(let i=0;i<n;i++){const sp=.035+R_(i,2)*.04,k=(R_(i,3)+t*sp)%1,y=k*h,x=edge(i)*w+Math.sin(t*.9+i*1.3)*16,z=3+R_(i,4)*2.5,fl=Math.abs(Math.sin(t*1.7+i));   // 가장자리로 흩날려 떨어지는 꽃잎 · 빛 받으면 반짝
   g.save();g.translate(x,y);g.rotate(t*.8+i);g.scale(1,.35+fl*.65);g.globalAlpha=.3+.3*fl;g.fillStyle=fl>.9?c[0]:c[1];g.beginPath();g.ellipse(0,0,z*.55,z,0,0,TAU);g.fill();g.restore();}}
 else if(id==='circuit'){g.globalCompositeOperation='lighter';g.lineWidth=1;for(let i=0;i<n;i++){const left=i%2===0,x0=left?w*.02:w*.98,dir=left?1:-1,y0=h*(.15+.7*R_(i,5)),pts=[[x0,y0],[x0+dir*w*.05,y0],[x0+dir*w*.05,y0+h*.08*(R_(i,6)-.5)*2],[x0+dir*w*.12,y0+h*.08*(R_(i,6)-.5)*2]];   // 좌우 가장자리 회로선 · 펄스가 흘러가고 끝 노드가 깜빡
   g.globalAlpha=.18;g.strokeStyle=c[1];g.beginPath();pts.forEach((p,j)=>j?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1]));g.stroke();
   const k=(t*.45+R_(i,7))%1,seg=Math.min(2,Math.floor(k*3)),f=k*3-seg,[ax,ay]=pts[seg],[bx,by]=pts[seg+1];g.globalAlpha=.7;g.fillStyle=c[0];g.fillRect(ax+(bx-ax)*f-1.5,ay+(by-ay)*f-1.5,3,3);
   const [ex,ey]=pts[3];g.globalAlpha=.25+.45*(Math.sin(t*3+i)>.6);g.fillRect(ex-2,ey-2,4,4);}}
 g.restore();}
let prevOwner=null;
(function frame(now){requestAnimationFrame(frame);
 const o=typeof ball!=='undefined'&&ball?ball.owner:null;
 if(o==='you'&&prevOwner==='ai'&&ball&&!ball.held&&typeof playing!=='undefined'&&playing&&!(typeof net!=='undefined'&&net?.trio))spawn();   // 내 타구 순간 = 공 주인이 AI에서 나로
 prevOwner=o;
 const c=court();if(!c)return;const r=c.getBoundingClientRect(),dpr=Math.min(2,devicePixelRatio||1);
 if(cv.width!==Math.round(r.width*dpr)||cv.height!==Math.round(r.height*dpr)){cv.width=Math.round(r.width*dpr);cv.height=Math.round(r.height*dpr);}
 cv.style.left=r.left+'px';cv.style.top=r.top+'px';cv.style.width=r.width+'px';cv.style.height=r.height+'px';
 g.setTransform(1,0,0,1,0,0);g.clearRect(0,0,cv.width,cv.height);
 {const def=typeof equippedSkin==='function'?equippedSkin():null;if(def&&AMB_N[def.skin]&&typeof playing!=='undefined'&&playing&&!(typeof paused!=='undefined'&&paused)&&!(typeof prefs==='object'&&prefs.reduceMotion)){g.setTransform(dpr,0,0,dpr,0,0);ambient(now,r.width,r.height,def);g.globalAlpha=1;g.globalCompositeOperation='source-over';}}
 if(!live.length)return;
 const k0=r.width/(typeof W==='number'&&W||r.width)*dpr;
 for(let i=live.length-1;i>=0;i--){const e=live[i],k=(now-e.t)/1000/e.fx.d;if(k>=1){live.splice(i,1);continue;}
  g.setTransform(k0,0,0,k0,e.x*k0,e.y*k0);g.globalAlpha=1;
  if(k<.07){g.globalCompositeOperation='lighter';g.fillStyle='#fff';g.globalAlpha=1-k/.07;g.beginPath();g.arc(0,0,(e.perfect?14:9)*e.s,0,TAU);g.fill();g.globalCompositeOperation='source-over';}   // 흰 섬광 1~2프레임
  e.fx.draw(e.e,k,e.s,e.c);}
 g.globalAlpha=1;})(performance.now());
})();
