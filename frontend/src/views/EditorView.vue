<script setup lang="ts">
import MultiplayerCursors from "../components/MultiplayerCursors.vue";
import MapGrid from "@/components/MapGrid.vue";
import swtpConfig from "../../../swtp.config.json";
</script>

<template>
  <main>
    <MultiplayerCursors />
    <MapGrid v-bind:gridSize="swtpConfig.gridSize"></MapGrid>
  </main>
</template>
