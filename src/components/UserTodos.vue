<template>
  <div>
    <GoHome />
    <div class="mt-28">
      <!-- Skeleton loader -->
      <div v-if="isLoading">
        <ul>
          <li v-for="n in 5" :key="n" class="flex pl-6 p-3 items-center gap-4">
            <div class="w-6 h-6 rounded-md bg-gray-300 animate-pulse"></div>
            <div class="w-full">
              <div class="h-4 bg-gray-300 rounded-md w-1/2 animate-pulse"></div>
            </div>
          </li>
        </ul>
      </div>

      <!-- Todos Yüklendiğinde -->
      <ul v-else>
        <li
          v-for="todo in todos"
          :key="todo.id"
          class="flex pl-6 p-3 items-center gap-4"
        >
          <label class="custom-checkbox flex items-center">
            <input type="checkbox" :checked="todo.completed" />
            <span class="checkmark"></span>
          </label>
          <span class="text-subtitle text-sm font-normal">{{
            todo.title
          }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import GoHome from "./GoHome.vue";

const todos = ref([]);
const isLoading = ref(true);
const route = useRoute();

onMounted(async () => {
  // İlk olarak, localStorage'da todos verileri var mı diye kontrol et
  const cachedTodos = localStorage.getItem(`todos_user_${route.params.id}`);

  if (cachedTodos) {
    // Eğer localStorage'da veri varsa, onu kullan
    todos.value = JSON.parse(cachedTodos);
    isLoading.value = false;
  } else {
    // Eğer localStorage'da veri yoksa, API'den veriyi çek ve localStorage'a kaydet
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/todos?userId=${route.params.id}`,
      );
      todos.value = response.data;
      localStorage.setItem(
        `todos_user_${route.params.id}`,
        JSON.stringify(todos.value),
      ); // Veriyi localStorage'a kaydet
    } catch (error) {
      console.error("Failed to load todos", error);
    } finally {
      isLoading.value = false; // Yükleme bittiğinde loading durumu kapatılır
    }
  }
});
</script>

<style scoped>
/* Gizli checkbox */
.custom-checkbox input[type="checkbox"] {
  display: none;
}

/* Custom checkbox stil */
.custom-checkbox .checkmark {
  display: inline-block;
  width: 18px;
  height: 18px;
  background-color: #f3f3f3;
  border: 2px solid #49454f; /* Mor renk */
  border-radius: 2px;
  position: relative;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease;
}

/* Checkbox işaretlendiğinde arka plan ve kenarlık */
.custom-checkbox input[type="checkbox"]:checked + .checkmark {
  background-color: #6750a4;
  border-color: #6750a4;
}

/* Check işareti (::after pseudo-element) */
.custom-checkbox .checkmark::after {
  content: "";
  position: absolute;
  top: 45%;
  left: 50%;
  width: 11px;
  height: 5px;
  border-left: 2px solid white;
  border-bottom: 2px solid white;
  transform: translate(-50%, -50%) rotate(-45deg);
  opacity: 0;
  transition: opacity 0.2s ease;
}

/* Checkbox işaretlendiğinde check işareti görünür hale gelir */
.custom-checkbox input[type="checkbox"]:checked + .checkmark::after {
  opacity: 1;
}

.custom-checkbox .checkmark:hover,
.custom-checkbox input[type="checkbox"]:focus + .checkmark {
  border-color: mediumpurple; /* Mor renk */
}
</style>
