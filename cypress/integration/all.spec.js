/// <reference types="Cypress" />
context("Todo MVC", () => {
	beforeEach(() => {
		cy.visit("localhost:3000");
	});

	it("loads", () => {
		cy.contains("h1", "todos").should("exist");
	});

	it("starts with zero item", () => {
		cy.get(".todo").should("have.length", 0);
	});

	it("adds two items", () => {
		cy.get(".new-todo")
			.type("item 1")
			.type("{enter}");
		cy.contains(".todo", "item 1").should("exist");
		cy.get(".new-todo")
			.type("item 2")
			.type("{enter}");
		cy.contains(".todo", "item 2").should("exist");
	});
});
