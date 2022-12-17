<template>
  <div
    class="pointer-events-auto bg-street-menu-bg-gray items-center bottom-6 p-1 shadow-lg w-95"
  >
    <div v-for="t in props.types" v-bind:key="t.type">
      <StreetBlockIcon :currentBlock="t" />
    </div>
  </div>
</template>

<script setup lang="ts">
import StreetBlockIcon from "./StreetBlockIcon.vue";
import type { StreetBlock } from "@/services/IStreetBlock";

const props = defineProps<{
  types: StreetBlock[];
}>();
</script>
