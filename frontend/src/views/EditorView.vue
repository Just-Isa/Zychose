<script setup lang="ts">
import MultiplayerCursors from "../components/MultiplayerCursors.vue";
import MapGrid from "@/components/MapGrid.vue";
</script>

<template>
  <main>
    <MultiplayerCursors />
    <MapGrid v-bind:gridSize="100"></MapGrid>
  </main>
</template>
