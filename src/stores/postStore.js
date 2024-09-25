import { defineStore } from "pinia";
import axios from "axios";

export const usePostStore = defineStore("postStore", {
  state: () => ({
    posts: JSON.parse(localStorage.getItem("posts")) || [],
    selectedPost: null,
    isModalOpen: false,
    comments: [],
    isLoadingPosts: false,
    isLoadingModal: false,
  }),

  actions: {
    async fetchPosts(userId) {
      const cachedPosts = JSON.parse(
        localStorage.getItem(`posts_user_${userId}`),
      );
      if (cachedPosts) {
        this.posts = cachedPosts;
        return;
      }

      this.posts = [];
      this.isLoadingPosts = true;
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
        );
        this.posts = response.data;
        localStorage.setItem(
          `posts_user_${userId}`,
          JSON.stringify(this.posts),
        );
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        this.isLoadingPosts = false;
      }
    },

    openModal(post) {
      this.selectedPost = post;
      this.isModalOpen = true;
      this.isLoadingModal = true;
      this.fetchComments(post.id);
    },

    closeModal() {
      this.isModalOpen = false;
      this.selectedPost = null;
      this.comments = [];
    },

    async fetchComments(postId) {
      const cachedComments = JSON.parse(
        localStorage.getItem(`comments_post_${postId}`),
      );
      if (cachedComments) {
        this.comments = cachedComments;
        this.isLoadingModal = false;
        return;
      }

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

        const avatarPromises = comments.map(
          (comment) =>
            new Promise((resolve) => {
              const img = new Image();
              img.src = comment.avatarUrl;
              img.onload = () => resolve();
              img.onerror = () => resolve();
            }),
        );

        await Promise.all(avatarPromises);

        localStorage.setItem(
          `comments_post_${postId}`,
          JSON.stringify(comments),
        );

        this.comments = comments;
      } catch (error) {
        console.error("Failed to fetch comments and avatars", error);
      } finally {
        this.isLoadingModal = false;
      }
    },
  },
});
