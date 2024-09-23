<template>
  <div
    class="bg-white w-[30%] border border-border shadow-md hover:shadow-2xl rounded-lg p-8 m-2 transition duration-200 ease-in-out cursor-pointer"
    @click="goToUserDetails"
  >
    <div class="flex items-center space-x-12">
      <img
        :src="'https://i.pravatar.cc/150?u=' + user.id"
        alt="User Avatar"
        class="w-24 h-24 rounded-full"
      />
      <div>
        <h2 class="text-lg font-bold">{{ user.name }}</h2>
        <p>{{ user.email }}</p>
        <p>{{ user.phone }}</p>
      </div>
    </div>
    <div class="mt-4">
      <div class="flex flex-col mb-4 space-y-2 justify-center">
        <div class="flex">
          <LocationIcon />
          <p>Location</p>
        </div>
        <p class="flex items-center">
          <i class="fas fa-map-marker-alt mr-2"></i>{{ user.address.city }}
        </p>
      </div>
      <div class="flex flex-col mb-4 space-y-2 justify-center">
        <div class="flex">
          <CompanyIcon />
          <p>Company</p>
        </div>
        <p class="flex items-center">
          <i class="fas fa-building mr-2"></i>{{ user.company.name }}
        </p>
      </div>
      <div class="flex flex-col mb-4 space-y-2 justify-center">
        <div class="flex">
          <WebsiteIcon />
          <p>Website</p>
        </div>
        <p class="flex items-center">
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
