export function gestionarInicioUI(data) {
  crearListaDivisas(data.rates);
  mostrarPrincipalesDivisas(data.rates);
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

function mostrarPrincipalesDivisas(dataDivisas) {
  let listaNombresDivisas = Object.keys(dataDivisas);

  const $nombreDivisas = document.querySelectorAll(".principales-divisas");
  const $valorDivisas = document.querySelectorAll(".valor-divisa");
  const $fechaDeCambio = document.querySelectorAll(".fecha-cambio");

  $nombreDivisas.forEach((divisa, index) => {
    if (index === 0) {
      divisa.textContent = listaNombresDivisas[6];
      $valorDivisas[index].textContent = dataDivisas[listaNombresDivisas[6]].toLocaleString("es-ES").substring(0, 6);
      $fechaDeCambio[index].textContent = dataDivisas.date;
    } else if (index === 1) {
      divisa.textContent = listaNombresDivisas[100];
      $valorDivisas[index].textContent = dataDivisas[listaNombresDivisas[100]].toLocaleString("es-ES").substring(0, 6);
      $fechaDeCambio[index].textContent = dataDivisas.date;
    } else if (index === 2) {
      divisa.textContent = listaNombresDivisas[26];
      $valorDivisas[index].textContent = dataDivisas[listaNombresDivisas[26]].toLocaleString("es-ES").substring(0, 6);
      $fechaDeCambio[index].textContent = dataDivisas.date;
    } else if (index === 3) {
      divisa.textContent = listaNombresDivisas[73];
      $valorDivisas[index].textContent = dataDivisas[listaNombresDivisas[73]].toLocaleString("es-ES").substring(0, 6);
      $fechaDeCambio[index].textContent = dataDivisas.date;
    } else if (index === 4) {
      divisa.textContent = listaNombresDivisas[49];
      $valorDivisas[index].textContent = dataDivisas[listaNombresDivisas[49]].toLocaleString("es-ES").substring(0, 6);
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
