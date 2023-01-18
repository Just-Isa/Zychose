<template>
  <div
    class="pointer-events-auto flex flex-wrap rounded-b-lg rounded-tr-lg bg-street-menu-bg-gray items-center bottom-6 p-1 shadow-lg w-[25.5rem] h-[6.3rem] min-w-[23.5rem] overflow-hidden"
  >
    <div
      id="scrollbox"
      class="flex flex-wrap mh-[6.3rem] w-[23.5rem] h-[6.3rem] min-w-[23.5rem] overflow-hidden"
    >
      <div v-for="t in props.types" v-bind:key="t.name">
        <StreetBlockIcon :currentBlock="t" />
      </div>
      <div class="p-[5em]"></div>
    </div>
    <div>
      <a
        @click="scrollByGivenValue(-1 * streetBlockSize)"
        class="pointer-events-auto absolute -mt-8 -ml-[0.45rem]"
      >
        <img
          src="/assets/img/arrow-pictogram.svg"
          alt="arrow-up"
          class="h-7 w-7 rotate-180"
        />
      </a>
      <a
        @click="scrollByGivenValue(streetBlockSize)"
        class="pointer-events-auto absolute -ml-[0.45rem]"
      >
        <img
          src="/assets/img/arrow-pictogram.svg"
          alt="arrow-down"
          class="h-7 w-7"
        />
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import StreetBlockIcon from "./StreetBlockIcon.vue";
import type { StreetBlock } from "@/services/IStreetBlock";
import { ref, watch } from "vue";
import { useStreetBlock } from "@/services/useStreetBlock";

const { resetCurrentChangedTab, menuTabState } = useStreetBlock();

const props = defineProps<{
  types: StreetBlock[];
}>();

let scrollHeight = ref(0);
// Größe des StreetBlocks - ergo Reihenhöhe beim Scrollen. Hat sich so nach mehrfachem Testen als bester Wert erwiesen
const streetBlockSize = 92;
const maxScrollHeight =
  Math.ceil(props.types.length / 4) * streetBlockSize - streetBlockSize;

watch(menuTabState, () => {
  if (menuTabState.currentTabChanged) {
    let currentMenu = document.getElementById("scrollbox") as HTMLElement;

    if (currentMenu) {
      currentMenu.scroll({
        top: 0,
        behavior: "auto",
      });
    }
    scrollHeight.value = 0;
    resetCurrentChangedTab();
  }
});

function scrollByGivenValue(additionalInput: number) {
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
    currentMenu.scroll({
      top: scrollHeight.value,
      behavior: "smooth",
    });
  }
}
</script>
