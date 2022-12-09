<template>
  <div
    id="bulldozer"
    @click="changeActiveState()"
    class="shadow-lg border-4 rounded-full bg-center bg-no-repeat ml-4 hover:cursor-pointer bg-bulldozer-yellow h-16 w-16 mt-2 bg-65%"
    :class="
      getActiveState() == type
        ? 'active border-white bg-bulldozer-active'
        : 'inactive border-bulldozer-gray bg-bulldozer-inactive'
    "
  ></div>
</template>

<script setup lang="ts">
import { useTile } from "@/services/useTileState";

const { setActiveState, getActiveState } = useTile();

const type = "delete";

/**
 * change activeState
 */
function changeActiveState() {
  const entireDoc = document.documentElement;

  if (getActiveState() == type) {
    setActiveState("");
    if (entireDoc) {
      entireDoc.style.cursor = "default";
    }
  } else {
    setActiveState(type);
    if (entireDoc) {
      entireDoc.style.cursor =
        'url("src/assets/img/bulldozer.svg") 25 25, auto';
    }
  }
}
</script>
