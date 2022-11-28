<script setup lang="ts">
import MultiplayerCursors from "../components/MultiplayerCursors.vue";
import GridComponent from "@/components/grid/GridComponent.vue";
</script>

<template>
  <main>
    <MultiplayerCursors />
    <GridComponent v-bind:gridSize="100"></GridComponent>
  </main>
</template>
