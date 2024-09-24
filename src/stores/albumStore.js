import { defineStore } from "pinia";
import axios from "axios";

export const useAlbumStore = defineStore("albumStore", {
  state: () => ({
    albums: JSON.parse(localStorage.getItem("albums")) || [],
    selectedAlbumPhotos: [],
    isLoadingAlbums: false,
    isLoadingPhotos: false,
  }),

  actions: {
    async fetchAlbums(userId) {
      const cachedAlbums = JSON.parse(
        localStorage.getItem(`albums_user_${userId}`),
      );
      if (cachedAlbums) {
        this.albums = cachedAlbums; // Eğer localStorage'da varsa oradan al
        return;
      }

      this.albums = [];
      this.isLoadingAlbums = true;
      try {
        const [fetchedAlbums, allPhotos] = await Promise.all([
          axios.get(
            `https://jsonplaceholder.typicode.com/albums?userId=${userId}`,
          ),
          axios.get(`https://jsonplaceholder.typicode.com/photos`),
        ]);

        fetchedAlbums.data.forEach((album) => {
          album.photos = allPhotos.data.filter(
            (photo) => photo.albumId === album.id,
          );
        });

        // Albümleri localStorage'a kaydet
        localStorage.setItem(
          `albums_user_${userId}`,
          JSON.stringify(fetchedAlbums.data),
        );
        this.albums = fetchedAlbums.data;
      } catch (error) {
        console.error("Error fetching albums or photos:", error);
      } finally {
        this.isLoadingAlbums = false;
      }
    },

    async fetchAlbumById(albumId) {
      this.selectedAlbumPhotos = [];
      this.isLoadingPhotos = true;
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`,
        );
        this.selectedAlbumPhotos = response.data;
      } catch (error) {
        console.error("Error fetching album photos:", error);
      } finally {
        this.isLoadingPhotos = false;
      }
    },
  },
});
