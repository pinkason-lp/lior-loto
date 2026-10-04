const generateBtn=document.querySelector("#generateBtn");
const ticketEl=document.querySelector("#ticket");
const copyBtn=document.querySelector("#copyBtn");
const messageEl=document.querySelector("#message");
const ROWS=8;
let currentRows=[];

function randomUnique(count,max){
  const pool=Array.from({length:max},(_,i)=>i+1);
  for(let i=pool.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [pool[i],pool[j]]=[pool[j],pool[i]];
  }
  return pool.slice(0,count).sort((a,b)=>a-b);
}

function makeSet(){
  return Array.from({length:ROWS},()=>({
    numbers:randomUnique(6,37),
    strong:Math.floor(Math.random()*7)+1
  }));
}

function render(){
  ticketEl.innerHTML="";
  currentRows.forEach((row,index)=>{
    const el=document.createElement("article");
    el.className="row";
    const balls=row.numbers.map(n=>`<span class="ball">${n}</span>`).join("");
    el.innerHTML=`<span class="row-index">#${index+1}</span><div class="balls">${balls}</div><div class="strong"><span>חזק</span><span class="strong-ball">${row.strong}</span></div>`;
    ticketEl.appendChild(el);
  });
  copyBtn.hidden=false;
}

function asText(){
  return currentRows.map((row,i)=>`שורה ${i+1}: ${row.numbers.join(", ")} | חזק: ${row.strong}`).join("\n");
}

generateBtn.addEventListener("click",()=>{
  currentRows=makeSet();
  render();
  messageEl.textContent="סט חדש מוכן ✦";
});

copyBtn.addEventListener("click",async()=>{
  try{
    await navigator.clipboard.writeText(asText());
    messageEl.textContent="המספרים הועתקו";
  }catch{
    messageEl.textContent="לא הצלחתי להעתיק. נסה שוב.";
  }
});