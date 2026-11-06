const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict'),html=fs.readFileSync('index.html','utf8');
const lines=html.split('\n'),state={},c={Math,RUNES:[],runeOf:()=>0,titleFx:()=>0,tS:()=>state,HIDDEN_EFFECT_IDS:{},HIDDEN_BONUS_FX:{},charType:'jersey',gamblerSecretEdge:()=>false,gamblerSecretNet:()=>false,ajaeSecret:()=>false,window:{},applyAjaeSecretName:()=>{}};vm.createContext(c);
vm.runInContext(lines.find(l=>l.startsWith('const hiddenAllStat='))+'\n'+lines.find(l=>l.startsWith('const hiddenStatFor='))+'\n'+lines.find(l=>l.startsWith('const R_='))+'\n'+lines.find(l=>l.startsWith('function playerEdgeChance()')),c);
const snapshot=()=>vm.runInContext("[R_('utLuck'),R_('utEdge'),R_('utNetLuck'),playerEdgeChance(),playerNetCordChance()]",c);
const before=Array.from(snapshot());Object.assign(state,{secretDefeat:1,secretBasics:1,secretNoUltimate:1,secretUnlucky:1});assert.deepEqual(Array.from(snapshot()),before);assert.equal(vm.runInContext("R_('atkDrive')",c),.07);assert.equal(vm.runInContext('hiddenLuck()',c),.05);
c.RUNES.push(['edge','util',1,'','', 'utLuck',.03],['net','util',1,'','', 'utNetLuck',.01]);c.runeOf=()=>1;assert.equal(vm.runInContext("R_('utLuck')",c),.03);assert.equal(c.playerNetCordChance(),.11);
console.log('PASS generic +5% and probability achievements do not boost edge/net; dedicated skill bonuses remain');
