const botones = document.querySelectorAll(".galeria__filtro");
const mosaico = document.querySelector(".galeria__mosaico");
const fotos = mosaico.querySelectorAll("li");

botones.forEach((boton) => {
  boton.addEventListener("click", () => {
    const categoria = boton.dataset.categoria;
    const filtrado = categoria !== "todo";

    botones.forEach((b) => b.setAttribute("aria-pressed", String(b === boton)));
    mosaico.classList.toggle("galeria__mosaico--filtrado", filtrado);
    fotos.forEach((foto) => {
      foto.hidden = filtrado && foto.dataset.categoria !== categoria;
    });
  });
});
