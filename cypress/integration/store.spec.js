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
	beforeEach(() => {
		// let count = 1;
		// cy.window()
		// 	.its("Math")
		// 	.then(Math => {
		// 		cy.stub(Math, "random", () => {
		// 			// inside app.js, it will use substr(2,10) as the id
		// 			return `0.${count++}`;
		// 		}).as("random");
		// 	});
	});

	it("adds item to store", () => {
		addTodo("something");
		addTodo("newthing");
		cy.window()
			.its("app.$store.state.todos")
			.should("have.length", 2);
	});
	it("create item with id 1", () => {
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

	it("creates an item with id using a stub", () => {
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
		cy.get("@random").should("have.been.calledOnce");
		addTodo("other things");
		cy.get("@random").should("have.been.calledTwice");
	});

	it("add 2 todo items", () => {
		addTodo("something");
		addTodo("other things");
		cy.window()
			.its("app.$store.state.todos")
			.should("have.length", 2) // it's an array
			.should("deep.equal", [
				{ id: "1", title: "something", completed: false },
				{ id: "2", title: "other things", completed: false }
			]);
	});

	it.only("dispatch actions", () => {
		// cy.window().its("app.$store.dispatch")("addTodo");
		cy.server();
		cy.route("POST", "/todos").as("newTodo");
		cy.window()
			.its("app.$store")
			.then(store => {
				store.dispatch("setNewTodo", "something");
				store.dispatch("addTodo");
				// store.dispatch("clearNewTodo");
				cy.wait("@newTodo")
					.its("response.body")
					.should("contain", { title: "something" }); // it's an object
			});
	});
});
