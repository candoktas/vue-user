<template>
  <div>
    <GoHome />
    <div class="mt-28">
      <div v-if="userStore.isLoadingTodos">
        <ul>
          <li v-for="n in 5" :key="n" class="flex pl-6 p-3 items-center gap-4">
            <div class="w-6 h-6 rounded-md bg-gray-300 animate-pulse"></div>
            <div class="w-full">
              <div class="h-4 bg-gray-300 rounded-md w-1/2 animate-pulse"></div>
            </div>
          </li>
        </ul>
      </div>

      <ul v-else>
        <li
          v-for="todo in userStore.todos"
          :key="todo.id"
          class="flex pl-6 p-3 items-center gap-4"
        >
          <label class="custom-checkbox flex items-center">
            <input
              type="checkbox"
              :checked="todo.completed"
              @change="toggleTodo(todo)"
            />
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
import { onMounted } from "vue";
import { useUserStore } from "../stores/userStore";
import { useRoute } from "vue-router";
import GoHome from "./GoHome.vue";

const userStore = useUserStore();
const route = useRoute();

onMounted(() => {
  userStore.fetchTodos(route.params.id);
});

const toggleTodo = (todo) => {
  const updatedTodo = { ...todo, completed: !todo.completed };
  userStore.updateTodo(updatedTodo);
};
</script>

<style scoped>
.custom-checkbox input[type="checkbox"] {
  display: none;
}

.custom-checkbox .checkmark {
  display: inline-block;
  width: 18px;
  height: 18px;
  background-color: #f3f3f3;
  border: 2px solid #49454f;
  border-radius: 2px;
  position: relative;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease;
}

.custom-checkbox input[type="checkbox"]:checked + .checkmark {
  background-color: #6750a4;
  border-color: #6750a4;
}

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

.custom-checkbox input[type="checkbox"]:checked + .checkmark::after {
  opacity: 1;
}

.custom-checkbox .checkmark:hover,
.custom-checkbox input[type="checkbox"]:focus + .checkmark {
  border-color: mediumpurple;
}
</style>
