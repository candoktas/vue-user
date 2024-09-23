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
      this.posts = [];
      this.isLoadingPosts = true;
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
        );
        this.posts = response.data;
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        this.isLoadingPosts = false;
      }
    },

    // Seçilen postu set et ve modalı aç
    openModal(post) {
      this.selectedPost = post;
      this.isModalOpen = true;
      this.isLoadingModal = true;
      this.fetchComments(post.id);
    },

    // Modalı kapatma
    closeModal() {
      this.isModalOpen = false;
      this.selectedPost = null;
      this.comments = [];
    },

    // Posta ait yorumları ve avatarları fetch etme ve avatarları yüklenmesini bekleme
    async fetchComments(postId) {
      this.comments = [];
      this.isLoadingModal = true;
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/comments?postId=${postId}`,
        );
        const comments = response.data.map((comment) => ({
          ...comment,
          avatarUrl: `https://i.pravatar.cc/40?u=${comment.email}`,
        }));

        // Avatarların yüklenmesini Promise.all ile bekle
        const avatarPromises = comments.map(
          (comment) =>
            new Promise((resolve) => {
              const img = new Image();
              img.src = comment.avatarUrl;
              img.onload = () => resolve();
              img.onerror = () => resolve(); // Hata olsa bile devam et
            }),
        );

        // Tüm avatarların yüklenmesini bekle
        await Promise.all(avatarPromises);

        // Avatarlar yüklendikten sonra yorumları kaydet
        this.comments = comments;
      } catch (error) {
        console.error("Failed to fetch comments and avatars", error);
      } finally {
        this.isLoadingModal = false; // Yükleme tamamlandı
      }
    },
  },
});
