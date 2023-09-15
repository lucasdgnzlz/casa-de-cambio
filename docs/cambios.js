import { mostrarPrincipalesDivisas, actualizarValoresLista } from "./ui.js";
import { obtenerData } from "./exchange.js";

export async function gestionarUltimosCambiosDivisas() {
  const $selectorDivisaUltimosCambios = document.querySelector(".moneda-base-cambio");
  let divisaElegida = $selectorDivisaUltimosCambios.value;
  const $divisasEnTabla = document.querySelectorAll(".principales-divisas");
  const cantidadDivisasEnTabla = $divisasEnTabla.length;

  let listaNombresDivisasEnTabla = [];

  $divisasEnTabla.forEach((divisa) => {
    listaNombresDivisasEnTabla.push(divisa.textContent);
  });

  const data = await obtenerData(divisaElegida);

  if (cantidadDivisasEnTabla === 5) {
    mostrarPrincipalesDivisas(data);
  } else {
    actualizarValoresLista(data, listaNombresDivisasEnTabla);
  }
}
