const formulario = document.getElementById("formulario-reserva");
const gracias = document.getElementById("reserva-gracias");
const error = document.getElementById("reserva-error");

// Formspree recibe el envío y lo reenvía al correo del negocio.
// Hay que sustituir TU_ID_DE_FORMSPREE en el atributo action del formulario por el identificador real.
async function enviarReserva(datos) {
  if (formulario.action.includes("TU_ID_DE_FORMSPREE")) throw new Error("Falta el identificador de Formspree");
  const respuesta = await fetch(formulario.action, {
    method: "POST",
    headers: { Accept: "application/json" },
    body: datos,
  });
  if (!respuesta.ok) throw new Error("No se pudo enviar");
}

formulario.addEventListener("submit", async (evento) => {
  evento.preventDefault();

  // Los errores solo se pintan a partir del primer intento de envío.
  formulario.classList.add("formulario--revisado");
  if (!formulario.checkValidity()) {
    formulario.querySelector(":invalid").focus();
    return;
  }

  const boton = formulario.querySelector('[type="submit"]');
  boton.disabled = true;
  error.hidden = true;

  try {
    await enviarReserva(new FormData(formulario));
  } catch {
    boton.disabled = false;
    error.hidden = false;
    return;
  }

  formulario.hidden = true;
  gracias.hidden = false;
  gracias.focus();
});
