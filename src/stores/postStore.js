// stores/postStore.js
import { defineStore } from "pinia";
import axios from "axios";

export const usePostStore = defineStore("postStore", {
  state: () => ({
    posts: [],
    selectedPost: null,
    isModalOpen: false,
    comments: [],
    isLoading: false, // Loading state
  }),

  actions: {
    // Postları fetch etme
    async fetchPosts(userId) {
      this.posts = []; // Posts'u sıfırla
      this.isLoading = true; // Loading başlasın
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
        );
        this.posts = response.data;
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        this.isLoading = false; // Veri yüklendiğinde loading biter
      }
    },

    // Seçilen postu set et ve modalı aç
    openModal(post) {
      this.selectedPost = post;
      this.isModalOpen = true;
      this.isLoading = true; // Modal açılınca loading başlasın
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
      this.isLoading = true; // Yorumlar yüklenirken loading başlasın
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/comments?postId=${postId}`,
        );
        this.comments = response.data;
      } catch (error) {
        console.error("Failed to fetch comments:", error);
      } finally {
        this.isLoading = false; // Yorumlar yüklendiğinde loading biter
      }
    },
  },
});
