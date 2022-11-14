<script setup lang="ts">
import { ref } from "vue";

const tiles = ref([
  { id: 1, title: "kreuzung"},
  { id: 2, title: "kurve"},
  { id: 3, title: "straß"},
  { id: 4, title: "sackgasse"},
]);

const playground = ref([]);


const startDrag = (event, tile) => {
  event.dataTransfer.dropEffect = "copy";
  event.dataTransfer.effectAllowed = "copy";
  event.dataTransfer.setData('tileID', tile.id);
  console.log("Ziehe dies: " + tile.title)
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
        id="Dragme"
        @dragstart="startDrag($event, tile)"
      >
        {{ tile.id }}
      </div>
    </div>

  </div>

  <footer class="navbar">
    <h2>MENÜ</h2>

    <div class="dropzone">
      <div
        v-for="tile in tiles"
        :key="tile"
        class="tile-el"
        draggable="true"
        id="Dragme"
        @dragstart="startDrag($event, tile)"
      >
        {{ tile.id }}
      </div>
    </div>

    <button class="Bagger" @click = "deleteTiles()">yeet</button>
</footer>
</div>
</template>

<style scoped>

.wrapper {
    background-color: beige;
}

.main {
  background-color: grey;
}

.navbar {
    background-color: lightgray;
    color: darkslategrey;
    height: 27em;
    width: 90em;
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

#Dragme:hover {
  cursor: -webkit-grab;
}

#Dragme:active {
  cursor: none;
}

</style>
