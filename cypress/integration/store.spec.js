const addTodo = todo => {
	cy.get(".new-todo").type(`${todo}{enter}`);
};
context("Store tests", () => {
	beforeEach(() => {
		cy.request("POST", "/reset", {
			todos: []
		});
	});

	beforeEach(() => {
		cy.visit("/");
	});

	it("adds item to store", () => {
		addTodo("something");
		addTodo("newthing");
		cy.window()
			.its("app.$store.state.todos")
			.should("have.length", 2);
	});
	it.only("create item with id 1", () => {
		cy.server();
		cy.route("POST", "/todos").as("newItem");
		addTodo("something");
		cy.wait("@newItem")
			.its("request.body")
			.should("deep.equal", {
				id: "1",
				title: "something",
				completed: false
			});
	});
});
