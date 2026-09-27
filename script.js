// =====================================================
// O SEGREDO DAS VENDAS — CONFIGURAÇÃO
// =====================================================

// COLOQUE AQUI O LINK REAL DO SEU CHECKOUT.
const CHECKOUT_URL = "https://pay.sunize.com.br/pskzKLWP";


// =====================================================
// CONTADOR DE OFERTA
// =====================================================

const TIMER_KEY = "segredo_das_vendas_deadline_v1";
const DURATION = 15 * 60 * 1000;

function getDeadline() {
  const saved = localStorage.getItem(TIMER_KEY);

  if (saved && Number(saved) > Date.now()) {
    return Number(saved);
  }

  const newDeadline = Date.now() + DURATION;
  localStorage.setItem(TIMER_KEY, String(newDeadline));

  return newDeadline;
}

const deadline = getDeadline();

function formatTimer(ms) {
  const seconds = Math.max(0, Math.floor(ms / 1000));

  const minutes = String(
    Math.floor(seconds / 60)
  ).padStart(2, "0");

  const secs = String(
    seconds % 60
  ).padStart(2, "0");

  return `${minutes}:${secs}`;
}

function updateTimer() {
  const remaining = deadline - Date.now();

  const value =
    remaining > 0
      ? formatTimer(remaining)
      : "ENCERRADA";

  const top = document.getElementById("topTimer");
  const offer = document.getElementById("offerTimer");

  if (top) {
    top.textContent = value;
  }

  if (offer) {
    offer.textContent = value;
  }
}

updateTimer();

setInterval(updateTimer, 1000);


// =====================================================
// CHECKOUT
// =====================================================

document.querySelectorAll(".buy").forEach(button => {

  // Coloca o link do checkout no botão
  button.href = CHECKOUT_URL;

  button.addEventListener("click", event => {

    // Verifica se o link ainda é um placeholder
    if (
      !CHECKOUT_URL ||
      CHECKOUT_URL.includes("https://pay.sunize.com.br/pskzKLWP") ||
      CHECKOUT_URL.includes("https://pay.sunize.com.br/pskzKLWP")
    ) {

      event.preventDefault();

      alert(
        "Configure o link real do seu checkout no arquivo script.js."
      );

      return;
    }

    // Abre o checkout normalmente
    window.location.href = https://pay.sunize.com.br/pskzKLWP;

  });

});


// =====================================================
// ANIMAÇÃO AO ENTRAR NA TELA
// =====================================================

const elements = document.querySelectorAll(
  ".method-grid article, .proof-grid figure, .pain-grid div, .price-card"
);

elements.forEach(el => {

  el.style.opacity = "0";

  el.style.transform = "translateY(18px)";

  el.style.transition =
    "opacity .6s ease, transform .6s ease";

});


// Verifica se o navegador suporta IntersectionObserver
if ("IntersectionObserver" in window) {

  const observer = new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.style.opacity = "1";

          entry.target.style.transform =
            "translateY(0)";

          observer.unobserve(entry.target);

        }

      });

    },
    {
      threshold: 0.12
    }
  );

  elements.forEach(el => {
    observer.observe(el);
  });

} else {

  // Caso o navegador não suporte
  elements.forEach(el => {

    el.style.opacity = "1";

    el.style.transform = "translateY(0)";

  });

}


// =====================================================
// LINKS INTERNOS
// =====================================================

document
  .querySelectorAll('a[href="#oferta"]')
  .forEach(link => {

    link.addEventListener("click", event => {

      const target =
        document.querySelector("#oferta");

      if (target) {

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }

    });

  });