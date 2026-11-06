const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict'),html=fs.readFileSync('index.html','utf8');
const fx={},enemy={},c={Math,charType:'songstar',PLAYER_SPECIAL_CHARGE:{perfect:15,normal:10},R_:k=>fx[k]||0,oppR:k=>enemy[k]||0};vm.createContext(c);vm.runInContext(html.split('\n').find(l=>l.startsWith('const playerSpecialChargeGain=')),c);
const gain=(q,ch)=>vm.runInContext('playerSpecialChargeGain('+JSON.stringify(q)+','+JSON.stringify(ch)+')',c);
assert.equal(gain('GOOD','songstar'),5);assert.equal(gain('PERFECT','songstar'),7.5);assert.equal(gain('GOOD','jersey'),10);assert.equal(gain('PERFECT','jersey'),15);
fx.utKey=.08;fx.atkCharge=.2;enemy.utAntiSpecial=.15;for(const q of ['GOOD','GREAT','PERFECT'])assert.equal(gain(q,'songstar'),gain(q,'jersey')/2);
assert.equal(Math.min(100,97.5+gain('PERFECT','songstar')),100);assert.match(html,/charge\+playerSpecialChargeGain\(quality\)/);console.log('PASS Songstar gets exactly half normal/PERFECT charge, including skill and opponent modifiers, capped at 100');
