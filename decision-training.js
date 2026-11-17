(()=>{
const form=document.getElementById('decision-quiz'),summary=document.getElementById('quiz-summary'),review=document.getElementById('quiz-review'),retry=document.getElementById('quiz-retry');
const questions=[...form.querySelectorAll('fieldset')];
let mistakes=[];
function clearGrade(message){
 summary.textContent=message;
 review.hidden=true;
 for(const feedback of form.querySelectorAll('.feedback'))feedback.hidden=true;
}
form.addEventListener('submit',e=>{
 e.preventDefault();let answered=0,correct=0;mistakes=[];
 for(const question of questions){
  const choice=question.querySelector('input:checked'),feedback=question.querySelector('.feedback');
  if(choice){answered++;if(choice.value===question.dataset.answer)correct++;feedback.textContent=(choice.value===question.dataset.answer?'정답입니다. ':'다시 생각해 보세요. ')+feedback.dataset.explanation;feedback.hidden=false;}
  else{feedback.textContent='먼저 답을 하나 선택해 주세요.';feedback.hidden=false;}
  if(!choice||choice.value!==question.dataset.answer)mistakes.push(question);
 }
 for(const [id,first,last] of [['quiz-topic-input',0,6],['quiz-topic-ball',6,9],['quiz-topic-progress',9,12]]){
  const group=questions.slice(first,last),pending=group.filter(q=>!q.querySelector('input:checked')).length;
  const passed=group.filter(q=>q.querySelector('input:checked')?.value===q.dataset.answer).length;
  document.getElementById(id).textContent=`${passed}/${group.length}개 정답 · 오답 ${group.length-passed-pending}개 · 미응답 ${pending}개`;
 }
 retry.disabled=mistakes.length===0;
 review.hidden=false;
 summary.textContent=`${answered}/12문제 응답 · ${correct}개 정답. ${answered<12?'아직 선택하지 않은 문제도 확인해 보세요.':'문제별 해설과 아래 복습 안내를 확인하세요.'} 이 결과는 게임 기록이나 업적에 반영되지 않습니다.`;
 summary.focus();
});
form.addEventListener('change',()=>{mistakes=[];clearGrade('답을 변경했습니다. 다시 채점하면 현재 선택한 답으로 결과와 복습 안내를 확인할 수 있습니다.');});
retry.addEventListener('click',()=>{
 const first=mistakes[0];
 if(!first)return;
 for(const question of mistakes){
  for(const input of question.querySelectorAll('input'))input.checked=false;
  question.querySelector('details').open=false;
 }
 clearGrade('맞힌 답은 유지했습니다. 틀렸거나 답하지 않은 문제를 다시 고른 뒤 채점하세요.');
 first.querySelector('input').focus();
 mistakes=[];
});
form.addEventListener('reset',()=>{mistakes=[];clearGrade('다시 풀 수 있습니다. 답과 해설은 이 페이지를 닫으면 저장되지 않습니다.');for(const detail of form.querySelectorAll('details'))detail.open=false;});
})();
