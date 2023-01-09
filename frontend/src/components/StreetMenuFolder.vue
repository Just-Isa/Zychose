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
      <div class="p-[5em]"></div>
    </div>
  </div>
  <div>
    <a
      @click="thereAndBackAgain(streetBlockSize)"
      class="pointer-events-auto h-1em absolute -mt-4 p-3 bg-cyan-400 ml-20"
    >
      DOWN
    </a>
    <a
      @click="thereAndBackAgain(-1 * streetBlockSize)"
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

let scrollHeight = ref(0);
const streetBlockSize = 92;
const maxScrollHeight =
  Math.ceil(props.types.length / 4) * streetBlockSize - streetBlockSize;

function thereAndBackAgain(additionalInput: number) {
  if (scrollHeight.value == maxScrollHeight) {
    if (additionalInput < 0) {
      scrollHeight.value += additionalInput;
    } else {
      scrollHeight.value = maxScrollHeight;
    }
  } else if (scrollHeight.value == 0) {
    if (additionalInput > 0) {
      scrollHeight.value += additionalInput;
    } else {
      scrollHeight.value = 0;
    }
  } else {
    scrollHeight.value += additionalInput;
  }

  let currentMenu = document.getElementById("scrollbox") as HTMLElement;
  if (currentMenu) {
    currentMenu.scrollTop = scrollHeight.value;
  }
}
</script>
