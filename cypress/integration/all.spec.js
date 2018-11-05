/// <reference types="Cypress" />

it("loads", () => {
	cy.visit("localhost:3000");
	cy.contains("h1", "todos").should("exist");
});

it("starts with zero item", () => {
	cy.visit("localhost:3000");
	cy.get(".todo").should("have.length", 0);
});
