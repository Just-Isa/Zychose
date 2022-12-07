<template>
  <div
    id="bulldozer"
    @click="changeActiveState()"
    class="shadow-lg border-4 rounded-full bg-center bg-no-repeat ml-4 hover:cursor-pointer"
    :class="getActiveState() == type ? 'active border-white' : 'inactive'"
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

<style scoped>
#bulldozer {
  background-size: 65%;
  background-color: #ffd941; /* Tallwind Configuration nötig für custom-Farbvariable */
  height: 4em;
  width: 4em;
}

.inactive {
  background-image: url("../assets/img/bulldozer-grey.svg") !important;
  border-color: #4b5357; /* Tallwind Configuration nötig für custom-Farbvariable */
}

.active {
  background-image: url("../assets/img/bulldozer-white.svg") !important;
}
</style>
