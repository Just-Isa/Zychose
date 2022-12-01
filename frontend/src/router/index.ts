import { createRouter, createWebHistory } from "vue-router";
import EditorView from "../views/EditorView.vue";
import RoomSelect from "@/components/RoomSelect.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "editor",
      component: EditorView,
    },
    {
      path: "/rooms",
      name: "Raumauswahl",
      component: RoomSelect
    }
  ],
});

export default router;
