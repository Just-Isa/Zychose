<template>
  <span class="tile-ele m-1.5 inline-block hover:cursor-pointer">
    <div :id="prop.id" @click="changeActiveState(prop.id)">
      <div
        class="tile-current flex justify-center items-center rounded-lg border-4"
        :class="getActiveState() == prop.id ? 'active' : 'inactive'"
      >
        <img :src="prop.imgSrc" :alt="prop.id" />
      </div>
    </div>
    <div :class="rotationAllowed[0] ? 'tile-rotate-block' : 'hidden'">
      <div class="tile-rotate-ele" @click="changeTileRotation(0)">
        <img :src="imgSrc" :alt="prop.id" />
      </div>
      <div
        class="tile-rotate-ele rotate-90"
        :class="rotationAllowed[1] ? '' : 'hidden'"
        @click="changeTileRotation(90)"
      >
        <img :src="imgSrc" :alt="prop.id" />
      </div>
      <div
        class="tile-rotate-ele rotate-180"
        :class="rotationAllowed[2] ? '' : 'hidden'"
        @click="changeTileRotation(180)"
      >
        <img :src="imgSrc" :alt="prop.id" />
      </div>
      <div
        class="tile-rotate-ele rotate-270"
        :class="rotationAllowed[3] ? '' : 'hidden'"
        @click="changeTileRotation(270)"
      >
        <img :src="imgSrc" :alt="prop.id" />
      </div>
    </div>
  </span>
</template>

<script setup lang="ts">
import { useTile } from "@/services/useTileState";

const prop = defineProps<{
  id: string;
  imgSrc: string;
}>();

const {
  getpossibleRotation,
  setRotate,
  getRotate,
  setActiveState,
  getActiveState,
} = useTile();

// check possible rotation values
const possibleRotation = getpossibleRotation(prop.id);

let rotationAllowed = [false, false, false, false]; // [rotateallowed, rotate90allowed, rotate180allowed, rotate270allowed]
if (possibleRotation[0]) {
  rotationAllowed[0] = true;
  rotationAllowed[1] = true;
}
if (possibleRotation[1]) {
  rotationAllowed[0] = true;
  rotationAllowed[2] = true;
}
if (possibleRotation[2]) {
  rotationAllowed[0] = true;
  rotationAllowed[3] = true;
}

/**
 * change activeState
 * @param {string} type - current tile type
 */
function changeActiveState(type: string) {
  setActiveState(type);
  const entireDoc = document.documentElement;
  entireDoc.style.cursor = "default";
  // WIP: Später hierüber auch Cursor in Tile umwandelbar, laut Absprache aber noch nicht in Story
  //if (entireDoc) {
  //entireDoc.style.cursor = 'url("src/assets/img/[imgName].svg"), auto';
  //}
}

/**
 * Rotate the tile and update the value in state
 * @param {number} degree - new rotation value
 */
function changeTileRotation(degree: number) {
  setRotate(degree, prop.id);
  let rotateClass = `rotate-${getRotate(prop.id)}`;
  let actTile = document.getElementById(prop.id);
  if (actTile != null) {
    actTile.classList.remove("rotate-0");
    actTile.classList.remove("rotate-90");
    actTile.classList.remove("rotate-180");
    actTile.classList.remove("rotate-270");
    actTile.classList.add(rotateClass);
  }
}
</script>

<style scoped>
.tile-current {
  height: 5em;
  width: 5em;
  background-color: #e4f9ff; /* Tallwind Configuration nötig für custom-Farbvariable */
}

.tile-current img {
  max-width: 3.75rem;
  max-height: 3.75rem;
}

.tile-rotate-block {
  position: absolute;
  z-index: 99;
  background-color: #e4f9ff; /* Tallwind Configuration nötig für custom-Farbvariable */
  border-radius: 0.5rem;
  border: 0.25rem solid white;
  top: -2.1rem;
  margin-left: -0.25rem;
  display: none;
}

.tile-ele:hover .tile-rotate-block,
.tile-rotate-block:hover {
  display: flex;
}

.tile-rotate-ele {
  width: 2.5rem;
  padding: 0.25rem;
}

.tile-rotate-ele img {
  width: 2.5rem;
  height: 2.5rem;
}

.rotate-0 {
  transform: rotate(0);
}

.rotate-90 {
  transform: rotate(90deg);
}

.rotate-180 {
  transform: rotate(180deg);
}

.rotate-270 {
  transform: rotate(270deg);
}

.active {
  background-color: #95e8ff; /* Tallwind Configuration nötig für custom-Farbvariable */
}
</style>
