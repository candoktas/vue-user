import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    selectedUser: null,
  }),
  actions: {
    setSelectedUser(user) {
      this.selectedUser = user;
    },
    clearSelectedUser() {
      this.selectedUser = null;
    },
  },
});
