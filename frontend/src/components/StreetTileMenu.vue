<template>
  <div class="menu justify-center items-center fixed flex bottom-6">
    <div
      class="tilemenuwrapper shadow-lg rounded-bl-lg rounded-br-lg rounded-tr-lg"
    >
      <div class="tilemenu flex p-1.5">
        <StreetTile
          id="straight"
          imgSrc="src/assets/img/straight-crop.svg"
        ></StreetTile>
        <StreetTile
          id="tCrossing"
          imgSrc="src/assets/img/tCrossing-crop.svg"
        ></StreetTile>
        <StreetTile
          id="curve"
          imgSrc="src/assets/img/curve-crop.svg"
        ></StreetTile>
        <StreetTile
          id="crossing"
          imgSrc="src/assets/img/crossing.svg"
        ></StreetTile>
      </div>
    </div>
    <BulldozerIcon></BulldozerIcon>
  </div>
</template>

<script setup lang="ts">
import StreetTile from "./StreetTile.vue";
import BulldozerIcon from "./BulldozerIcon.vue";
</script>

<style scoped>
.menu {
  left: 30vw;
}

.tilemenuwrapper {
  background-color: #5b6569; /* Tallwind Configuration nötig für custom-Farbvariable */
}
</style>
