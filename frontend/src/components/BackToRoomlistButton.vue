<template>
  <main>
    <a class="exitToRoomList" v-on:click="hoden()" :href="'#'"> Klickung </a>
  </main>
</template>

<script setup lang="ts">
function hoden() {
  location.href = "/rooms";
  console.log("hoden");
}
</script>

<style>
.exitToRoomList {
  position: fixed;
  z-index: 999;
}
</style>
