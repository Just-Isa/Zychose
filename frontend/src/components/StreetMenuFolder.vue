<template>
  <div
    class="pointer-events-auto flex rounded-b-lg rounded-tr-lg bg-street-menu-bg-gray items-center bottom-6 p-1 shadow-lg w-[23.5rem]"
  >
    <div v-for="t in props.types" v-bind:key="t.name">
      <StreetBlockIcon :currentBlock="t" />
    </div>
  </div>
</template>

<script setup lang="ts">
import StreetBlockIcon from "./StreetBlockIcon.vue";
import type { StreetBlock } from "@/model/IStreetBlock";

const props = defineProps<{
  types: StreetBlock[];
}>();
</script>
