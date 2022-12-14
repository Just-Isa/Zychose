<template>
  <div
    class="pointer-events-auto bg-street-menu-bg-gray items-center bottom-6 p-1 shadow-lg"
    v-for="t in props.types"
    v-bind:key="t"
  >
    <StreetBlockIcon :type="t" />
  </div>
</template>

<script setup lang="ts">
import StreetBlockIcon from "./StreetBlockIcon.vue";

const props = defineProps<{
  types: string[];
}>();
</script>
