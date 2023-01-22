<template>
  <div id="wrapper">
    <Exit3DButton @click="changeTo2DView()" />
  </div>
</template>

<script setup lang="ts">
import Exit3DButton from "@/components/Exit3DButton.vue";
import { useRoom } from "@/services/useRoom";
const { roomState } = useRoom();

window.addEventListener("keyup", (event) => {
  if (event.key === "Escape") {
    changeTo2DView();
  }
});

/**
 * Changes the View to the 2D-View
 */
function changeTo2DView() {
  let wrapper = document.getElementById("wrapper");
  if (wrapper != null) {
    wrapper.classList.add(
      "absolute",
      "duration-1000",
      "bg-white",
      "h-screen",
      "w-screen"
    );
  }
  setTimeout(function () {
    location.href = "/" + roomState.room.roomNumber;
  }, 800);
}
</script>
