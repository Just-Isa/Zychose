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
      @click="changeActiveStreetBlock(prop.currentBlock)"
      class="tile-current flex justify-center items-center rounded-lg"
    >
      <img
        class="h-16 w-16 m-2"
        :src="`/assets/img/${prop.currentBlock.type}.svg`"
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
 * changes the active StreetBlock in streetBlockState and rotates StreetBlock if StreetBlock is clicked multiple times
 * @param type selected StreetBlock
 */
function changeActiveStreetBlock(type: StreetBlock) {
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
</script>
