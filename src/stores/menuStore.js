import { defineStore } from "pinia";

export const useMenuStore = defineStore("menu", {
  state: () => ({
    selectedMenu: "users",
  }),
  actions: {
    selectMenu(menu) {
      this.selectedMenu = menu;
    },
  },
  getters: {
    isUsersSelected: (state) => state.selectedMenu === "users",
  },
});
