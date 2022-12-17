<template>
  <div
    class="tile-ele m-1.5 inline-block hover:cursor-pointer h-20 w-20 bg-street-menu-tile-bg-turquoise rounded-lg"
    :class="
      prop.currentBlock.type == streetBlockState.streetBlock.type
        ? 'active outline bg-active-block-turquoise outline-white outline-3'
        : 'inactive'
    "
  >
    <div
      :id="prop.currentBlock.type"
      @click="changeActiveState(prop.currentBlock)"
      class="tile-current flex justify-center items-center rounded-lg"
    >
      <img
        class="h-16 w-16 m-2"
        :src="`/src/assets/img/${prop.currentBlock.type}.svg`"
        :alt="prop.currentBlock.type"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStreetBlock } from "@/services/useStreetBlock";
import type { StreetBlock } from "@/services/IStreetBlock";

const prop = defineProps<{
  currentBlock: StreetBlock;
}>();

const {
  streetBlockState,
  changeCurrentTileType,
  toggleBulldozer,
  changeRotation,
} = useStreetBlock();

/**
 * change activeState
 * @param {string} type - current tile type
 */
function changeActiveState(type: StreetBlock) {
  // when block is clicked again it changes rotation
  if (
    type == streetBlockState.streetBlock &&
    !streetBlockState.bulldozerActive
  ) {
    const block = document.getElementById(prop.currentBlock.type);
    if (block) {
      let nextRotIndex =
        streetBlockState.streetBlock.possibleRotation.indexOf(
          streetBlockState.streetBlock.currentRotation
        ) + 1;

      if (
        nextRotIndex >= streetBlockState.streetBlock.possibleRotation.length
      ) {
        nextRotIndex = 0;
      }
      let nextRot = streetBlockState.streetBlock.possibleRotation[nextRotIndex];
      block.style.rotate = `${nextRot}deg`;
      changeRotation(prop.currentBlock, nextRot);
    }
    return;
  }
  changeCurrentTileType(type);

  toggleBulldozer(false);
  const entireDoc = document.documentElement;
  entireDoc.style.cursor = "default";
}

/* /**
 * Rotate the tile and update the value in state
 * @param {number} degree - new rotation value

function changeTileRotation(degree: number) {
  changeCurrentTileType(prop.currentBlock.type);
  toggleBulldozer(false);
} */
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
