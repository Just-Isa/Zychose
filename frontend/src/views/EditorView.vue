<script setup lang="ts">
import MultiplayerCursors from "../components/MultiplayerCursors.vue";
import GridComponent from "@/components/grid/GridComponent.vue";
import ExitRoomButton from "@/components/ExitRoomButton.vue";
</script>

<template>
  <main>
    <ExitRoomButton />
    <MultiplayerCursors />
    <GridComponent v-bind:gridSize="100"></GridComponent>
  </main>
</template>
