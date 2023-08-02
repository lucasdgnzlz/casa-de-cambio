const URL = "http://192.168.1.41:8080/docs/";

context("Casa De Cambio", () => {
  beforeEach(() => {
    cy.visit(URL);
  });

  describe("Verifica la visibilidad de elementos", () => {
    it("Comprueba que la cabecera con el título sean visibles", () => {
      cy.get("header").should("be.visible");
    });

    it("Comprueba que la sección de inicio sea visible", () => {
      cy.get(".inicio").should("be.visible");
    });

    it("Comprueba que la sección de 'sobre nosotros' sea visible", () => {
      cy.get(".sobre-nosotros").should("be.visible");
    });

    it("Comprueba que la sección de conversión de divisas sea visible", () => {
      cy.get(".conversion-divisas").should("be.visible");
    });

    it("Comprueba que la sección de cambios de divisas sea visible", () => {
      cy.get(".cambios-de-divisas").should("be.visible");
    });

    it("Comprueba que el pie de la página sea visible", () => {
      cy.get("footer").should("be.visible");
    });
  });

  describe("Comprueba correcto funcionamiento de los botones de inicio", () => {
    it("Comprueba boton de inicio: Realizar una conversión", () => {
      cy.get("#boton-conversion").should("be.visible").click();
      cy.url().should("include", "#conversion-de-divisas");
    });

    it("Comprueba boton de inicio: Ver últimos cambios de divisas", () => {
      cy.get("#boton-cambios").should("be.visible").click();
      cy.url().should("include", "#cambios-de-divisas");
    });
  });

  describe("Comprueba carga correcta de la información de la API", () => {
    it("Comprueba que los selectores contengan divisas", () => {
      cy.get(".moneda-usuario").should("be.visible");
      cy.get(".moneda-usuario").should("have.value", "ARS");
    });

    it("Comprueba que la lista de cambios contenga divisas y su información", () => {
      cy.get(".principales-divisas").each(() => {
        cy.contains("td", "ARS").should("exist");
        cy.contains("td", "MXN").should("exist");
        cy.contains("td", "CAD").should("exist");
        cy.contains("td", "JPY").should("exist");
        cy.contains("td", "GBP").should("exist");
      });
    });
  });

  describe("Realiza incorrectamente una conversión de divisa", () => {
    it("Realiza conversión con un valor erroneo", () => {
      cy.get(".moneda-usuario").should("be.visible");
      cy.get(".moneda-usuario").should("have.value", "ARS");

      cy.get(".moneda-a-cambiar").should("be.visible");
      cy.get(".moneda-a-cambiar").should("have.value", "USD");

      cy.get(".plata-usuario").should("be.visible");
      cy.get(".plata-usuario").type(".");

      cy.get(".boton-convertir").should("be.visible").click();

      cy.get(".contenedor-texto-error").should("be.visible");
      cy.get(".contenedor-texto-error").should("have.text", "El campo solo acepta números");
    });
  });

  describe("Realiza correctamente una conversión de divisa", () => {
    it("Comprueba funcionamiento primer select", () => {
      cy.get(".moneda-usuario").should("be.visible");
      cy.get(".moneda-usuario").should("have.value", "ARS");
      cy.get(".moneda-usuario").select("EUR");
      cy.get(".moneda-usuario").should("have.value", "EUR");
    });

    it("Comprueba funcionamiento segundo select", () => {
      cy.get(".moneda-a-cambiar").should("be.visible");
      cy.get(".moneda-a-cambiar").should("have.value", "USD");
      cy.get(".moneda-a-cambiar").select("ARS");
      cy.get(".moneda-a-cambiar").should("have.value", "ARS");
    });

    it("Realiza conversión de EUR a GBP", () => {
      cy.get(".moneda-usuario").should("have.value", "ARS");
      cy.get(".moneda-usuario").select("EUR");
      cy.get(".moneda-usuario").should("have.value", "EUR");

      cy.get(".moneda-a-cambiar").should("have.value", "USD");
      cy.get(".moneda-a-cambiar").select("GBP");
      cy.get(".moneda-a-cambiar").should("have.value", "GBP");

      cy.get(".plata-usuario").should("be.visible");
      cy.get(".plata-usuario").type("3222");

      cy.get(".boton-convertir").should("be.visible").click();

      cy.get(".respuesta-conversion").should("be.visible");
      cy.get(".respuesta-conversion").should("have.text", "3222 EUR convertidos a GBP = 2771,271");
    });
  });

  describe("Actualiza los valores de las divisas según la moneda elegida", () => {
    it("Comprueba los valores iniciales de las divisas en la tabla", () => {
      cy.get(".principales-divisas").then(($divisaFila) => {
        cy.wrap($divisaFila).should(($divisa) => {
          const divisaTexto = $divisa.text();

          expect(divisaTexto).to.contain("ARS");
          expect(divisaTexto).to.contain("MXN");
          expect(divisaTexto).to.contain("CAD");
          expect(divisaTexto).to.contain("JPY");
          expect(divisaTexto).to.contain("GBP");
        });
      });

      cy.get(".valor-divisa").then(($valorDivisa) => {
        cy.wrap($valorDivisa).should(($valor) => {
          const valorDivisa = $valor.text();

          expect(valorDivisa).to.contain("303,85");
          expect(valorDivisa).to.contain("18,57");
          expect(valorDivisa).to.contain("1,46");
          expect(valorDivisa).to.contain("157,24");
          expect(valorDivisa).to.contain("0,86");
        });
      });
    });

    it("Actualiza los valores de la tabla según GBP", () => {
      cy.get(".moneda-base-cambio").should("be.visible").select("GBP");
      cy.get(".boton-comprobar-cambios").should("be.visible").click();

      cy.wait(2000);
      cy.get(".valor-divisa").then(($valorDivisa) => {
        cy.wrap($valorDivisa).should(($valor) => {
          const valorDivisa = $valor.text();

          expect(valorDivisa).to.contain("353,27");
          expect(valorDivisa).to.contain("21,59");
          expect(valorDivisa).to.contain("1,698");
          expect(valorDivisa).to.contain("182,82");
          expect(valorDivisa).to.contain("1");
        });
      });
    });
  });

  describe("Agrega una divisa extra a la tabla y comprueba su funcionamiento", () => {
    it("Comprueba agregar divisa en tabla", () => {
      cy.get(".principales-divisas").should("be.visible");
      cy.get(".principales-divisas").should("have.length", "5");

      cy.get(".divisa-para-agregar").should("be.visible").select("AOA");
      cy.get(".boton-agregar-divisa").should("be.visible").click();

      cy.get(".principales-divisas").should("be.visible");
      cy.get(".principales-divisas").should("have.length", "6");
      cy.get(".principales-divisas").contains("AOA");
    });

    it("Comprueba cambio de valor en la divisa agregada al seleccionar otra moneda base", () =>{
      cy.get(".divisa-para-agregar").should("be.visible").select("AOA");
      cy.get(".boton-agregar-divisa").should("be.visible").click();

      cy.get(".valor-divisa").then(($valorDivisa) => {
        cy.wrap($valorDivisa).should(($valor) => {
          const valorDivisa = $valor.text();

          expect(valorDivisa).to.contain("303,85");
          expect(valorDivisa).to.contain("18,57");
          expect(valorDivisa).to.contain("1,46");
          expect(valorDivisa).to.contain("157,24");
          expect(valorDivisa).to.contain("0,86");
          expect(valorDivisa).to.contain("909,43");
        });
      });

      cy.get(".moneda-base-cambio").should("be.visible").select("DJF");
      cy.get(".boton-comprobar-cambios").should("be.visible").click();

      cy.wait(2000)

      cy.get(".valor-divisa").then(($valorDivisa) => {
        cy.wrap($valorDivisa).should(($valor) => {
          const valorDivisa = $valor.text();

          expect(valorDivisa).to.contain("1,551");
          expect(valorDivisa).to.contain("0,095");
          expect(valorDivisa).to.contain("0,007");
          expect(valorDivisa).to.contain("0,803");
          expect(valorDivisa).to.contain("0,004");
          expect(valorDivisa).to.contain("4,642");
        });
      });
    });
  });
});
