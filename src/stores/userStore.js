import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    users: JSON.parse(localStorage.getItem("users")) || [], // LocalStorage'dan yükle
    selectedUser: JSON.parse(localStorage.getItem("selectedUser")) || null,
    todos: JSON.parse(localStorage.getItem("todos")) || [], // LocalStorage'dan todos yükle
    isLoadingUsers: false,
    isLoadingTodos: false, // Todos için loading state
  }),
  actions: {
    async fetchUsers() {
      if (this.users.length > 0) return; // Eğer localStorage'da varsa yeniden yükleme

      this.isLoadingUsers = true;
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users",
        );
        this.users = response.data;
        localStorage.setItem("users", JSON.stringify(this.users)); // LocalStorage'a kaydet
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        this.isLoadingUsers = false;
      }
    },
    setSelectedUser(user) {
      this.selectedUser = user;
      localStorage.setItem("selectedUser", JSON.stringify(user)); // LocalStorage'a kaydet
    },
    clearSelectedUser() {
      this.selectedUser = null;
      localStorage.removeItem("selectedUser"); // LocalStorage'dan sil
    },

    // Todos fetch etme işlemi
    async fetchTodos(userId) {
      this.isLoadingTodos = true;
      const cachedTodos = localStorage.getItem(`todos_user_${userId}`);

      if (cachedTodos) {
        this.todos = JSON.parse(cachedTodos); // LocalStorage'dan yükle
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
          ); // LocalStorage'a kaydet
        } catch (error) {
          console.error("Failed to fetch todos:", error);
        } finally {
          this.isLoadingTodos = false;
        }
      }
    },

    // Todos'u güncelleme ve localStorage'a kaydetme
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
