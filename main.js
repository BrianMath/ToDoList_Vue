const App = Vue.createApp({
	data() {
		return {
			todos: [],
		}
	},
	methods: {
		addToDo() {
			// Validation
			let todoText = document.querySelector("#ToDoInput")
			if (todoText.value === "") {
				return
			}

			if (this.todos.length > 0) {
				var newId = this.todos[this.todos.length - 1].id + 1
			} else {
				var newId = 0
			}

			this.todos.push({   
				id: newId,
				text: `${todoText.value}`,
				completed: false
			})

			// Save on LocalStorage
			localStorage.setItem("todos", JSON.stringify(this.todos))

			todoText.value = ""
		},
		deleteToDo(id) {
			let pos = 0

			for (todo of this.todos) {
				if (todo.id === id) {
					this.todos.splice(pos, 1)
					// Save on LocalStorage the new array
					localStorage.setItem("todos", JSON.stringify(this.todos))
					break
				}

				pos++
			}
		},
		toggleCompleted(id) {
			let pos = 0

			for (todo of this.todos) {
				if (todo.id === id) {
					this.todos[pos].completed = !this.todos[pos].completed
					// Save on LocalStorage the new array
					localStorage.setItem("todos", JSON.stringify(this.todos))
					break
				}

				pos++
			}
		}
	},
	computed: {
		// Get "todos" from LocalStorage
		getToDos() {
			var savedToDos = JSON.parse(localStorage.getItem("todos"))
			if (savedToDos) {
				this.todos = savedToDos
			}
		}
	}
})