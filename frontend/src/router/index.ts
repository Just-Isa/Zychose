import { createRouter, createWebHistory } from "vue-router";
import EditorView from "../views/EditorView.vue";
import RoomSelect from "@/components/RoomSelect.vue";
import ButtonJythonUpload from "@/components/ButtonJythonUpload.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/rooms",
      name: "Raumauswahl",
      component: RoomSelect,
    },
    {
      path: "/1",
      name: "Raum1",
      component: EditorView,
    },
    {
      path: "/2",
      name: "Raum2",
      component: EditorView,
    },
    {
      path: "/3",
      name: "Raum3",
      component: EditorView,
    },
    {
      path: "/4",
      name: "Raum4",
      component: EditorView,
    },
    {
      path: "/5",
      name: "Raum5",
      component: EditorView,
    },
    {
      path: "/upload",
      name: "Upload",
      component: ButtonJythonUpload,
    },
  ],
});

export default router;
