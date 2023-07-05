function validarMontoUsuario(montoAConvertir) {
  const regex = /^[0-9]+$/i;

  if (!regex.test(montoAConvertir)) {
    return "El campo solo acepta números";
  } else{
    return "";
  }
}
