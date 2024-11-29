import { obtenerData } from "./exchange.js";
import { filtrarPrincipalesDivisas } from "./utilidades.js";

export function gestionarInicioUI(data) {
  crearListaDivisas(data.conversion_rates);
  mostrarPrincipalesDivisas(data);
  dejarDeMostrarPantallaCarga();
  mostrarPaginaPrincipal();
}

function dejarDeMostrarPantallaCarga() {
  const $pantallaDeCarga = document.querySelector(".pantalla-carga");
  $pantallaDeCarga.id = "oculto";
}

function mostrarPaginaPrincipal() {
  const $elementosPrincipalesOcultos = document.querySelectorAll(".oculto");

  $elementosPrincipalesOcultos.forEach(($elementoOculto) => {
    $elementoOculto.classList.remove("oculto");
  });
}

function crearListaDivisas(dataDivisas) {
  const $selectoresDeDivisas = document.querySelectorAll(".lista-monedas-selectores");
  const cantidadDeDivisas = Object.keys(dataDivisas);

  $selectoresDeDivisas.forEach((nodo, i) => {
    cantidadDeDivisas.forEach((divisa) => {
      if (divisa === "ARS" && i === 0) {
        const nuevaOpcionDeDivisa = document.createElement("option");
        nuevaOpcionDeDivisa.innerText = divisa;
        nuevaOpcionDeDivisa.selected = true;
        nodo.appendChild(nuevaOpcionDeDivisa);
      } else if (divisa === "USD" && i === 1) {
        const nuevaOpcionDeDivisa = document.createElement("option");
        nuevaOpcionDeDivisa.innerText = divisa;
        nuevaOpcionDeDivisa.selected = true;
        nodo.appendChild(nuevaOpcionDeDivisa);
      } else {
        const nuevaOpcionDeDivisa = document.createElement("option");
        nuevaOpcionDeDivisa.innerText = divisa;
        nodo.appendChild(nuevaOpcionDeDivisa);
      }
    });
  });
}

export function mostrarPrincipalesDivisas(dataDivisas) {
  let divisas = dataDivisas.conversion_rates;
  let listaNombresDivisas = Object.keys(dataDivisas.conversion_rates);

  const principalesDivisas = filtrarPrincipalesDivisas(divisas, listaNombresDivisas);

  const $nombreDivisas = document.querySelectorAll(".principales-divisas");
  const $valorDivisas = document.querySelectorAll(".valor-divisa");
  const $fechaDeCambio = document.querySelectorAll(".fecha-cambio");

  $nombreDivisas.forEach((divisa, index) => {
    if (index === 0) {
      divisa.textContent = principalesDivisas["ars"]["nombre"];
      $valorDivisas[index].textContent = principalesDivisas.ars["valor"].toLocaleString("es-ES").substring(0, 6);
      $fechaDeCambio[index].textContent = dataDivisas.date;
    } else if (index === 1) {
      divisa.textContent = principalesDivisas.brl["nombre"];
      $valorDivisas[index].textContent = principalesDivisas.brl["valor"].toLocaleString("es-ES").substring(0, 6);
      $fechaDeCambio[index].textContent = dataDivisas.date;
    } else if (index === 2) {
      divisa.textContent = principalesDivisas.cad["nombre"];
      $valorDivisas[index].textContent = principalesDivisas.cad["valor"].toLocaleString("es-ES").substring(0, 6);
      $fechaDeCambio[index].textContent = dataDivisas.date;
    } else if (index === 3) {
      divisa.textContent = principalesDivisas.eur["nombre"];
      $valorDivisas[index].textContent = principalesDivisas.eur["valor"].toLocaleString("es-ES").substring(0, 6);
      $fechaDeCambio[index].textContent = dataDivisas.date;
    } else if (index === 4) {
      divisa.textContent = principalesDivisas.gbp["nombre"];
      $valorDivisas[index].textContent = principalesDivisas.gbp["valor"].toLocaleString("es-ES").substring(0, 6);
      $fechaDeCambio[index].textContent = dataDivisas.date;
    }
  });
}

export function mostrarErrorValidadcion(error) {
  const $inputMontoUsuario = document.querySelector(".plata-usuario");
  $inputMontoUsuario.classList.add("is-invalid");
  const $contenedorTextoError = document.querySelector(".contenedor-texto-error");
  $contenedorTextoError.innerText = error;
}

export function dejarDeMostrarError() {
  const $inputMontoUsuario = document.querySelector(".plata-usuario");
  $inputMontoUsuario.classList.remove("is-invalid");
  const $contenedorTextoError = document.querySelector(".contenedor-texto-error");
  $contenedorTextoError.innerText = "";
}

export function actualizarValoresLista(data, listaNombresDivisasEnTabla) {
  const $valoresDivisasEnLista = document.querySelectorAll(".valor-divisa");

  $valoresDivisasEnLista.forEach((valorDivisa, i) => {
    valorDivisa.textContent = data.conversion_rates[listaNombresDivisasEnTabla[i]].toLocaleString("es-ES").substring(0, 6);
  });
}

function eliminarFilaAgregarDivisa() {
  const $filaAgregarDivisa = document.querySelector(".ultima-fila");
  $filaAgregarDivisa.remove();
}

function agregarDivisaElegidaALista(divisaParaAgregar, data) {
  const $tablaUltimosCambios = document.querySelector(".tablero");

  const nuevaFila = document.createElement("tr");
  nuevaFila.className = "fila";

  const nuevaColumnaNombreDivisa = document.createElement("td");
  nuevaColumnaNombreDivisa.className = "columna principales-divisas";
  nuevaColumnaNombreDivisa.textContent = divisaParaAgregar;

  const nuevaColumnaValorDivisa = document.createElement("td");
  nuevaColumnaValorDivisa.className = "columna valor-divisa";
  nuevaColumnaValorDivisa.textContent = data.conversion_rates[divisaParaAgregar].toLocaleString("es-ES").substring(0, 6);

  const nuevaColumnaFechaUltimoCambio = document.createElement("td");
  nuevaColumnaFechaUltimoCambio.className = "columna fecha-cambio";
  nuevaColumnaFechaUltimoCambio.textContent = data.date;

  nuevaFila.appendChild(nuevaColumnaNombreDivisa);
  nuevaFila.appendChild(nuevaColumnaValorDivisa);
  nuevaFila.appendChild(nuevaColumnaFechaUltimoCambio);
  $tablaUltimosCambios.appendChild(nuevaFila);
}

function crearNuevaUltimaFila() {
  const $tablaUltimosCambios = document.querySelector(".tablero");

  const nuevaUltimaFila = document.createElement("tr");
  nuevaUltimaFila.className = "fila ultima-fila";

  const nuevaColumnaSelectorDivisa = document.createElement("td");
  nuevaColumnaSelectorDivisa.className = "columna columna-agregar-divisa";
  const nuevoSelectorDivisa = document.createElement("select");
  nuevoSelectorDivisa.className = "form-select form-select-sm lista-monedas-selectores divisa-para-agregar";

  const nuevaColumnaBotonElegirDivisa = document.createElement("td");
  nuevaColumnaBotonElegirDivisa.className = "columna columna-boton-agregar-divisa";
  const nuevoBotonElegirDivisa = document.createElement("button");
  nuevoBotonElegirDivisa.className = "btn btn-secondary boton-agregar-divisa nuevo-boton-agregar-divisa";
  nuevoBotonElegirDivisa.textContent = "Agregar";

  const nuevaColumnaUltimaFila = document.createElement("td");
  nuevaColumnaUltimaFila.className = "columna fecha-cambio";
  nuevaColumnaUltimaFila.textContent = "-";

  nuevaColumnaSelectorDivisa.appendChild(nuevoSelectorDivisa);
  nuevaColumnaBotonElegirDivisa.appendChild(nuevoBotonElegirDivisa);
  nuevaUltimaFila.appendChild(nuevaColumnaSelectorDivisa);
  nuevaUltimaFila.appendChild(nuevaColumnaBotonElegirDivisa);
  nuevaUltimaFila.appendChild(nuevaColumnaUltimaFila);
  $tablaUltimosCambios.appendChild(nuevaUltimaFila);
}

function agregarDivisasASelectorUltimaFila(data) {
  const $selectorDivisaUltimosCambios = document.querySelector(".divisa-para-agregar");
  const nombresDivisas = Object.keys(data.conversion_rates);

  nombresDivisas.forEach((divisa) => {
    const nuevaOpcionDeDivisa = document.createElement("option");
    nuevaOpcionDeDivisa.textContent = divisa;

    $selectorDivisaUltimosCambios.appendChild(nuevaOpcionDeDivisa);
  });
}

export async function manejarEventoAgregarDivisa() {
  const divisaParaAgregar = document.querySelector(".divisa-para-agregar").value;
  const data = await obtenerData();
  eliminarFilaAgregarDivisa();
  agregarDivisaElegidaALista(divisaParaAgregar, data);
  crearNuevaUltimaFila();
  agregarDivisasASelectorUltimaFila(data);

  const $nuevoBotonAgregarDivisa = document.querySelector(".nuevo-boton-agregar-divisa");
  $nuevoBotonAgregarDivisa.addEventListener("click", manejarEventoAgregarDivisa);
}

export async function gestionarAgregarDivisa() {
  const divisaParaAgregar = document.querySelector(".divisa-para-agregar").value;
  const divisaElegida = document.querySelector(".moneda-base-cambio").value;
  const data = await obtenerData(divisaElegida);
  eliminarFilaAgregarDivisa();
  agregarDivisaElegidaALista(divisaParaAgregar, data);
  crearNuevaUltimaFila();
  agregarDivisasASelectorUltimaFila(data);

  const $nuevoBotonAgregarDivisa = document.querySelector(".nuevo-boton-agregar-divisa");
  $nuevoBotonAgregarDivisa.addEventListener("click", manejarEventoAgregarDivisa);
}
