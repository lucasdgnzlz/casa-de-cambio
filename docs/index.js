// SECCIÓN CREAR LISTAS DE LAS DIVISAS
let fechaActualizacionValores;

function crearListaDivisas(data) {
  const $selectoresDeDivisas = document.querySelectorAll(".lista-monedas-selectores");
  const cantidadDeDivisas = Object.keys(data.rates);

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

fetch("https://api.exchangerate.host/latest")
  .then((respuesta) => respuesta.json())
  .then((data) => {
    listaDivisas = data.rates;
    crearListaDivisas(data);
    mostrarPrincipalesDivisas(data);
    fechaActualizacionValores = data.date;
  });

// SECCIÓN CONVERSIÓN

const $botonConvertirDivisa = document.querySelector(".boton-convertir");

let listaDivisas;
let resultadoConversion;

function hacerCambioMoneda(montoAConvertir, monedaACambiar) {
  const monedaUsuario = Number(montoAConvertir);
  let resultadoCambio = monedaUsuario * listaDivisas[monedaACambiar];
  resultadoConversion = resultadoCambio.toLocaleString("es-ES");
}

function mostrarResultado(montoAConvertir, monedaUsuario, monedaACambiar) {
  const $respuestaConversion = document.querySelector(".respuesta-conversion");
  $respuestaConversion.textContent = `${montoAConvertir} ${monedaUsuario} convertidos a ${monedaACambiar} = ${resultadoConversion}`;

  const $respuestaValorDivisaUsuario = document.querySelector(".respuesta-valor-divisa-usuario");
  $respuestaValorDivisaUsuario.textContent = `1 ${monedaUsuario} = ${listaDivisas[monedaACambiar]} ${monedaACambiar}`;
}

function mostrarErrorValidadcion(error) {
  const $inputMontoUsuario = document.querySelector(".plata-usuario");
  $inputMontoUsuario.classList.add("is-invalid");
  const $contenedorTextoError = document.querySelector(".contenedor-texto-error");
  $contenedorTextoError.innerText = error;
}

function dejarDeMostrarError() {
  const $inputMontoUsuario = document.querySelector(".plata-usuario");
  $inputMontoUsuario.classList.remove("is-invalid");
  const $contenedorTextoError = document.querySelector(".contenedor-texto-error");
  $contenedorTextoError.innerText = "";
}

function gestionarConversion(montoAConvertir, monedaUsuario, monedaACambiar) {
  fetch(`https://api.exchangerate.host/latest?base=${monedaUsuario}`)
    .then((respuesta) => respuesta.json())
    .then((data) => {
      listaDivisas = data.rates;
      hacerCambioMoneda(montoAConvertir, monedaACambiar);
      mostrarResultado(montoAConvertir, monedaUsuario, monedaACambiar);
    });
}

$botonConvertirDivisa.addEventListener("click", () => {
  const montoAConvertir = document.querySelector(".plata-usuario").value;
  const monedaUsuario = document.querySelector(".moneda-usuario").value;
  const monedaACambiar = document.querySelector(".moneda-a-cambiar").value;

  let error = validarMontoUsuario(montoAConvertir);

  if (error != "") {
    mostrarErrorValidadcion(validarMontoUsuario(montoAConvertir));
  } else {
    dejarDeMostrarError();
    gestionarConversion(montoAConvertir, monedaUsuario, monedaACambiar);
  }
});

// SECCIÓN CAMBIOS DE VALORES

function mostrarPrincipalesDivisas(data) {
  let listaNombresDivisas = Object.keys(data.rates);

  const $nombreDivisas = document.querySelectorAll(".principales-divisas");
  const $valorDivisas = document.querySelectorAll(".valor-divisa");
  const $fechaDeCambio = document.querySelectorAll(".fecha-cambio");

  $nombreDivisas.forEach((divisa, index) => {
    if (index === 0) {
      divisa.textContent = listaNombresDivisas[6];
      $valorDivisas[index].textContent = listaDivisas[listaNombresDivisas[6]].toLocaleString("es-ES").substring(0, 6);
      $fechaDeCambio[index].textContent = data.date;
    } else if (index === 1) {
      divisa.textContent = listaNombresDivisas[100];
      $valorDivisas[index].textContent = listaDivisas[listaNombresDivisas[100]].toLocaleString("es-ES").substring(0, 6);
      $fechaDeCambio[index].textContent = data.date;
    } else if (index === 2) {
      divisa.textContent = listaNombresDivisas[26];
      $valorDivisas[index].textContent = listaDivisas[listaNombresDivisas[26]].toLocaleString("es-ES").substring(0, 6);
      $fechaDeCambio[index].textContent = data.date;
    } else if (index === 3) {
      divisa.textContent = listaNombresDivisas[73];
      $valorDivisas[index].textContent = listaDivisas[listaNombresDivisas[73]].toLocaleString("es-ES").substring(0, 6);
      $fechaDeCambio[index].textContent = data.date;
    } else if (index === 4) {
      divisa.textContent = listaNombresDivisas[49];
      $valorDivisas[index].textContent = listaDivisas[listaNombresDivisas[49]].toLocaleString("es-ES").substring(0, 6);
      $fechaDeCambio[index].textContent = data.date;
    }
  });
}

const $selectorDivisaUltimosCambios = document.querySelector(".moneda-base-cambio");
const $botonComprobarUltimosCambios = document.querySelector(".boton-comprobar-cambios");

const $botonAgregarDivisa = document.querySelector(".boton-agregar-divisa");
let nuevoBotonAgregarDivisa;

function eliminarFilaAgregarDivisa() {
  const $filaAgregarDivisa = document.querySelector(".ultima-fila");
  $filaAgregarDivisa.remove();
}

function agregarDivisaElegidaALista(divisaParaAgregar) {
  const $tablaUltimosCambios = document.querySelector(".tablero");

  const nuevaFila = document.createElement("tr");
  nuevaFila.className = "fila";

  const nuevaColumnaNombreDivisa = document.createElement("td");
  nuevaColumnaNombreDivisa.className = "columna principales-divisas";
  nuevaColumnaNombreDivisa.textContent = divisaParaAgregar;

  const nuevaColumnaValorDivisa = document.createElement("td");
  nuevaColumnaValorDivisa.className = "columna valor-divisa";
  nuevaColumnaValorDivisa.textContent = listaDivisas[divisaParaAgregar].toLocaleString("es-ES").substring(0, 6);

  const nuevaColumnaFechaUltimoCambio = document.createElement("td");
  nuevaColumnaFechaUltimoCambio.className = "columna fecha-cambio";
  nuevaColumnaFechaUltimoCambio.textContent = fechaActualizacionValores;

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

function agregarDivisasASelectorUltimaFila() {
  const $selectorDivisaUltimosCambios = document.querySelector(".divisa-para-agregar");
  const nombresDivisas = Object.keys(listaDivisas);

  nombresDivisas.forEach((divisa) => {
    const nuevaOpcionDeDivisa = document.createElement("option");
    nuevaOpcionDeDivisa.textContent = divisa;

    $selectorDivisaUltimosCambios.appendChild(nuevaOpcionDeDivisa);
  });
}

function actualizarValoresLista(data, listaNombresDivisasEnTabla) {
  const $valoresDivisasEnLista = document.querySelectorAll(".valor-divisa");

  $valoresDivisasEnLista.forEach((valorDivisa, i) => {
    valorDivisa.textContent = data.rates[listaNombresDivisasEnTabla[i]].toLocaleString("es-ES").substring(0, 6);
  });
}

$botonComprobarUltimosCambios.addEventListener("click", () => {
  let divisaElegida = $selectorDivisaUltimosCambios.value;
  const cantidadDivisasEnTabla = document.querySelectorAll(".principales-divisas").length;
  const $divisasEnTabla = document.querySelectorAll(".principales-divisas");
  let listaNombresDivisasEnTabla = [];

  $divisasEnTabla.forEach((divisaEnTabla) => {
    listaNombresDivisasEnTabla.push(divisaEnTabla.textContent);
  });

  fetch(`https://api.exchangerate.host/latest?base=${divisaElegida}`)
    .then((respuesta) => respuesta.json())
    .then((data) => {
      listaDivisas = data.rates;

      if (cantidadDivisasEnTabla === 5) {
        mostrarPrincipalesDivisas(data);
      } else {
        actualizarValoresLista(data, listaNombresDivisasEnTabla);
      }
    });
});

function manejarEventoAgregarDivisa() {
  const divisaParaAgregar = document.querySelector(".divisa-para-agregar").value;
  eliminarFilaAgregarDivisa();
  agregarDivisaElegidaALista(divisaParaAgregar);
  crearNuevaUltimaFila();
  agregarDivisasASelectorUltimaFila();

  const $nuevoBotonAgregarDivisa = document.querySelector(".nuevo-boton-agregar-divisa");
  $nuevoBotonAgregarDivisa.addEventListener("click", manejarEventoAgregarDivisa);
}

$botonAgregarDivisa.addEventListener("click", () => {
  const divisaParaAgregar = document.querySelector(".divisa-para-agregar").value;
  eliminarFilaAgregarDivisa();
  agregarDivisaElegidaALista(divisaParaAgregar);
  crearNuevaUltimaFila();
  agregarDivisasASelectorUltimaFila();

  const $nuevoBotonAgregarDivisa = document.querySelector(".nuevo-boton-agregar-divisa");
  $nuevoBotonAgregarDivisa.addEventListener("click", manejarEventoAgregarDivisa);
});
