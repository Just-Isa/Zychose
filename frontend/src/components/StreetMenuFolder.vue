<template>
  <div
    class="pointer-events-auto flex flex-wrap rounded-b-lg rounded-tr-lg bg-street-menu-bg-gray items-center bottom-6 p-1 shadow-lg w-[23.5rem] h-[6.3rem] min-w-[23.5rem] overflow-hidden"
  >
    <div
      id="scrollbox"
      class="flex flex-wrap mh-[6.3rem] w-[23.5rem] h-[6.3rem] min-w-[23.5rem] overflow-hidden scroll-smooth"
    >
      <div v-for="t in props.types" v-bind:key="t.name">
        <StreetBlockIcon :currentBlock="t" />
      </div>
      <div class="p-10"></div>
    </div>
  </div>
  <div>
    <a
      @click="thereAndBackAgain(minCeiling)"
      class="pointer-events-auto h-1em absolute -mt-4 p-3 bg-cyan-400 ml-20"
    >
      DOWN
    </a>
    <a
      @click="thereAndBackAgain(-1 * minCeiling)"
      class="pointer-events-auto h-1em absolute -mt-4 ml-5 p-3 bg-red-400"
    >
      UP
    </a>
  </div>
</template>

<script setup lang="ts">
import StreetBlockIcon from "./StreetBlockIcon.vue";
import type { StreetBlock } from "@/services/IStreetBlock";
import { ref } from "vue";

const props = defineProps<{
  types: StreetBlock[];
}>();

let howMuch = ref(0);
const minCeiling = 92;

function thereAndBackAgain(additionalInput: number) {
  howMuch.value += additionalInput;

  if (howMuch.value < minCeiling) {
    howMuch.value = 0;
  }

  let currentMenu = document.getElementById("scrollbox") as HTMLElement;
  if (currentMenu) {
    currentMenu.scrollTop = howMuch.value;
  }
}

console.log("LÄNGE: " + props.types.length);
</script>
