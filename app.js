const quizBank = [
 {subject:"financial",name:"Financial Accounting",q:"A business has sales of ₹5,00,000 and expenses of ₹3,80,000. What is its profit before other adjustments?",options:["₹1,20,000","₹3,80,000","₹5,00,000","₹8,80,000"],answer:0,explanation:"Profit = Revenue − Expenses = ₹5,00,000 − ₹3,80,000 = ₹1,20,000."},
 {subject:"financial",name:"Financial Accounting",q:"Which financial statement shows assets, liabilities and equity at a specific date?",options:["Income Statement","Balance Sheet","Cash Flow Statement","Trial Balance only"],answer:1,explanation:"A Balance Sheet reports the financial position at a particular date."},
 {subject:"financial",name:"Financial Accounting",q:"A provision for doubtful debts is generally deducted from which balance in the Balance Sheet?",options:["Trade payables","Capital","Trade receivables","Sales revenue"],answer:2,explanation:"The allowance reduces the carrying amount of trade receivables to the estimated collectible amount."},
 {subject:"cost",name:"Cost Accounting",q:"Variable cost is ₹12 per unit. If 500 units are produced, what is total variable cost?",options:["₹6,000","₹500","₹12,000","₹60,000"],answer:0,explanation:"Total variable cost = Variable cost per unit × Units = ₹12 × 500 = ₹6,000."},
 {subject:"cost",name:"Cost Accounting",q:"Contribution is calculated as:",options:["Sales − Fixed Cost","Sales − Variable Cost","Profit − Sales","Fixed Cost − Variable Cost"],answer:1,explanation:"Contribution = Sales − Variable costs. It contributes toward fixed costs and then profit."},
 {subject:"tax",name:"Taxation & GST",q:"Input Tax Credit (ITC), in general, refers to:",options:["Tax collected from customers only","Eligible credit for tax paid on business inputs","A penalty paid for late filing","A deduction from sales quantity"],answer:1,explanation:"ITC allows eligible registered businesses to claim credit for qualifying tax paid on inputs, subject to applicable law and conditions."},
 {subject:"tax",name:"Taxation & GST",q:"GST is commonly described as a tax on:",options:["Supply of goods or services, subject to law","Only employee salaries","Only cash withdrawals","Only company capital"],answer:0,explanation:"GST is a tax on supplies of goods or services, subject to the relevant statutory rules."},
 {subject:"audit",name:"Auditing & Assurance",q:"Which of these is an example of audit evidence?",options:["An unsupported guess","A verified bank confirmation","A rumour","A personal preference"],answer:1,explanation:"A bank confirmation can provide relevant, reliable evidence about a bank balance."},
 {subject:"audit",name:"Auditing & Assurance",q:"The primary purpose of internal controls includes:",options:["Guaranteeing that fraud never occurs","Supporting reliable reporting and safeguarding assets","Replacing all accounting records","Removing the need for an audit"],answer:1,explanation:"Internal controls help support reliable reporting, efficient operations and safeguarding of assets; they cannot guarantee that all fraud is prevented."},
 {subject:"law",name:"Business Law & Ethics",q:"In a valid contract, consideration generally refers to:",options:["Something of value exchanged between parties","Only a written signature","A company's annual report","A tax return"],answer:0,explanation:"Consideration is generally something of value given or promised in exchange, subject to legal rules and exceptions."},
 {subject:"law",name:"Business Law & Ethics",q:"Which action best reflects ethical business conduct?",options:["Hiding a material defect","Misleading customers to increase sales","Giving accurate information to customers","Changing records to conceal an error"],answer:2,explanation:"Truthful and accurate communication supports fair dealing and trust."},
 {subject:"excel",name:"Excel & MIS",q:"Which Excel function adds values that meet one condition?",options:["SUMIF","LEFT","NOW","ROUNDUP"],answer:0,explanation:"SUMIF adds values that satisfy one specified criterion. SUMIFS supports multiple criteria."},
 {subject:"excel",name:"Excel & MIS",q:"Which Excel feature is especially useful for summarising large tables by category?",options:["WordArt","PivotTable","Page colour","Spell Check"],answer:1,explanation:"PivotTables summarise and analyse data by categories, totals, counts and other aggregations."}
];
const labels=["A","B","C","D"];
const state={subject:"all",questions:[],index:0,answers:{}};
const $=id=>document.getElementById(id);
function chooseQuestions(){state.subject=$("quizSubject").value;state.questions=quizBank.filter(q=>state.subject==="all"||q.subject===state.subject);state.index=0;state.answers={};renderQuestion();updateScore();}
function renderQuestion(){
 const q=state.questions[state.index];
 if(!q){$("quizQuestion").innerHTML="<h3>No questions found for this subject yet.</h3>";$("quizOptions").innerHTML="";$("quizFeedback").hidden=true;return;}
 $("quizCounter").textContent=`Question ${state.index+1} of ${state.questions.length} · ${q.name}`;
 $("quizQuestion").innerHTML=`<h3>${escapeHtml(q.q)}</h3>`;
 $("quizOptions").innerHTML="";
 q.options.forEach((option,i)=>{
  const b=document.createElement("button");b.type="button";b.className="quiz-option";
  const selected=state.answers[state.index];
  if(selected!==undefined){b.disabled=true;if(i===q.answer)b.classList.add("correct");else if(i===selected)b.classList.add("wrong");}
  const letter=document.createElement("span");letter.className="option-letter";letter.textContent=labels[i];
  const txt=document.createElement("span");txt.textContent=option;b.append(letter,txt);b.addEventListener("click",()=>answerQuestion(i));$("quizOptions").appendChild(b);
 });
 const feedback=$("quizFeedback"),chosen=state.answers[state.index];
 if(chosen!==undefined){feedback.hidden=false;feedback.className="quiz-feedback "+(chosen===q.answer?"good":"bad");feedback.innerHTML=`<strong>${chosen===q.answer?"✓ Correct!":"✗ Not quite. Correct answer: "+labels[q.answer]+"."}</strong><br>${escapeHtml(q.explanation)}`;}
 else{feedback.hidden=true;feedback.className="quiz-feedback";feedback.textContent="";}
 $("prevQuestion").disabled=state.index===0;$("prevQuestion").style.opacity=state.index===0?".45":"1";
 $("nextQuestion").textContent=state.index===state.questions.length-1?"Finish quiz ✓":"Next question →";
}
function answerQuestion(i){if(state.answers[state.index]!==undefined)return;state.answers[state.index]=i;renderQuestion();updateScore();}
function updateScore(){
 const total=state.questions.length,answered=Object.keys(state.answers).length,score=state.questions.reduce((sum,q,i)=>sum+(state.answers[i]===q.answer?1:0),0);
 $("scoreValue").textContent=`${score} / ${answered}`;$("answeredValue").textContent=answered?`${answered} answered · ${total} questions in this set`:"Answer a question to begin.";
 $("scoreBar").style.width=(answered?score/answered*100:0)+"%";
}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
$("quizSubject").addEventListener("change",chooseQuestions);
$("nextQuestion").addEventListener("click",()=>{if(state.index<state.questions.length-1){state.index++;renderQuestion();}else{const answered=Object.keys(state.answers).length,total=state.questions.length,score=state.questions.reduce((s,q,i)=>s+(state.answers[i]===q.answer?1:0),0);$("quizFeedback").hidden=false;$("quizFeedback").className="quiz-feedback good";$("quizFeedback").innerHTML=`<strong>Quiz review: ${score} correct out of ${answered} answered.</strong><br>You can review each answer or restart the set.`;$("quizFeedback").scrollIntoView({behavior:"smooth",block:"nearest"});}});
$("prevQuestion").addEventListener("click",()=>{if(state.index>0){state.index--;renderQuestion();}});
$("resetQuiz").addEventListener("click",chooseQuestions);
document.querySelectorAll(".start-subject").forEach(b=>b.addEventListener("click",()=>{$("quizSubject").value=b.dataset.subject;chooseQuestions();location.hash="#practice";}));
$("subjectSearch").addEventListener("input",e=>{const term=e.target.value.trim().toLowerCase();let visible=0;document.querySelectorAll(".subject-card").forEach(card=>{const show=(card.dataset.search+" "+card.textContent).toLowerCase().includes(term);card.hidden=!show;if(show)visible++;});$("noSubjects").hidden=visible!==0;});
$("clearSearch").addEventListener("click",()=>{$("subjectSearch").value="";$("subjectSearch").dispatchEvent(new Event("input"));$("subjectSearch").focus();});
$("menuToggle").addEventListener("click",()=>{const nav=$("primaryNav"),open=nav.classList.toggle("open");$("menuToggle").setAttribute("aria-expanded",String(open));});
document.querySelectorAll("#primaryNav a").forEach(a=>a.addEventListener("click",()=>{$("primaryNav").classList.remove("open");$("menuToggle").setAttribute("aria-expanded","false");}));
$("year").textContent=new Date().getFullYear();
chooseQuestions();
