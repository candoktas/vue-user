import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    users: JSON.parse(localStorage.getItem("users")) || [], // LocalStorage'dan yükle
    selectedUser: JSON.parse(localStorage.getItem("selectedUser")) || null,
    isLoadingUsers: false,
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
  },
});
