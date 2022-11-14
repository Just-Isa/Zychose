<script setup lang="ts">
import { ref } from "vue";

const tiles = ref([
  { id: 1, title: "1", list: 1 },
  { id: 2, title: "2", list: 1 },
  { id: 3, title: "3", list: 2 },
  { id: 4, title: "4", list: 2 },
]);

const playground = ref([]);


const startDrag = (event, tile) => {
  event.dataTransfer.dropEffect = "copy";
  event.dataTransfer.effectAllowed = "copy";
  event.dataTransfer.setData('tileID', tile.id);
};

const onDrop = (event) => {
  const tileID = event.dataTransfer.getData('tileID')
  const tile = tiles.value.find((tile) => tile.id == tileID)
  playground.value.push(tile);

};

function deleteTiles() {
    playground.value = []
}


</script>


<template>
<div class="wrapper">
  <div class="main">
    <h1>MAIN</h1>

    <div class="dropzone" @drop="onDrop($event)" @dragenter.prevent @dragover.prevent>
      <div
        v-for="tile in playground"
        :key="tile"
        class="tile-el"
        draggable="true"
        @dragstart="startDrag($event, tile)"
      >
        {{ tile.title }}
      </div>
    </div>

  </div>

  <div class="sidebar">
    <h2>SIDEBAR</h2>

    <div class="dropzone">
      <div
        v-for="tile in tiles"
        :key="tile"
        class="tile-el"
        draggable="true"
        @dragstart="startDrag($event, tile)"
      >
        {{ tile.title }}
      </div>
    </div>

    <button class="Bagger" @click = "deleteTiles()">yeet</button>
  </div>
</div>
</template>

<style scoped>

.wrapper {
    width: 500px;
    border: 1px solid black;
    overflow: auto;
}

.main {
  background-color: grey;
  height: 100vh;
  width: 400px;
  display: block;
  float: left;
  overflow: hidden;
  left: 200px;
  position: absolute;
}

.sidebar {
  background-color: lightgray;
  display: block;
  color: darkslategrey;
  height: 100vh;
  width: 200px;
  position: sticky;
  float: left;
  overflow: hidden;
  /*visibility: hidden;*/
}

.tile-el {
  background-color: blue;
  padding: 1em;
  margin: 1em;
  width: 50px;
  height: 50px;
}

.dropzone {
  width: 50%;
  margin: 1em auto;
  min-height: 50px;
  padding: 1em;
  color: white;
  background-color: aquamarine;
}

</style>
