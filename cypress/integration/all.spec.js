/// <reference types="Cypress" />

const addTodo = text => {
	cy.get(".new-todo")
		.type(text)
		.type("{enter}");
};

context("Todo MVC", () => {
	// beforeEach(() => {
	// 	cy.request("POST", "/reset", {
	// 		todos: []
	// 	});
	// });

	// beforeEach(() => {
	// 	cy.visit("/");
	// });

	it("loads", () => {
		cy.contains("h1", "todos").should("exist");
	});

	it("starts with zero item", () => {
		cy.server();
		cy.route("/todos").as("getTodo");
		cy.visit("/");
		cy.wait("@getTodo")
			.its("response.body")
			.should("have.length", 0);
		cy.get(".todo").should("have.length", 0);
	});

	it("starts with zero item(stub response)", () => {
		cy.server();
		cy.route("GET", "/todos", []).as("getTodo");
		cy.visit("/");
		cy.wait("@getTodo")
			.its("response.body")
			.should("have.length", 0);
		cy.get(".todo").should("have.length", 0);
	});

	it("starts with zero item(fixture)", () => {
		cy.server();
		cy.route("GET", "/todos", "fixture:data").as("getTodo");
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

	it("loads serverl items from fixture", () => {
		cy.server();
		cy.route("GET", "/todos", "fixture:two-items.json");
		cy.visit("/");
		cy.get(".todo").should("have.length", 2);
		cy.get(".todo.completed").should("have.length", 1);
		cy.contains(".todo", "first item from fixture")
			.should("not.have.class", "completed")
			.find(".toggle")
			.should("not.be.checked");
		cy.contains(".todo", "second item from fixture")
			.should("have.class", "completed")
			.find(".toggle")
			.should("be.checked");
	});

	it("post new item to server(request)", () => {
		cy.server();
		cy.route("POST", "/todos").as("newTodo");
		cy.visit("/");
		cy.get(".new-todo").type("api test{enter}");
		cy.wait("@newTodo")
			.its("request.body")
			.should("have.contain", {
				title: "api test",
				completed: false
			});
	});

	it.only("post new item to server(response)", () => {
		cy.server();
		cy.route("POST", "/todos").as("newTodo");
		cy.visit("/");
		cy.get(".new-todo").type("api test{enter}");
		cy.wait("@newTodo")
			.its("response.body")
			.should("have.contain", {
				title: "api test",
				completed: false
			});
	});
});
