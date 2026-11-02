// 경기 배경음악: 파일 없이 WebAudio로 직접 연주하는 112BPM 스포츠 비트(Am-F-C-G, 킥 · 하이햇 · 베이스 · 플럭 아르페지오 · 패드).
// 경기 중에만 나오고, 점수 음성(speechSynthesis)이 말하는 동안은 소리를 내렸다가 끝나면 다시 올린다.
// 켜기/끄기는 설정창 "배경음악" 스위치(store 'bgm'), 전체 사운드가 꺼져 있으면 같이 꺼진다.
(()=>{
const BPM=112,STEP=60/BPM/4,VOL=.13;
const CH=[[57,60,64],[53,57,60],[48,52,55],[55,59,62]];   // Am F C G (MIDI)
const hz=m=>440*Math.pow(2,(m-69)/12);
let ctx=null,master=null,noise=null,timer=null,next=0,step=0,on=false;
const enabled=()=>{try{return store.get('bgm')!=='off';}catch{return true;}};
const soundOn=()=>typeof sound==='undefined'||!!sound;
function init(){if(ctx)return;ctx=new (window.AudioContext||window.webkitAudioContext)();master=ctx.createGain();master.gain.value=0;
 const lp=ctx.createBiquadFilter();lp.type='lowpass';lp.frequency.value=5200;master.connect(lp).connect(ctx.destination);
 noise=ctx.createBuffer(1,ctx.sampleRate*.25,ctx.sampleRate);const d=noise.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;}
function env(t,dur,peak,node){const g=ctx.createGain();g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(peak,t+.008);g.gain.exponentialRampToValueAtTime(.0001,t+dur);node.connect(g).connect(master);return g;}
function tone(type,f,t,dur,peak){const o=ctx.createOscillator();o.type=type;o.frequency.value=f;env(t,dur,peak,o);o.start(t);o.stop(t+dur+.05);}
function kick(t){const o=ctx.createOscillator();o.frequency.setValueAtTime(130,t);o.frequency.exponentialRampToValueAtTime(42,t+.12);env(t,.22,.9,o);o.start(t);o.stop(t+.3);}
function hat(t,peak,open){const s=ctx.createBufferSource();s.buffer=noise;const hp=ctx.createBiquadFilter();hp.type='highpass';hp.frequency.value=open?6000:8000;s.connect(hp);env(t,open?.12:.04,peak,hp);s.start(t);s.stop(t+.2);}
function clap(t){const s=ctx.createBufferSource();s.buffer=noise;const bp=ctx.createBiquadFilter();bp.type='bandpass';bp.frequency.value=1700;bp.Q.value=.8;s.connect(bp);env(t,.14,.45,bp);s.start(t);s.stop(t+.2);}
function play(i,t){const bar=Math.floor(i/16)%4,s=i%16,c=CH[bar];
 if(s===0||s===8||s===10&&bar===3)kick(t);
 if(s===4||s===12)clap(t);
 if(s%2===1)hat(t,s%4===3?.22:.12,s===14);
 if([0,3,8,11,14].includes(s))tone('square',hz(c[0]-24),t,STEP*1.6,.16);
 if(s%2===0){const n=c[[0,1,2,1,0,2,1,2][s/2]]+12;tone('triangle',hz(n),t,STEP*1.8,.13);}
 if(s===0)for(const n of c)tone('sine',hz(n),t,STEP*15,.05);}
function tick(){while(next<ctx.currentTime+.25){play(step++,next);next+=STEP;}}
function want(){return enabled()&&soundOn()&&typeof playing!=='undefined'&&playing&&!(typeof paused!=='undefined'&&paused);}
function update(){const w=want();
 if(w&&!on){try{init();if(ctx.state==='suspended')ctx.resume().catch(()=>{});}catch{return;}on=true;next=ctx.currentTime+.05;timer=setInterval(tick,60);}
 if(!w&&on){on=false;clearInterval(timer);timer=null;master.gain.cancelScheduledValues(ctx.currentTime);master.gain.setTargetAtTime(0,ctx.currentTime,.05);}
 if(on){const speaking=!!window.speechSynthesis?.speaking,target=speaking?0:VOL;   // 점수를 부르는 동안은 끄고, 다 부르면 다시
  master.gain.setTargetAtTime(target,ctx.currentTime,speaking?.04:.35);}}
setInterval(update,120);
// 모바일은 사용자 터치가 있어야 소리가 난다: 첫 터치 때 깨워 둔다.
addEventListener('pointerdown',()=>{if(ctx&&ctx.state==='suspended')ctx.resume().catch(()=>{});},{passive:true});

// 설정창 스위치: "사운드" 줄 아래에 붙인다.
const css=document.createElement('style');css.textContent=`
#game-settings label.bgm-row{display:flex;align-items:center;gap:12px}
#game-settings label.bgm-row span{flex:1}
#game-settings label.bgm-row small{margin-left:0}
#pref-bgm{appearance:none;-webkit-appearance:none;flex:0 0 auto;width:46px;height:26px;margin:0;border-radius:999px;background:#33244e;position:relative;cursor:pointer;transition:background .2s cubic-bezier(.16,1,.3,1)}
#pref-bgm::after{content:'';position:absolute;top:3px;left:3px;width:20px;height:20px;border-radius:50%;background:#ece6ff;box-shadow:0 2px 6px rgba(0,0,0,.4);transition:transform .2s cubic-bezier(.16,1,.3,1)}
#pref-bgm:checked{background:#ff345d}
#pref-bgm:checked::after{transform:translateX(20px)}
#pref-bgm:focus-visible{outline:2px solid #ff345d;outline-offset:3px}
#pref-bgm:disabled{opacity:.45;cursor:not-allowed}
@media(prefers-reduced-motion:reduce){#pref-bgm,#pref-bgm::after{transition:none}}`;
document.head.append(css);
const attach=()=>{const dlg=document.getElementById('game-settings'),snd=dlg?.querySelector('#pref-sound,[data-gp="sound"]');if(!snd||!dlg){setTimeout(attach,300);return;}
 if(document.getElementById('pref-bgm'))return;
 const row=document.createElement('label');row.className='bgm-row';
 row.innerHTML='<span>배경음악 <small>경기 중 흐르는 비트 · 점수를 부를 땐 잠시 멈춤</small></span><input id="pref-bgm" type="checkbox" role="switch">';
 const rows=dlg.querySelectorAll('label');(rows[rows.length-1]||snd.closest('label')).after(row);const sw=row.querySelector('input');
 const sync=()=>{sw.checked=enabled();sw.disabled=!snd.checked;};
 sw.addEventListener('change',()=>{try{store.set('bgm',sw.checked?'on':'off');}catch{}update();});
 snd.addEventListener('change',sync);document.getElementById('settings-fab')?.addEventListener('click',()=>setTimeout(sync,0));sync();};
attach();
})();
