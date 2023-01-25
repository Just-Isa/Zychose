<template>
  <main>
    <FadeToWhiteOverlay :isActive="showOverlay" />
    <Exit3DButton @click="changeTo2DView()" />
    <ThreeDGame />
  </main>
</template>

<script setup lang="ts">
import ThreeDGame from "@/views/threeD/ThreeDGame.vue";
import FadeToWhiteOverlay from "@/components/FadeToWhiteOverlay.vue";
import Exit3DButton from "@/components/Exit3DButton.vue";
import { useRoom } from "@/services/useRoom";
import { ref } from "vue";
const { roomState } = useRoom();

let showOverlay = ref(false);

window.addEventListener("keyup", (event) => {
  if (event.key === "Escape") {
    changeTo2DView();
  }
});

/**
 * Changes the View to the 2D-View
 */
function changeTo2DView() {
  showOverlay.value = true;
  setTimeout(function () {
    location.href = "/" + roomState.room.roomNumber;
  }, 800);
}
</script>
