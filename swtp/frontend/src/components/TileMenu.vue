
<template>
<div class="wrapper">


  <div class="main">
    <div class="baggercontainer">
      <BaggerButton id="baggercursor"></BaggerButton>
    </div>

    <h1>MAIN</h1>

    <div class="dropzone">
      <div>
       <DropZone></DropZone>
      </div>
    </div>
  </div>


  <footer class="navcontainer">
    <div class="navbar">
    <h2>MENÜ</h2>





    <button class="Bagger" @click="deleteTiles()">yeet</button>
  </div>
</footer>
</div>
</template>





<script setup lang="ts">
import { ref } from "vue";
import BaggerButton from "./BaggerButton.vue";
import DropZone from "./DropZone.vue";



const tiles = ref([
  { id: 1, title: "kreuzung"},
  { id: 2, title: "straß"},
  { id: 3, title: "sackgasse"},
  { id: 4, title: "kurva"},
])

let uid = 0;


const playground = ref([]);


const startDrag = (event, tile) => {
  event.dataTransfer.dropEffect = "move";
  event.dataTransfer.effectAllowed = "move";
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




<style scoped>

html {
    position: relative;
    min-height: 100vh;
    min-width: 100vw;
}

body {
    margin: 0 0 14em;
    padding: 25px;
}

footer {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 100px;
    width: 100%;
    overflow: hidden;
}
.wrapper {
    background-color: beige;
    width:100vw;
    height:100vh;
}

.baggercontainer {
  position: absolute;
  right: 50px;
  top: 30px
}

#baggercursor {
  padding: 2em;
}

.main {
  background-color: grey;
  margin: 0 auto;
  height: 100vh;
}

.navcontainer {
  width: 100vw;
  height: 14em;
}

.navbar {
    background-color: lightgray;
    color: darkslategrey;
}

.tile-el {
  background-color: blue;
  padding: 1em;
  margin: 1em;
  width: 50px;
  height: 50px;
  display: inline-block;
}

.dropzone {
  width: 50%;
  margin: 1em auto;
  min-height: 50px;
  padding: 1em;
  color: white;
  background-color: aquamarine;
  
}

.dropzoneTest {
  width: 50%;
  margin: 1em auto;
  min-height: 50px;
  padding: 1em;
  color: white;
  background-color: aquamarine;
  visibility: hidden;
}

#Dragme:hover {
  cursor: -webkit-grab;
}

#Dragme:active {
  cursor: none;
}

</style>
