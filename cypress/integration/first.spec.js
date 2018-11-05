/// <reference types="Cypress" />

it("loads", () => {
	cy.visit("localhost:3000");
	cy.contains("h1", "todos").should("exist");
});
