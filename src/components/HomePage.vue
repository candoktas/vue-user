<template>
  <div :class="isHomePage ? 'flex min-h-screen' : ''">
    <aside
      v-if="isHomePage"
      class="w-[20%] min-w-28 md:w-[16%] bg-[#F5F5F5] border-r border-border shadow-md flex flex-col sticky top-0 h-screen"
    >
      <nav class="flex-1">
        <ul class="space-y-4 mt-8">
          <li>
            <a
              href="#"
              class="flex items-center space-x-2 font-normal p-1 pl-2 md:p-2 md:pl-8 relative transition duration-200 ease-in-out"
              :class="
                isUsersSelected
                  ? 'bg-white text-primary'
                  : 'text-gray-700 hover:bg-gray-200 hover:border-l-8 hover:border-gray-400'
              "
              @click="selectMenu('users')"
            >
              <span
                class="absolute left-0 top-0 h-full w-1.5 bg-primary rounded-r-xl"
                v-if="isUsersSelected"
              ></span>
              <UserIcon />
              <span class="text-sm md:text-lg font-normal text-primary"
                >Users</span
              >
            </a>
          </li>
        </ul>
      </nav>
      <div
        class="p-2 md:p-4 border-t flex items-center space-x-1 md:space-x-2 justify-center"
      >
        <img
          src="../assets/logo.png"
          alt="logo"
          class="w-4 h-4 md:w-8 md:h-8"
        />
        <h2 class="text-sm md:text-xl text-subtitle font-bold">N2Mobil</h2>
      </div>
    </aside>

    <main :class="isHomePage ? 'flex-1 p-4 md:p-10 bg-white w-full' : 'w-full'">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { useMenuStore } from "../stores/menuStore.js";
import { computed } from "vue";
import UserIcon from "./icons/UserIcon.vue";
import { useRoute } from "vue-router";

const menuStore = useMenuStore();
const isUsersSelected = computed(() => menuStore.isUsersSelected);

const selectMenu = (menu) => {
  menuStore.selectMenu(menu);
};

const route = useRoute();
const isHomePage = computed(() => route.name === "UserList");
</script>
