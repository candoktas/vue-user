// stores/postStore.js
import { defineStore } from "pinia";
import axios from "axios";

export const usePostStore = defineStore("postStore", {
  state: () => ({
    posts: [],
    selectedPost: null,
    isModalOpen: false,
    comments: [],
    isLoadingPosts: false, // Postları yüklerken kullanacağımız loading state
    isLoadingModal: false, // Modal içeriği yüklenirken kullanacağımız loading state
  }),

  actions: {
    // Postları fetch etme
    async fetchPosts(userId) {
      this.posts = []; // Posts'u sıfırla
      this.isLoadingPosts = true; // Postlar yüklenirken loading başlasın
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
        );
        this.posts = response.data;
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        this.isLoadingPosts = false; // Postlar yüklendiğinde loading biter
      }
    },

    // Seçilen postu set et ve modalı aç
    openModal(post) {
      this.selectedPost = post;
      this.isModalOpen = true;
      this.isLoadingModal = true; // Modal açılınca loading başlasın
      this.fetchComments(post.id);
    },

    // Modalı kapatma
    closeModal() {
      this.isModalOpen = false;
      this.selectedPost = null;
      this.comments = [];
    },

    // Posta ait yorumları getirme
    async fetchComments(postId) {
      this.comments = []; // Yorumları sıfırla
      this.isLoadingModal = true; // Yorumlar yüklenirken loading başlasın
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/comments?postId=${postId}`,
        );
        this.comments = response.data;
      } catch (error) {
        console.error("Failed to fetch comments:", error);
      } finally {
        this.isLoadingModal = false; // Yorumlar yüklendiğinde loading biter
      }
    },
  },
});
