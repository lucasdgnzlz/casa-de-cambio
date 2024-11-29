import { obtenerData } from "./exchange.js";

import { gestionarInicioUI, gestionarAgregarDivisa } from "./ui.js";

import { realizarConversion } from "./conversion.js";

import { gestionarUltimosCambiosDivisas } from "./cambios.js";

async function iniciarPagina() {
  gestionarInicioUI(await obtenerData());
}
iniciarPagina();

const $botonConvertirDivisa = document.querySelector(".boton-convertir");
$botonConvertirDivisa.addEventListener("click", realizarConversion);

const $botonComprobarUltimosCambios = document.querySelector(".boton-comprobar-cambios");
$botonComprobarUltimosCambios.addEventListener("click", gestionarUltimosCambiosDivisas);

const $botonAgregarDivisa = document.querySelector(".boton-agregar-divisa");
$botonAgregarDivisa.addEventListener("click", gestionarAgregarDivisa);
