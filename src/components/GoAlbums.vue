<template>
  <div class="flex items-center space-x-20">
    <button
      @click="goHome"
      class="text-xl flex items-center space-x-6 text-title font-semibold cursor-pointer hover:text-primary group"
    >
      <BackIcon class="group-hover:stroke-primary" />
      <span>Go Albums</span>
    </button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import BackIcon from "./icons/BackIcon.vue";

const router = useRouter();

// Ana sayfaya yönlendirme
const goHome = () => {
  router.push({ name: "UserAlbums" });
};
</script>
