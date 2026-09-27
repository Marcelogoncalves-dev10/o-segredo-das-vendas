// =====================================================
// O SEGREDO DAS VENDAS — CONFIGURAÇÃO
// =====================================================

// COLOQUE AQUI O LINK REAL DO SEU CHECKOUT.
const CHECKOUT_URL = "https://SEU-CHECKOUT-AQUI.com";

// =====================================================
// CONTADOR DE OFERTA
// =====================================================
// O contador não reinicia automaticamente depois de expirar.
// Se quiser uma nova campanha, apague a chave abaixo do
// localStorage do navegador.
const TIMER_KEY = "segredo_das_vendas_deadline_v1";
const DURATION = 15 * 60 * 1000;

function getDeadline(){
  const saved = localStorage.getItem(TIMER_KEY);

  if(saved && Number(saved) > Date.now()){
    return Number(saved);
  }

  const newDeadline = Date.now() + DURATION;
  localStorage.setItem(TIMER_KEY, String(newDeadline));
  return newDeadline;
}

const deadline = getDeadline();

function formatTimer(ms){
  const seconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = String(Math.floor(seconds / 60)).padStart(2,"0");
  const secs = String(seconds % 60).padStart(2,"0");
  return `${minutes}:${secs}`;
}

function updateTimer(){
  const remaining = deadline - Date.now();
  const value = remaining > 0 ? formatTimer(remaining) : "ENCERRADA";

  const top = document.getElementById("topTimer");
  const offer = document.getElementById("offerTimer");

  if(top) top.textContent = value;
  if(offer) offer.textContent = value;
}

updateTimer();
setInterval(updateTimer,1000);

// =====================================================
// CHECKOUT
// =====================================================
document.querySelectorAll(".buy").forEach(button=>{
  button.href = CHECKOUT_URL;

  button.addEventListener("click",(event)=>{
    if(CHECKOUT_URL.includes("SEU-CHECKOUT")){
      event.preventDefault();
      alert("Abra o arquivo script.js e coloque o link real do seu checkout na variável CHECKOUT_URL.");
    }
  });
});

// =====================================================
// ANIMAÇÃO AO ENTRAR NA TELA
// =====================================================
const elements = document.querySelectorAll(
  ".method-grid article, .proof-grid figure, .pain-grid div, .price-card"
);

elements.forEach(el=>{
  el.style.opacity = "0";
  el.style.transform = "translateY(18px)";
  el.style.transition = "opacity .6s ease, transform .6s ease";
});

const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
      observer.unobserve(entry.target);
    }
  });
},{threshold:.12});

elements.forEach(el=>observer.observe(el));

// =====================================================
// LINKS INTERNOS
// =====================================================
document.querySelectorAll('a[href="#oferta"]').forEach(link=>{
  link.addEventListener("click",event=>{
    const target=document.querySelector("#oferta");

    if(target){
      event.preventDefault();
      target.scrollIntoView({
        behavior:"smooth",
        block:"start"
      });
    }
  });