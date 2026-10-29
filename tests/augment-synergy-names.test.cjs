const assert=require('assert/strict'),fs=require('fs'),path=require('path');
const source=fs.readFileSync(path.join(process.cwd(),'index.html'),'utf8');
const expected=['정밀 탁구부','드라이브 연합','필살기 연구회','수비 장인단','근성 랠리단','스핀코인 클럽','눈오는 날'];
for(const name of expected)assert.match(source,new RegExp(`['"]${name}['"]:`));
for(const oldName of ['스나이퍼','결투가','비전술사','수호자','싸움꾼','포춘'])assert.doesNotMatch(source,new RegExp(`${oldName}:`));
console.log('Augmentation synergies use SPP-themed names while preserving 눈오는 날');
