<script setup lang="ts">
import MultiplayerCursors from "../components/MultiplayerCursors.vue";
import GridComponent from "@/components/grid/GridComponent.vue";
import StreetTileMenu from "@/components/StreetTileMenu.vue";
</script>

<template>
  <main>
    <MultiplayerCursors />
    <GridComponent v-bind:gridSize="100"></GridComponent>
    <StreetTileMenu />
  </main>
</template>
