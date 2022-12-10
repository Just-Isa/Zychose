<template>
  <main>
    <a class="exitToRoomList" v-on:click="hoden()" :href="'#'"> Klickung </a>
  </main>
</template>

<script setup lang="ts">
import { useRoom } from "@/services/useRoom";

const { removeUserFromRoom } = useRoom();

function hoden() {
  removeUserFromRoom();
  location.href = "/rooms";
}
</script>

<style>
.exitToRoomList {
  position: fixed;
  z-index: 999;
}
</style>
