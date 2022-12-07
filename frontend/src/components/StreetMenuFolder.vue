<template>
  <div class="bg-street-menu-bg-gray items-center bottom-6 p-1">
    <StreetBlockIcon
      id="straight"
      imgSrc="src/assets/img/straight-crop.svg"
    ></StreetBlockIcon>
    <StreetBlockIcon
      id="tCrossing"
      imgSrc="src/assets/img/tCrossing-crop.svg"
    ></StreetBlockIcon>
    <StreetBlockIcon
      id="curve"
      imgSrc="src/assets/img/curve-crop.svg"
    ></StreetBlockIcon>
    <StreetBlockIcon
      id="crossing"
      imgSrc="src/assets/img/crossing.svg"
    ></StreetBlockIcon>
  </div>
</template>

<script setup lang="ts">
import StreetBlockIcon from "./StreetBlockIcon.vue";
import BulldozerIcon from "./BulldozerIcon.vue";
</script>
