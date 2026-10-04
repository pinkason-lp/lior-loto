const numbersEl=document.querySelector("#numbers");
const counterEl=document.querySelector("#counter");
const selectionEl=document.querySelector("#selection");
const clearBtn=document.querySelector("#clearBtn");
const checkBtn=document.querySelector("#checkBtn");
const messageEl=document.querySelector("#message");
const selected=new Set();

for(let n=1;n<=37;n++){
  const btn=document.createElement("button");
  btn.className="number";
  btn.type="button";
  btn.textContent=n;
  btn.setAttribute("aria-label",`מספר ${n}`);
  btn.addEventListener("click",()=>toggleNumber(n,btn));
  numbersEl.appendChild(btn);
}

function toggleNumber(n,btn){
  messageEl.textContent="";
  if(selected.has(n)){selected.delete(n);btn.classList.remove("selected");}
  else if(selected.size<6){selected.add(n);btn.classList.add("selected");}
  else{messageEl.textContent="אפשר לבחור עד 6 מספרים.";return;}
  render();
}

function render(){
  const values=[...selected].sort((a,b)=>a-b);
  counterEl.textContent=`${values.length} / 6`;
  selectionEl.textContent=values.length?values.join("  •  "):"עדיין לא נבחרו מספרים";
  clearBtn.disabled=values.length===0;
  checkBtn.disabled=values.length!==6;
}

clearBtn.addEventListener("click",()=>{
  selected.clear();
  document.querySelectorAll(".number.selected").forEach(el=>el.classList.remove("selected"));
  messageEl.textContent="";
  render();
});

checkBtn.addEventListener("click",()=>{
  messageEl.textContent="הבחירה מוכנה. בשלב הבא נחבר אותה למנוע הניתוח ההיסטורי.";
});

render();