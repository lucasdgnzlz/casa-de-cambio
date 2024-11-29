class PrincipalesDivisas {
  constructor(divisas, nombresDivisasElegidas) {
    this.ars = {nombre: nombresDivisasElegidas[0], valor: divisas[nombresDivisasElegidas[0]]};
    this.brl = {nombre: nombresDivisasElegidas[1], valor: divisas[nombresDivisasElegidas[1]]};
    this.cad = {nombre: nombresDivisasElegidas[2], valor: divisas[nombresDivisasElegidas[2]]};
    this.eur = {nombre: nombresDivisasElegidas[3], valor: divisas[nombresDivisasElegidas[3]]};
    this.gbp = {nombre: nombresDivisasElegidas[4], valor: divisas[nombresDivisasElegidas[4]]};
  }
}

export function filtrarPrincipalesDivisas(divisas, nombresDivisas) {
  const nombresDivisasElegidas = [];

  nombresDivisas.forEach(moneda => {
    if(moneda === "ARS" || moneda === "BRL" || moneda === "CAD" || moneda === "EUR" || moneda === "GBP") {
      nombresDivisasElegidas.push(moneda);
    }
  });

  const principalesCincoDivisas = new PrincipalesDivisas(divisas, nombresDivisasElegidas);
  return principalesCincoDivisas;
}
