<template>
  <div>
    <GoHome />
    <div class="mt-10">
      <div v-if="postStore.isLoadingPosts && !postStore.isModalOpen">
        <ul>
          <li
            v-for="n in 5"
            :key="n"
            class="p-10 pt-4 border-b border-border flex flex-col"
          >
            <div
              class="h-6 bg-gray-300 rounded-md w-1/3 mb-4 animate-pulse"
            ></div>
            <div
              class="h-4 bg-gray-300 rounded-md w-1/2 mb-2 animate-pulse"
            ></div>
            <div class="h-4 bg-gray-300 rounded-md w-1/2 animate-pulse"></div>
          </li>
        </ul>
      </div>

      <div v-else>
        <div
          v-for="post in postStore.posts"
          :key="post.id"
          class="px-10 pt-4 pb-6 border-b border-border flex flex-col"
        >
          <div class="space-y-4">
            <h3 class="text-xl text-title font-medium mb-2 capitalize">
              {{ post.title }}
            </h3>
            <p class="text-subtitle text-sm font-normal w-1/2 text-wrap">
              {{ post.body }}
            </p>
          </div>
          <div
            class="flex items-center space-x-6 text-title text-sm font-normal cursor-pointer hover:text-primary w-auto mt-2 ml-auto"
            @click="postStore.openModal(post)"
          >
            <span class="font-semibold">See More</span>
            <ForwardIcon class="stroke-primary" />
          </div>
        </div>
      </div>

      <PostsModalWindow
        v-if="postStore.isModalOpen"
        :showModal="postStore.isModalOpen"
        :selectedPost="postStore.selectedPost"
        @close="postStore.closeModal"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { usePostStore } from "../stores/postStore.js";
import GoHome from "./GoHome.vue";
import ForwardIcon from "./icons/ForwardIcon.vue";
import PostsModalWindow from "./PostsModalWindow.vue";

const route = useRoute();
const postStore = usePostStore();

onMounted(() => {
  postStore.fetchPosts(route.params.id);
});
</script>
