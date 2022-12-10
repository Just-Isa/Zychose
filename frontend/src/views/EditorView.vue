<script setup lang="ts">
import MultiplayerCursors from "../components/MultiplayerCursors.vue";
import GridComponent from "@/components/grid/GridComponent.vue";
import BackToRoomlistButtonVue from "@/components/BackToRoomlistButton.vue";
</script>

<template>
  <main>
    <BackToRoomlistButtonVue />
    <MultiplayerCursors />
    <GridComponent v-bind:gridSize="100"></GridComponent>
  </main>
</template>
