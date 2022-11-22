<template>
  <span class="tile-ele"></span>
</template>

<script setup lang="ts">
import type { ITileItem } from "@/services/ITileItem";

defineProps<{
  tile: ITileItem;
}>();
</script>

<style scoped>
.tile-ele {
  height: 6.1em;
  width: 6.1em;
  margin: 1em;
  display: inline-block;
}

.tile-ele:active {
  background-color: #95e8ff;
  border-radius: 1em;
}
</style>
