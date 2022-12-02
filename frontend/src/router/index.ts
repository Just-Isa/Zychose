import { createRouter, createWebHistory } from "vue-router";
import EditorView from "../views/EditorView.vue";
import RoomSelect from "@/components/RoomSelect.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Raumauswahl",
      component: RoomSelect
    },
    {
      path: "/room/1",
      name: "Raum1",
      component: EditorView
    },
    {
      path: "/room/2",
      name: "Raum2",
      component: EditorView
    },
    {
      path: "/room/3",
      name: "Raum3",
      component: EditorView
    },
    {
      path: "/room/4",
      name: "Raum4",
      component: EditorView
    },
    {
      path: "/room/5",
      name: "Raum5",
      component: EditorView
    }
  ],
});

export default router;
