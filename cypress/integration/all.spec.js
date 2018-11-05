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

	// beforeEach(() => {
	// 	cy.visit("/");
	// });

	it("loads", () => {
		cy.contains("h1", "todos").should("exist");
	});

	it.only("starts with zero item", () => {
		// cy.wait(3000);
		cy.server();
		cy.route("/todos").as("getTodo");
		cy.visit("/");
		cy.wait("@getTodo")
			.its("response.body")
			.should("have.length", 0);
		cy.get(".todo").should("have.length", 0);
	});

	it("adds two items", () => {
		addTodo("item 1");
		cy.contains(".todo", "item 1").should("exist");
		addTodo("item 2");
		cy.contains(".todo", "item 2").should("exist");
		cy.get(".todo").should("have.length", 2);
	});
});
