<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">Albums</h2>
    <!-- Albums içeriği buraya gelecek -->
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

const albums = ref([]);
const route = useRoute();

onMounted(async () => {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/albums?userId=${route.params.id}`,
  );
  albums.value = response.data;
});
</script>
