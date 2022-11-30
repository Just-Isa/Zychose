<template>
  <span class="tile-ele"></span>
</template>

<script setup lang="ts"></script>

<style scoped>
.tile-ele {
  height: 6em;
  width: 6em;
  margin: 0.5em;
  display: inline-block;
  background-color: #e4f9ff;
  border-radius: 0.5em;
}

.tile-ele:hover {
  cursor: url("../assets/img/street-road.png"), auto;
}
</style>
