import EditorViewVue from "@/views/EditorView.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Editor",
      component: EditorViewVue,
    },
  ],
});

export default router;
