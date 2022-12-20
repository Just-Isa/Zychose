<script setup lang="ts">
import MultiplayerCursors from "../components/MultiplayerCursors.vue";
import StreetMenu from "@/components/StreetMenu.vue";
import ExitRoomButton from "@/components/ExitRoomButton.vue";
import MapGrid from "@/components/MapGrid.vue";
import swtpConfig from "../../../swtp.config.json";
</script>

<template>
  <main>
    <ExitRoomButton />
    <MultiplayerCursors />
    <StreetMenu />
    <MapGrid v-bind:gridSize="swtpConfig.gridSize"></MapGrid>
  </main>
</template>
