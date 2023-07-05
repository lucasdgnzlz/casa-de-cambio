function probarValidacionMontoUsuario() {
  console.assert(
    validarMontoUsuario("...") === "El campo solo acepta números",
    "validarMontoUsuario con caracteres distintos a números no ha funcionado correctamente."
  );
}
probarValidacionMontoUsuario();
