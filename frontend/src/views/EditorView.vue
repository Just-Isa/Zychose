<script setup lang="ts">
import MultiplayerCursors from "../components/MultiplayerCursors.vue";
import GridComponent from "@/components/grid/GridComponent.vue";
import StreetMenu from "@/components/StreetMenu.vue";
</script>

<template>
  <main>
    <MultiplayerCursors />
    <GridComponent v-bind:gridSize="100"></GridComponent>
    <StreetMenu />
  </main>
</template>
