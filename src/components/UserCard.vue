<template>
  <div
    class="bg-white max-w-60 md:max-w-full min-w-52 lg:min-w-80 border border-border shadow-md hover:shadow-2xl rounded-lg p-4 m-2 lg:p-8 lg:m-2 transition duration-200 ease-in-out cursor-pointer"
    @click="goToUserDetails"
  >
    <div class="flex items-center space-x-4 lg:space-x-8 w-full">
      <img
        :src="'https://i.pravatar.cc/150?u=' + user.id"
        alt="User Avatar"
        class="w-12 h-12 lg:w-24 lg:h-24 rounded-full"
      />
      <div>
        <h2 class="text-sm lg:text-lg text-title font-medium">
          {{ user.name }}
        </h2>
        <p class="text-xs lg:text-sm text-subtitle font-light break-all">
          {{ user.email }}
        </p>
        <p class="text-xs lg:text-sm text-subtitle font-light">
          {{ user.phone }}
        </p>
      </div>
    </div>
    <div class="mt-10 space-y-6">
      <div class="flex flex-col space-y-2">
        <div
          class="flex gap-3 text-xs lg:text-sm font-medium text-title pl-1 items-center"
        >
          <LocationIcon />
          <p>Location</p>
        </div>
        <p class="flex text-xs lg:text-sm text-subtitle font-light">
          <i class="fas fa-map-marker-alt mr-2"></i>{{ user.address.city }}
        </p>
      </div>
      <div class="flex flex-col space-y-2">
        <div
          class="flex gap-3 text-xs lg:text-sm font-medium text-title pl-1 items-center"
        >
          <CompanyIcon />
          <p>Company</p>
        </div>
        <p class="flex text-xs lg:text-sm text-subtitle font-light">
          <i class="fas fa-building mr-2"></i>{{ user.company.name }}
        </p>
      </div>
      <div class="flex flex-col space-y-2">
        <div
          class="flex gap-3 text-xs lg:text-sm font-medium text-title pl-1 items-center"
        >
          <WebsiteIcon />
          <p>Website</p>
        </div>
        <p class="flex text-xs lg:text-sm text-subtitle font-light">
          <i class="fas fa-globe mr-2"></i>{{ user.website }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import LocationIcon from "./icons/LocationIcon.vue";
import CompanyIcon from "./icons/CompanyIcon.vue";
import WebsiteIcon from "./icons/WebsiteIcon.vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/userStore.js"; // userStore'u import edin

// Props ile gelen user objesi
const props = defineProps({
  user: Object,
});

const router = useRouter();
const userStore = useUserStore(); // userStore'u kullanın

// Yönlendirme fonksiyonu
const goToUserDetails = () => {
  // Seçilen kullanıcıyı store'a kaydediyoruz
  userStore.setSelectedUser(props.user);
  // UserDetails sayfasına yönlendiriyoruz
  router.push(`/user/${props.user.id}`);
};
</script>

<style scoped>
/* Kart tasarımı için stiller */
</style>
