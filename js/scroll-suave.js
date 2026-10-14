// Desplazamiento suave con curva propia para todos los enlaces internos (#…).
// El nativo de "scroll-behavior: smooth" es más brusco y no permite ajustar la duración.

const cabecera = document.querySelector(".cabecera");
const sinAnimacion = window.matchMedia("(prefers-reduced-motion: reduce)");

const suavizado = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

// Más distancia, más duración, pero acotada para que nunca se haga lenta.
const duracionPara = (distancia) => Math.min(1400, Math.max(600, Math.abs(distancia) * 0.18));

function desplazarA(destino) {
  const inicio = window.scrollY;
  const final = destino.getBoundingClientRect().top + inicio - cabecera.offsetHeight;
  const distancia = final - inicio;

  if (sinAnimacion.matches || Math.abs(distancia) < 2) {
    window.scrollTo(0, final);
    return;
  }

  const duracion = duracionPara(distancia);
  let comienzo = null;

  function paso(ahora) {
    comienzo ??= ahora;
    const progreso = Math.min((ahora - comienzo) / duracion, 1);
    window.scrollTo(0, inicio + distancia * suavizado(progreso));
    if (progreso < 1) requestAnimationFrame(paso);
  }

  requestAnimationFrame(paso);
}

document.addEventListener("click", (evento) => {
  const enlace = evento.target.closest('a[href^="#"]');
  if (!enlace) return;

  const destino = document.getElementById(enlace.hash.slice(1));
  if (!destino) return;

  evento.preventDefault();
  history.pushState(null, "", enlace.hash);
  desplazarA(destino);
});
