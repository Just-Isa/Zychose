import { createRouter, createWebHistory } from "vue-router";
import EditorView from "../views/EditorView.vue";
import ThreeDView from "../views/ThreeDView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "editor",
      component: EditorView,
    },
    {
      path: "/3D",
      name: "fpv",
      component: ThreeDView,
    },
  ],
});

export default router;
