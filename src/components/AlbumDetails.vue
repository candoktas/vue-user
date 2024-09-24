<template>
  <div>
    <GoAlbums />

    <!-- Skeleton Loader -->
    <div v-if="albumStore.isLoadingPhotos" class="grid grid-cols-6 gap-6 mt-10">
      <div v-for="n in 6" :key="n" class="shadow-md">
        <!-- Fotoğraf için skeleton -->
        <div class="bg-gray-300 w-full h-48 animate-pulse"></div>
      </div>
    </div>

    <!-- Fotoğraflar Yüklendikten Sonra -->
    <div
      v-else
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 mt-10"
    >
      <div
        v-for="photo in albumStore.selectedAlbumPhotos"
        :key="photo.id"
        class="shadow-md"
      >
        <img
          :src="photo.thumbnailUrl"
          :alt="photo.title"
          class="w-full cursor-pointer"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useAlbumStore } from "../stores/albumStore"; // albumStore'ı import et
import { useRoute } from "vue-router";
import GoAlbums from "./GoAlbums.vue"; // route bilgisi için

const albumStore = useAlbumStore();
const route = useRoute();

// Sayfa yüklendiğinde albüm detaylarını çek
onMounted(() => {
  albumStore.fetchAlbumById(route.params.albumId); // fetchAlbumPhotos değil, fetchAlbumById
});
</script>
