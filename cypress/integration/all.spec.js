/// <reference types="Cypress" />

const addTodo = text => {
	cy.get(".new-todo")
		.type(text)
		.type("{enter}");
};

context("Todo MVC", () => {
	beforeEach(() => {
		cy.request("POST", "/reset", {
			todos: []
		});
	});

	beforeEach(() => {
		cy.visit("/");
	});

	it("loads", () => {
		cy.contains("h1", "todos").should("exist");
	});

	it("starts with zero item", () => {
		cy.get(".todo").should("have.length", 0);
	});

	it.only("adds two items", () => {
		addTodo("item 1");
		cy.contains(".todo", "item 1").should("exist");
		addTodo("item 2");
		cy.contains(".todo", "item 2").should("exist");
		cy.get(".todo").should("have.length", 2);
	});
});
