import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    users: JSON.parse(localStorage.getItem("users")) || [],
    selectedUser: JSON.parse(localStorage.getItem("selectedUser")) || null,
    todos: JSON.parse(localStorage.getItem("todos")) || [],
    isLoadingUsers: false,
    isLoadingTodos: false,
  }),
  actions: {
    async fetchUsers() {
      if (this.users.length > 0) return;

      this.isLoadingUsers = true;
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users",
        );
        this.users = response.data;
        localStorage.setItem("users", JSON.stringify(this.users));
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        this.isLoadingUsers = false;
      }
    },
    setSelectedUser(user) {
      this.selectedUser = user;
      localStorage.setItem("selectedUser", JSON.stringify(user));
    },
    clearSelectedUser() {
      this.selectedUser = null;
      localStorage.removeItem("selectedUser");
    },

    async fetchTodos(userId) {
      this.isLoadingTodos = true;
      const cachedTodos = localStorage.getItem(`todos_user_${userId}`);

      if (cachedTodos) {
        this.todos = JSON.parse(cachedTodos);
        this.isLoadingTodos = false;
      } else {
        try {
          const response = await axios.get(
            `https://jsonplaceholder.typicode.com/todos?userId=${userId}`,
          );
          this.todos = response.data;
          localStorage.setItem(
            `todos_user_${userId}`,
            JSON.stringify(this.todos),
          );
        } catch (error) {
          console.error("Failed to fetch todos:", error);
        } finally {
          this.isLoadingTodos = false;
        }
      }
    },

    updateTodo(todo) {
      const index = this.todos.findIndex((t) => t.id === todo.id);
      if (index !== -1) {
        this.todos[index] = todo;
        localStorage.setItem(
          `todos_user_${this.selectedUser.id}`,
          JSON.stringify(this.todos),
        );
      }
    },
  },
});
