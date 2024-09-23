// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "../components/HomePage.vue";
import UserDetails from "../components/UserDetails.vue";
import UserList from "../components/UserList.vue";
import UserTodos from "../components/UserTodos.vue";
import UserPosts from "../components/UserPosts.vue"; // Yeni import
import UserAlbums from "../components/UserAlbums.vue"; // Yeni import

const routes = [
  {
    path: "/",
    component: DefaultLayout,
    children: [
      {
        path: "",
        name: "UserList",
        component: UserList,
      },
    ],
  },
  {
    path: "/user/:id",
    component: UserDetails,
    children: [
      {
        path: "",
        redirect: (to) => {
          return { name: "UserTodos", params: { id: to.params.id } };
        },
      },
      {
        path: "todos",
        name: "UserTodos",
        component: UserTodos,
      },
      {
        path: "posts",
        name: "UserPosts",
        component: UserPosts,
      },
      {
        path: "albums",
        name: "UserAlbums",
        component: UserAlbums,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;