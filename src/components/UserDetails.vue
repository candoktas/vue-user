<template>
  <div class="flex min-h-screen">
    <aside
      class="w-[20%] min-w-28 bg-[#F5F5F5] border-r border-border shadow-md flex flex-col justify-between sticky top-0 h-screen"
    >
      <div>
        <div
          class="mb-4 flex space-x-0 items-center p-4 flex-wrap justify-center xl:flex-nowrap xl:justify-start xl:space-x-6"
        >
          <img
            v-if="!userStore.isLoadingUsers && userStore.selectedUser"
            :src="'https://i.pravatar.cc/150?u=' + userStore.selectedUser.id"
            alt="User Avatar"
            class="w-12 h-12 rounded-full"
          />
          <div class="flex-col text-center xl:text-start">
            <h1 class="text-sm md:text-lg text-title font-medium">
              {{
                userStore.isLoadingUsers
                  ? "Loading..."
                  : userStore.selectedUser.name
              }}
            </h1>
            <p
              class="text-xs md:text-sm text-subtitle font-light underline underline-offset-2 break-all"
              v-if="!userStore.isLoadingUsers"
            >
              {{ userStore.selectedUser.email }}
            </p>
          </div>
        </div>
        <div class="px-4 mb-16">
          <div class="border-b border-border w-full"></div>
        </div>
        <nav
          v-if="!userStore.isLoadingUsers && userStore.selectedUser"
          class="flex-1"
        >
          <ul>
            <li
              :class="[
                'relative text-sm md:text-lg flex items-center space-x-1 md:space-x-3 font-normal p-1 pl-3 md:p-2 md:pl-6 transition duration-200 ease-in-out mb-4',
                isActiveMenu('UserTodos')
                  ? 'bg-white text-primary'
                  : 'text-[#00000073] hover:bg-purple-100',
              ]"
            >
              <span
                class="absolute left-0 top-0 h-full w-1.5 rounded-r-xl"
                :class="
                  isActiveMenu('UserTodos') ? 'bg-primary' : 'bg-transparent'
                "
              ></span>

              <ChecklistIcon class="stroke-primary" />
              <router-link
                :to="{
                  name: 'UserTodos',
                  params: { id: userStore.selectedUser.id },
                }"
                class="flex-1"
              >
                Todos
              </router-link>
            </li>

            <li
              :class="[
                'relative text-sm md:text-lg flex items-center space-x-1 md:space-x-3 font-normal p-1 pl-3 md:p-2 md:pl-6 transition duration-200 ease-in-out mb-4',
                isActiveMenu('UserPosts')
                  ? 'bg-white text-primary'
                  : 'text-[#00000073] hover:bg-purple-100',
              ]"
            >
              <span
                class="absolute left-0 top-0 h-full w-1.5 rounded-r-xl"
                :class="
                  isActiveMenu('UserPosts') ? 'bg-primary' : 'bg-transparent'
                "
              ></span>

              <PostsIcon class="stroke-primary" />
              <router-link
                :to="{
                  name: 'UserPosts',
                  params: { id: userStore.selectedUser.id },
                }"
                class="flex-1"
              >
                Posts
              </router-link>
            </li>

            <li
              :class="[
                'relative text-sm md:text-lg flex items-center space-x-1 md:space-x-3 font-normal p-1 pl-3 md:p-2 md:pl-6 transition duration-200 ease-in-out',
                isActiveMenu('UserAlbums')
                  ? 'bg-white text-primary'
                  : 'text-[#00000073] hover:bg-purple-100',
              ]"
            >
              <span
                class="absolute left-0 top-0 h-full w-1.5 rounded-r-xl"
                :class="
                  isActiveMenu('UserAlbums') ? 'bg-primary' : 'bg-transparent'
                "
              ></span>

              <AlbumsIcon class="stroke-primary" />
              <router-link
                :to="{
                  name: 'UserAlbums',
                  params: { id: userStore.selectedUser.id },
                }"
                class="flex-1"
              >
                Albums
              </router-link>
            </li>
          </ul>
        </nav>
      </div>

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

    <main class="flex-1 p-6">
      <div
        v-if="userStore.isLoadingUsers"
        class="flex items-center justify-center h-full"
      >
        <div
          class="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"
        ></div>
      </div>
      <div v-else>
        <router-view />
      </div>
    </main>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from "../stores/userStore.js";
import ChecklistIcon from "./icons/ChecklistIcon.vue";
import PostsIcon from "./icons/PostsIcon.vue";
import AlbumsIcon from "./icons/AlbumsIcon.vue";

const route = useRoute();
const userStore = useUserStore();

const isActiveMenu = (menuName) => {
  return route.name === menuName;
};

onMounted(() => {
  const selectedUser = userStore.selectedUser;

  if (selectedUser && selectedUser.id === parseInt(route.params.id)) {
    userStore.setSelectedUser(selectedUser);
  } else {
    userStore.fetchUsers();
  }
});
</script>
