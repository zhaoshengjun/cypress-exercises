/// <reference types="Cypress" />

it("loads", () => {
	cy.visit("localhost:3000");
	cy.contains("h1", "todos").should("exist");
});

it("starts with zero item", () => {
	cy.visit("localhost:3000");
	cy.get(".todo").should("have.length", 0);
});

it.only("adds two items", () => {
	cy.visit("localhost:3000");
	cy.get(".new-todo")
		.type("item 1")
		.type("{enter}");
	cy.contains(".todo", "item 1").should("exist");
	cy.get(".new-todo")
		.type("item 2")
		.type("{enter}");
	cy.contains(".todo", "item 2").should("exist");
});
