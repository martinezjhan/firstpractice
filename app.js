const state={xp:0,done:{}};const $=s=>document.querySelector(s);const $$=s=>[...document.querySelectorAll(s)];
function openTab(id){$$(".tab").forEach(x=>x.classList.remove("active"));$("#"+id).classList.add("active");$$(".nav-item").forEach(x=>x.classList.toggle("active",x.dataset.tab===id));window.scrollTo({top:0,behavior:"smooth"});}
$$(".nav-item").forEach(b=>b.addEventListener("click",()=>openTab(b.dataset.tab)));
$$("[data-go]").forEach(b=>b.addEventListener("click",()=>openTab(b.dataset.go)));
function award(skill,amount=10){if(state.done[skill])return;state.done[skill]=true;state.xp+=amount;$("#xp").textContent=state.xp;$("#status").textContent=`+${amount} XP · ${skill} completed`;setTimeout(()=>$("#status").textContent="Ready",1800);}
const matchWords=["classmate","teacher","schoolbag","happy"];const matchGrid=$("#matchGrid");
matchWords.forEach((w,i)=>{const b=document.createElement("button");b.className="match-card";b.textContent=w;b.dataset.ok=i===0?"classmate":i===1?"teacher":i===2?"schoolbag":"happy";b.onclick=()=>b.classList.toggle("selected");matchGrid.appendChild(b)});
$("#checkMatch").onclick=()=>{const selected=$$(".match-card.selected").length;if(selected>=2){award("vocabulary");$("#matchFeedback").textContent="Good! You practiced source vocabulary. Replace these cards with the exact Quizlet terms when you finalize the unit."}else $("#matchFeedback").textContent="Choose at least two words and check again.";};

const readingData={
healthy:[
["What is Daniel's favorite subject?","Math and science"],
["Where does he play soccer?","At the playground"],
["How often does he go to the gym?","Twice a week"],
["What does he do to eat healthily?","He eats fruits and vegetables and drinks water."],
["What does a healthy lifestyle help him to do?","Be happy, learn better and achieve his dreams."]
],
special:[
["Where is Emma?","In the classroom"],
["What does she put on the desk?","Her schoolbag"],
["Where do they go after class?","To the library"],
["What does Emma eat for lunch?","An apple"],
["How does Emma feel at the end?","Happy"]
]};
let activeReading="healthy";
$$(".readBtn").forEach(b=>b.onclick=()=>{activeReading=b.dataset.reading;const title=activeReading==="healthy"?"A Healthy Lifestyle":"A Special Day";$("#readingTitle").textContent=title+" · Comprehension";$("#readingQuestions").innerHTML=readingData[activeReading].map((q,i)=>`<div class="question"><b>${i+1}. ${q[0]}</b><label><input name="rq${i}" value="${q[1]}"> <span>My answer</span></label><small>Tip: ${q[1]}</small></div>`).join("");$("#readingActivity").classList.remove("hidden");$("#readingActivity").scrollIntoView({behavior:"smooth"})});
$("#checkReading").onclick=()=>{let good=0;readingData[activeReading].forEach((q,i)=>{const v=$(`input[name="rq${i}"]`)?.value.trim().toLowerCase();if(v&&v===q[1].toLowerCase())good++});$("#readingFeedback").textContent=`You matched ${good}/${readingData[activeReading].length} model answers. You can replace this with a richer question engine later.`;if(good>=3)award("reading",10);};
$$(".complete").forEach(b=>b.onclick=()=>award(b.dataset.skill,10));
$$(".practice").forEach(b=>b.onclick=()=>{b.textContent="✓ Practiced";b.disabled=true;award("speaking",5)});
$("#levelSelect").onchange=e=>{$("#status").textContent=`Selected ${e.target.options[e.target.selectedIndex].text}`};
