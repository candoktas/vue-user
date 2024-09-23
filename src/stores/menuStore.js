import { defineStore } from 'pinia';

export const useMenuStore = defineStore('menu', {
    state: () => ({
        selectedMenu: 'users', // Varsayılan olarak 'users' seçili
    }),
    actions: {
        selectMenu(menu) {
            this.selectedMenu = menu;
        },
    },
    getters: {
        isUsersSelected: (state) => state.selectedMenu === 'users',
    },
});
