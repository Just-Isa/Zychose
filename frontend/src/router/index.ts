import { createRouter, createWebHistory } from "vue-router";
import EditorView from "../views/EditorView.vue";
import RoomSelect from "@/components/RoomSelect.vue";
import ThreeDView from "../views/ThreeDView.vue";
import GenericResponseError from "@/components/errors/GenericResponseError.vue";
import ResetModal from "@/components/ResetModal.vue";

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
      name: "ErrorPage500",
      component: GenericResponseError,
    },
    {
      path: "/reset",
      name: "ResetModal",
      component: ResetModal,
    },
  ],
});

export default router;
