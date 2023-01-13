<template>
  <div
    class="pointer-events-auto flex flex-wrap rounded-b-lg rounded-tr-lg bg-street-menu-bg-gray items-center bottom-6 p-1 shadow-lg w-[25.5rem] h-[6.3rem] min-w-[23.5rem] overflow-hidden"
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
    <div>
      <a
        @click="thereAndBackAgain(-1 * streetBlockSize)"
        class="pointer-events-auto absolute -mt-8 -ml-[0.45rem]"
      >
        <svg
          width="512"
          height="512"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          class="absolute h-7 w-7 fill-street-menu-tile-bg-turquoise"
        >
          <path
            d="M18,15.5a1,1,0,0,1-.71-.29l-4.58-4.59a1,1,0,0,0-1.42,0L6.71,15.21a1,1,0,0,1-1.42-1.42L9.88,9.21a3.06,3.06,0,0,1,4.24,0l4.59,4.58a1,1,0,0,1,0,1.42A1,1,0,0,1,18,15.5Z"
          />
        </svg>
      </a>
      <a
        @click="thereAndBackAgain(streetBlockSize)"
        class="pointer-events-auto absolute -ml-[0.45rem]"
      >
        <svg
          width="512"
          height="512"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          class="absolute h-7 w-7 fill-street-menu-tile-bg-turquoise"
        >
          <path
            d="m18.71 8.21a1 1 0 0 0-1.42 0l-4.58 4.58a1 1 0 0 1-1.42 0l-4.58-4.58a1 1 0 0 0-1.42 0 1 1 0 0 0 0 1.41l4.59 4.59a3 3 0 0 0 4.24 0l4.59-4.59a1 1 0 0 0 0-1.41z"
          />
        </svg>
      </a>
    </div>
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
