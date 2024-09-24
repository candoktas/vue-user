<template>
  <div>
    <GoHome />

    <!-- Skeleton Loader -->
    <div v-if="albumStore.isLoadingAlbums" class="grid grid-cols-3 gap-6 mt-10">
      <div
        v-for="n in 3"
        :key="n"
        class="border border-gray-300 rounded-lg shadow-md p-4"
      >
        <div class="grid grid-cols-2 gap-2 mb-4">
          <div
            v-for="i in 4"
            :key="i"
            class="bg-gray-300 rounded-lg w-full h-24 animate-pulse"
          ></div>
        </div>
        <div class="bg-gray-300 h-4 w-3/4 rounded-lg animate-pulse"></div>
      </div>
    </div>

    <!-- Albümler yüklendiğinde grid görüntüle -->
    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10"
    >
      <div
        v-for="album in albumStore.albums"
        :key="album.id"
        class="border border-gray-300 rounded-lg shadow-md p-4 cursor-pointer hover:shadow-2xl transition duration-200 ease-in-out"
        @click="goToAlbumDetails(album.id)"
      >
        <div class="grid grid-cols-2 gap-2 mb-4">
          <img
            v-for="(photo, index) in album.photos.slice(0, 4)"
            :key="photo.id + '-' + index"
            :src="photo.thumbnailUrl"
            :alt="photo.title"
            class="w-full"
          />
        </div>
        <p class="text-sm font-normal text-subtitle truncate">
          {{ album.title }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAlbumStore } from "../stores/albumStore.js";
import { useRoute, useRouter } from "vue-router";
import { onMounted } from "vue";
import GoHome from "./GoHome.vue";

const albumStore = useAlbumStore();
const route = useRoute();
const router = useRouter();

onMounted(() => {
  albumStore.fetchAlbums(route.params.id);
});

const goToAlbumDetails = (albumId) => {
  router.push({ name: "AlbumDetails", params: { albumId } }); // Albüm detayına yönlendir
};
</script>
