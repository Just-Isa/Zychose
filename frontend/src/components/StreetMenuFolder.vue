<template>
  <div
    class="bg-street-menu-bg-gray items-center bottom-6 p-1 shadow-lg"
    v-for="t in types"
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
