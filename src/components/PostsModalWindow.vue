<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    v-if="postStore.isModalOpen"
  >
    <div
      class="bg-white w-[70%] h-[80%] rounded-xl p-6 overflow-y-auto relative"
    >
      <!-- Kapatma Butonu (Sticky pozisyon) -->
      <button
        @click="postStore.closeModal"
        class="text-gray-500 hover:text-gray-700 sticky top-0 right-0 z-50 float-right"
      >
        <CloseIcon />
      </button>

      <!-- Modal Yükleniyorsa Spinner -->
      <div
        v-if="postStore.isLoadingModal"
        class="flex justify-center items-center h-full"
      >
        <div
          class="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"
        ></div>
      </div>

      <!-- Modal Yüklendiyse İçerik -->
      <div v-else class="flex-col">
        <!-- Sol Post Başlığı ve Body -->
        <div class="flex items-center justify-between mb-10">
          <h3 class="text-2xl text-title font-medium capitalize">
            {{ postStore.selectedPost.title }}
          </h3>
        </div>

        <div class="flex p-6 text-wrap">
          <div class="w-2/3 border-r border-border overflow-y-auto">
            <p class="text-sm text-subtitle pr-8 font-normal">
              {{ postStore.selectedPost.body }}
            </p>
          </div>

          <!-- Sağ Yorumlar -->
          <div class="w-1/3 overflow-y-auto pl-8">
            <h4 class="text-xl font-semibold text-title mb-10">Comments</h4>
            <ul>
              <li
                v-for="comment in postStore.comments"
                :key="comment.id"
                class="mb-6"
              >
                <div class="flex space-x-4 mb-10">
                  <img
                    :src="comment.avatarUrl"
                    class="rounded-full w-10 h-10"
                    alt="User Avatar"
                  />
                  <div class="space-y-2">
                    <p class="text-sm text-title font-medium capitalize">
                      {{ comment.name }}
                    </p>
                    <p class="text-sm text-subtitle font-normal">
                      {{ comment.body }}
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePostStore } from "../stores/postStore.js";
import CloseIcon from "./icons/CloseIcon.vue";

const postStore = usePostStore();
</script>
