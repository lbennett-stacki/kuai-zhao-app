import { createRouter, createWebHistory } from "vue-router";
import SnapsView from "../views/SnapsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "snaps",
      component: SnapsView,
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    { path: "/:pathMatch(.*)*", redirect: "/" },
  ],
});

export default router;
