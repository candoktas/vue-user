<template>
  <div class="w-full">
    <h1 class="text-xl font-semibold mb-4 pl-4">All users</h1>
    <div class="flex flex-wrap gap-4">
      <UserCard v-for="user in users" :key="user.id" :user="user" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import UserCard from './UserCard.vue'

const users = ref([])

onMounted(async () => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users')
    users.value = response.data
  } catch (error) {
    console.error(error)
  }
})
</script>

<style scoped>
/* İsteğe bağlı: Buraya stil ekleyebilirsin */
</style>
