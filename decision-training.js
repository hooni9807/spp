(()=>{
const form=document.getElementById('decision-quiz'),summary=document.getElementById('quiz-summary');
form.addEventListener('submit',e=>{
 e.preventDefault();let answered=0,correct=0;
 for(const question of form.querySelectorAll('fieldset')){
  const choice=question.querySelector('input:checked'),feedback=question.querySelector('.feedback');
  if(choice){answered++;if(choice.value===question.dataset.answer)correct++;feedback.textContent=(choice.value===question.dataset.answer?'정답입니다. ':'다시 생각해 보세요. ')+feedback.dataset.explanation;feedback.hidden=false;}
  else{feedback.textContent='먼저 답을 하나 선택해 주세요.';feedback.hidden=false;}
 }
 summary.textContent=`${answered}/12문제 응답 · ${correct}개 정답. ${answered<12?'아직 선택하지 않은 문제도 확인해 보세요.':'아래 해설을 확인하고 해당 가이드로 복습하세요.'} 이 결과는 게임 기록이나 업적에 반영되지 않습니다.`;
 summary.focus();
});
form.addEventListener('reset',()=>{summary.textContent='다시 풀 수 있습니다. 답과 해설은 이 페이지를 닫으면 저장되지 않습니다.';for(const feedback of form.querySelectorAll('.feedback'))feedback.hidden=true;});
})();
