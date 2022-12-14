<template>
  <span
    class="tile-ele m-1.5 inline-block hover:cursor-pointer h-20 w-20 bg-street-menu-tile-bg-turquoise rounded-lg"
    :class="
      getActiveState() == prop.type
        ? 'active outline bg-active-block-turquoise outline-white outline-3'
        : 'inactive'
    "
  >
    <div :id="prop.type" @click="changeActiveState(prop.type)">
      <div class="tile-current flex justify-center items-center rounded-lg">
        <img
          class="h-16 w-16 mt-2"
          :src="getImgSrc(prop.type)"
          :alt="prop.type"
        />
      </div>
    </div>
    <div
      :class="
        rotationAllowed[0]
          ? 'tile-rotate-block absolute z-50 bg-street-menu-tile-bg-turquoise rounded-lg -ml-1 hidden -top-4 border-white'
          : 'hidden'
      "
    >
      <div class="tile-rotate-ele" @click="changeTileRotation(0)">
        <img :src="getImgSrc(prop.type)" :alt="prop.type" />
      </div>
      <div
        class="tile-rotate-ele rotate-90"
        :class="rotationAllowed[1] ? 'active' : 'hidden'"
        @click="changeTileRotation(90)"
      >
        <img :src="getImgSrc(prop.type)" :alt="prop.type" />
      </div>
      <div
        class="tile-rotate-ele rotate-180"
        :class="rotationAllowed[2] ? '' : 'hidden'"
        @click="changeTileRotation(180)"
      >
        <img :src="getImgSrc(prop.type)" :alt="prop.type" />
      </div>
      <div
        class="tile-rotate-ele rotate-270"
        :class="rotationAllowed[3] ? '' : 'hidden'"
        @click="changeTileRotation(270)"
      >
        <img :src="getImgSrc(prop.type)" :alt="prop.type" />
      </div>
    </div>
  </span>
</template>

<script setup lang="ts">
import { useTile } from "@/services/useTileState";

const prop = defineProps<{
  type: string;
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
const possibleRotation = getpossibleRotation(prop.type);

let rotationAllowed = [false, false, false, false]; // [rotateallowed, rotate90allowed, rotate180allowed, rotate270allowed]
if (possibleRotation?.length == 3) {
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
  changeActiveState(prop.type);
  setRotate(degree, prop.type);
  let rotateClass = `rotate-${getRotate(prop.type)}`;

  const currentTile = document.getElementById(getActiveState());
  if (getRotate(prop.type) == 90) {
    console.log(currentTile);
    if (currentTile) {
      currentTile.style.margin = "0.25rem -0.2rem 0.25rem 0.25rem";
    }
  } else if (getRotate(prop.type) == 180) {
    console.log(currentTile);
    if (currentTile) {
      currentTile.style.margin = "0.4rem -0.6rem 0.25rem -0.6rem";
    }
  } else if (getRotate(prop.type) == 270) {
    console.log(currentTile);
    if (currentTile) {
      currentTile.style.margin = "0.2rem -0.3rem 0.25rem -0.6rem";
    }
  } else {
    if (currentTile) {
      currentTile.style.margin = "0 0 0 0";
    }
  }

  let actTile = document.getElementById(prop.type);
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
