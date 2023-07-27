const URL = "http://192.168.1.41:8080/docs/";

context("Casa De Cambio", () => {
  beforeEach(() => {
    cy.visit(URL);
  });

  describe("Comprueba visibilidad de elementos", () => {
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

  describe("Comprueba botones de inicio", () => {
    it("Comprueba boton de inicio: Realizar una conversión", () => {
      cy.get("#boton-conversion").should("be.visible").click();
      cy.url().should("include", "#conversion-de-divisas");
    });

    it("Comprueba boton de inicio: Ver últimos cambios de divisas", () => {
      cy.get("#boton-cambios").should("be.visible").click();
      cy.url().should("include", "#cambios-de-divisas");
    });
  });
});
