<script setup lang="ts">
import { ref } from "vue";

const tiles = ref([
  { id: 1, title: "uno", list: 1 },
  { id: 2, title: "dou", list: 1 },
  { id: 3, title: "tres", list: 1 },
  { id: 4, title: "quatro", list: 1 },
]);

const getList = (list) => {
  return tiles.value.filter((tile) => tile.list == list);
};

const startDrag = (event, tile) => {
  console.log(event);
  event.dataTransfer.dropEffect = "move";
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("tileID", tile.id);
};

const onDrop = (event, list) => {
  const tileID = event.dataTransfer.getData("tileID");
  const tile = tiles.value.find((item) => tile.id == tileID);
  tile.list = list;
};

</script>


<template>
  <div class="main">
    <h1>MAIN</h1>

    <div class="dropzone">
      <div
        v-for="tile in getList(2)"
        :key="tile.id"
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
        v-for="tile in getList(1)"
        :key="tile.id"
        class="tile-el"
        draggable="true"
        @dragstart="startDrag($event, tile)"
      >
        {{ tile.title }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.main {
  background-color: grey;
  height: 100vh;
  width: 50vw;
  position: absolute;
}

.sidebar {
  background-color: lightgray;
  color: darkslategrey;
  height: 100vh;
  width: 15vw;
  position: sticky;
}

.tile-el {
  background-color: blue;
  padding: 1em;
  margin: 1em;
  width: 50px;
  height: 50px;
}
</style>
