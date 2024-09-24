<template>
  <div class="w-full">
    <h1 class="text-xl font-semibold mb-4 pl-4">All users</h1>

    <!-- Skeleton Loader -->
    <div v-if="userStore.isLoadingUsers" class="flex gap-4">
      <div
        v-for="n in 3"
        :key="n"
        class="border border-gray-300 rounded-lg shadow-md p-4 w-1/3 h-96"
      >
        <!-- Avatar için skeleton -->
        <div
          class="bg-gray-300 rounded-full w-20 h-20 mx-auto mb-4 animate-pulse"
        ></div>
        <!-- Kullanıcı adı için skeleton -->
        <div
          class="bg-gray-300 h-4 w-3/4 mx-auto rounded-lg animate-pulse mb-2"
        ></div>
        <!-- Kullanıcı emaili için skeleton -->
        <div
          class="bg-gray-300 h-4 w-1/2 mx-auto rounded-lg animate-pulse"
        ></div>
      </div>
    </div>

    <!-- Kullanıcılar yüklendikten sonra gösterilecek kısım -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      <UserCard v-for="user in userStore.users" :key="user.id" :user="user" />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useUserStore } from "../stores/userStore";
import UserCard from "./UserCard.vue";

const userStore = useUserStore();

onMounted(() => {
  userStore.fetchUsers(); // Kullanıcıları store'dan çekiyoruz
});
</script>

<style scoped>
/* İsteğe bağlı: Buraya stil ekleyebilirsin */
</style>
