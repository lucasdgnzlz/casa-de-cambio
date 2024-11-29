import { validarMontoUsuario } from "./validaciones.js";
import { mostrarErrorValidadcion, dejarDeMostrarError } from "./ui.js";
import { obtenerData } from "./exchange.js";

export async function realizarConversion() {
  const montoAConvertir = document.querySelector(".plata-usuario").value;
  const monedaUsuario = document.querySelector(".moneda-usuario").value;
  const monedaACambiar = document.querySelector(".moneda-a-cambiar").value;

  let error = validarMontoUsuario(montoAConvertir);

  if (error != "") {
    mostrarErrorValidadcion(validarMontoUsuario(montoAConvertir));
  } else {
    dejarDeMostrarError();
    try {
      const data = await obtenerData(monedaUsuario);
      gestionarConversion(data.conversion_rates, montoAConvertir, monedaUsuario, monedaACambiar);
    } catch (error) {
      console.error("Error al obtener los datos de la API:", error);
    }
  }
}

function gestionarConversion(dataMonedaElegida, montoAConvertir, monedaUsuario, monedaACambiar) {
  const resultadoConversion = hacerCambioMoneda(dataMonedaElegida, montoAConvertir, monedaACambiar);
  resultadoConversion.toLocaleString("es-ES");
  mostrarResultado(resultadoConversion, dataMonedaElegida, montoAConvertir, monedaUsuario, monedaACambiar);
}

function hacerCambioMoneda(dataMonedaElegida, montoAConvertir, monedaACambiar) {
  const monedaUsuario = Number(montoAConvertir);
  let resultadoCambio = monedaUsuario * dataMonedaElegida[monedaACambiar];
  return resultadoCambio;
}

function mostrarResultado(resultadoConversion, dataMonedaElegida, montoAConvertir, monedaUsuario, monedaACambiar) {
  const $respuestaConversion = document.querySelector(".respuesta-conversion");
  $respuestaConversion.textContent = `${montoAConvertir} ${monedaUsuario} convertidos a ${monedaACambiar} = ${resultadoConversion}`;

  const $respuestaValorDivisaUsuario = document.querySelector(".respuesta-valor-divisa-usuario");
  $respuestaValorDivisaUsuario.textContent = `1 ${monedaUsuario} = ${dataMonedaElegida[monedaACambiar]} ${monedaACambiar}`;
}
