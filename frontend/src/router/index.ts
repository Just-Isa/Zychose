import { createRouter, createWebHistory } from "vue-router";
import EditorView from "../views/EditorView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Editor View",
      component: EditorView,
    },
  ],
});

export default router;
