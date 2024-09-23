<!-- UserDetails.vue -->
<template>
  <div class="flex min-h-screen">
    <!-- Sol Sidebar -->
    <aside
      class="w-[16%] bg-[#F5F5F5] border-r border-border shadow-md flex flex-col"
    >
      <div class="mb-4 flex space-x-6 items-center p-4">
        <!-- Kullanıcı Avatarı -->
        <img
          v-if="!isLoading && user && user.id"
          :src="'https://i.pravatar.cc/150?u=' + user.id"
          alt="User Avatar"
          class="w-12 h-12 rounded-full"
        />
        <!-- Kullanıcı Bilgileri -->
        <div class="flex-col">
          <h1 class="text-lg text-title font-medium">
            {{ isLoading ? "Loading..." : user.name }}
          </h1>
          <p class="text-sm text-subtitle font-light" v-if="!isLoading">
            {{ user.email }}
          </p>
        </div>
      </div>
      <div class="px-4 mb-16">
        <div class="border-b border-border w-full"></div>
      </div>
      <nav v-if="!isLoading && user && user.id">
        <ul>
          <!-- Todos Menüsü -->
          <li
            :class="[
              'relative text-lg flex items-center space-x-3 font-normal p-2 pl-6 transition duration-200 ease-in-out mb-4',
              isActiveMenu('UserTodos')
                ? 'bg-white text-primary'
                : 'text-[#00000073] hover:bg-purple-100',
            ]"
          >
            <!-- Sol Taraftaki İşaret -->
            <span
              class="absolute left-0 top-0 h-full w-1.5 rounded-r-xl"
              :class="
                isActiveMenu('UserTodos') ? 'bg-primary' : 'bg-transparent'
              "
            ></span>

            <ChecklistIcon />
            <router-link
              :to="{ name: 'UserTodos', params: { id: user.id } }"
              class="flex-1"
            >
              Todos
            </router-link>
          </li>

          <!-- Posts Menüsü -->
          <li
            :class="[
              'relative text-lg flex items-center space-x-3 font-normal p-2 pl-6 transition duration-200 ease-in-out mb-4',
              isActiveMenu('UserPosts')
                ? 'bg-white text-primary'
                : 'text-[#00000073] hover:bg-purple-100',
            ]"
          >
            <!-- Sol Taraftaki İşaret -->
            <span
              class="absolute left-0 top-0 h-full w-1.5 rounded-r-xl"
              :class="
                isActiveMenu('UserPosts') ? 'bg-primary' : 'bg-transparent'
              "
            ></span>

            <PostsIcon />
            <router-link
              :to="{ name: 'UserPosts', params: { id: user.id } }"
              class="flex-1"
            >
              Posts
            </router-link>
          </li>

          <!-- Albums Menüsü -->
          <li
            :class="[
              'relative text-lg flex items-center space-x-3 font-normal p-2 pl-6 transition duration-200 ease-in-out',
              isActiveMenu('UserAlbums')
                ? 'bg-white text-primary'
                : 'text-[#00000073] hover:bg-purple-100',
            ]"
          >
            <!-- Sol Taraftaki İşaret -->
            <span
              class="absolute left-0 top-0 h-full w-1.5 rounded-r-xl"
              :class="
                isActiveMenu('UserAlbums') ? 'bg-primary' : 'bg-transparent'
              "
            ></span>

            <AlbumsIcon />
            <router-link
              :to="{ name: 'UserAlbums', params: { id: user.id } }"
              class="flex-1"
            >
              Albums
            </router-link>
          </li>
        </ul>
      </nav>
    </aside>

    <!-- Sağ İçerik -->
    <main class="flex-1 p-6">
      <!-- Yükleniyor Spinner'ı -->
      <div v-if="isLoading" class="flex items-center justify-center h-full">
        <div
          class="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"
        ></div>
      </div>
      <!-- İçerik -->
      <div v-else>
        <router-view />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from "../stores/userStore.js";
import axios from "axios";
import ChecklistIcon from "./icons/ChecklistIcon.vue";
import PostsIcon from "./icons/PostsIcon.vue";
import AlbumsIcon from "./icons/AlbumsIcon.vue";

const route = useRoute();
const userStore = useUserStore();
const user = ref({});
const isLoading = ref(true);

// Aktif menü öğesini belirleyen fonksiyon
const isActiveMenu = (menuName) => {
  return route.name === menuName;
};

onMounted(async () => {
  const selectedUser = userStore.selectedUser;

  if (selectedUser && selectedUser.id === parseInt(route.params.id)) {
    user.value = selectedUser;
    isLoading.value = false;
  } else {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${route.params.id}`,
      );
      user.value = response.data;
      userStore.setSelectedUser(user.value);
    } catch (error) {
      console.error("Error loading user data:", error);
    } finally {
      isLoading.value = false;
    }
  }
});
</script>
