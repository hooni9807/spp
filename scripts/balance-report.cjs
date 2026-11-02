// 밸런스 리포트: 모든 플레이어의 공개 경기 기록(character_usage.stats._match)을 읽어 모드 · 난이도 · 나라 · 스테이지 구간별 승률을 합산한다.
// 읽기 전용(공개 읽기 허용 컬렉션)이며 아무것도 쓰지 않는다. 사용: node scripts/balance-report.cjs
const base='https://firestore.googleapis.com/v1/projects/spin-lab-ea7df/databases/(default)/documents/character_usage';
const val=v=>v==null?null:'integerValue' in v?+v.integerValue:'doubleValue' in v?+v.doubleValue:'arrayValue' in v?(v.arrayValue.values||[]).map(val):'mapValue' in v?Object.fromEntries(Object.entries(v.mapValue.fields||{}).map(([k,x])=>[k,val(x)])):null;
(async()=>{let docs=[],token='';do{const r=await fetch(`${base}?pageSize=300${token?`&pageToken=${token}`:''}`).then(r=>r.json());docs.push(...(r.documents||[]));token=r.nextPageToken||'';}while(token);
 const agg={},players={};let n=0,games=0,loss=0;
 for(const d of docs){const m=val(d.fields?.stats)?._match;if(!m)continue;n++;games+=m.games||0;loss+=m.loss||0;for(const src of [m.m||{},m.b||{}])for(const [k,[g,w]] of Object.entries(src)){const a=agg[k]??={g:0,w:0};a.g+=g;a.w+=w;players[k]=(players[k]||0)+1;}}
 console.log(`플레이어 ${n}명 · 전체 ${games}판 · 승률 ${games?Math.round((games-loss)/games*100):0}%\n`);
 const rows=Object.entries(agg).sort((a,b)=>a[0].localeCompare(b[0]));
 console.log('구분'.padEnd(22)+'판수'.padStart(7)+'승률'.padStart(7)+'인원'.padStart(6));
 for(const [k,a] of rows)console.log(k.padEnd(22)+String(a.g).padStart(7)+(Math.round(a.w/a.g*100)+'%').padStart(7)+String(players[k]).padStart(6));
})().catch(e=>{console.error(e);process.exit(1);});
