<template>
  <span
    class="tile-ele m-1.5 inline-block hover:cursor-pointer h-20 w-20 bg-street-menu-tile-bg-turquoise rounded-lg"
    :class="getActiveState() == prop.id ? 'active' : 'inactive'"
  >
    <div :id="prop.id" @click="changeActiveState(prop.id)">
      <div class="tile-current flex justify-center items-center rounded-lg">
        <img class="h-16 w-16 mt-2" :src="getImgSrc(prop.id)" :alt="prop.id" />
      </div>
    </div>
    <div :class="rotationAllowed[0] ? 'tile-rotate-block' : 'hidden'">
      <div class="tile-rotate-ele" @click="changeTileRotation(0)">
        <img :src="getImgSrc(prop.id)" :alt="prop.id" />
      </div>
      <div
        class="tile-rotate-ele rotate-90"
        :class="rotationAllowed[1] ? '' : 'hidden'"
        @click="changeTileRotation(90)"
      >
        <img :src="getImgSrc(prop.id)" :alt="prop.id" />
      </div>
      <div
        class="tile-rotate-ele rotate-180"
        :class="rotationAllowed[2] ? '' : 'hidden'"
        @click="changeTileRotation(180)"
      >
        <img :src="getImgSrc(prop.id)" :alt="prop.id" />
      </div>
      <div
        class="tile-rotate-ele rotate-270"
        :class="rotationAllowed[3] ? '' : 'hidden'"
        @click="changeTileRotation(270)"
      >
        <img :src="getImgSrc(prop.id)" :alt="prop.id" />
      </div>
    </div>
  </span>
</template>

<script setup lang="ts">
import { useTile } from "@/services/useTileState";

const prop = defineProps<{
  id: string;
}>();

const {
  getpossibleRotation,
  setRotate,
  getRotate,
  setActiveState,
  getActiveState,
  getImgSrc,
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
  changeActiveState(prop.id);
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
.tile-rotate-block {
  position: absolute;
  z-index: 99;
  background-color: #e4f9ff; /* Tallwind Configuration nötig für custom-Farbvariable */
  border-radius: 0.5rem;
  border: 0.25rem solid white;
  top: -1.3rem;
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
</style>
