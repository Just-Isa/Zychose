import { createRouter, createWebHistory } from "vue-router";
import EditorView from "../views/EditorView.vue";
import RoomSelect from "@/components/RoomSelect.vue";
import ThreeDView from "../views/ThreeDView.vue";
import Error500 from "@/views/errors/Error500.vue";
import ResetInfoView from "@/views/ResetInfoView.vue";

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
      path: "/3D",
      name: "fpv",
      component: ThreeDView,
    },
    {
      path: "/500",
      name: "Error500",
      component: Error500,
    },
    {
      path: "/reset",
      name: "ResetInfoView",
      component: ResetInfoView,
    },
  ],
});

export default router;
