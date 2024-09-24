<!-- src/App.vue -->
<template>
  <div :class="isHomePage ? 'flex min-h-screen' : ''">
    <!-- Sidebar -->
    <aside
      v-if="isHomePage"
      class="w-[16%] bg-[#F5F5F5] border-r border-border shadow-md flex flex-col"
    >
      <nav class="flex-1">
        <ul class="space-y-4 mt-8">
          <li>
            <!-- Users Menüsü -->
            <a
              href="#"
              class="flex items-center space-x-2 font-normal p-2 pl-8 relative transition duration-200 ease-in-out"
              :class="
                isUsersSelected
                  ? 'bg-white text-purple-700'
                  : 'text-gray-700 hover:bg-gray-200 hover:border-l-8 hover:border-gray-400'
              "
              @click="selectMenu('users')"
            >
              <span
                class="absolute left-0 top-0 h-full w-1.5 bg-primary rounded-r-xl"
                v-if="isUsersSelected"
              ></span>
              <UserIcon />
              <span class="text-lg font-normal text-primary">Users</span>
            </a>
          </li>
        </ul>
      </nav>
      <div class="p-4 border-t">
        <h2 class="text-xl font-bold">N2Mobil</h2>
      </div>
    </aside>

    <!-- Main Content -->
    <main :class="isHomePage ? 'flex-1 p-10 bg-white w-full' : 'w-full'">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { useMenuStore } from "../stores/menuStore.js";
import { computed } from "vue";
import UserIcon from "./icons/UserIcon.vue";
import { useRoute } from "vue-router";

// Pinia Store'u kullanma
const menuStore = useMenuStore();
const isUsersSelected = computed(() => menuStore.isUsersSelected);

// Menü seçimi
const selectMenu = (menu) => {
  menuStore.selectMenu(menu);
};

// Mevcut rotayı alıyoruz
const route = useRoute();

// Ana sayfada olup olmadığımızı kontrol ediyoruz
const isHomePage = computed(() => route.name === "UserList");
</script>
