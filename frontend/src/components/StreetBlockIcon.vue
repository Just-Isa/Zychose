<template>
  <div
    class="tile-ele m-1.5 inline-block hover:cursor-pointer h-20 w-20 bg-street-menu-tile-bg-turquoise rounded-lg"
    :class="
      prop.currentBlock.name == activeBlock.streetBlock.name
        ? 'active outline bg-active-block-turquoise outline-white outline-[3px]'
        : 'inactive'
    "
  >
    <div
      :id="prop.currentBlock.name"
      @click="changeActiveStreetBlock(prop.currentBlock)"
      class="tile-current flex justify-center items-center rounded-lg"
    >
      <img
        class="h-16 w-16 m-2"
        :src="prop.currentBlock.imgPath"
        :alt="prop.currentBlock.name"
        draggable="false"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStreetBlock } from "@/services/useStreetBlock";
import type { StreetBlock } from "@/model/IStreetBlock";

const prop = defineProps<{
  currentBlock: StreetBlock;
}>();

const {
  activeBlock,
  changeCurrentStreetType,
  toggleBulldozer,
  changeRotation,
  bulldozerActive,
} = useStreetBlock();

/**
 * changes the active StreetBlock in streetBlockState and rotates StreetBlock if StreetBlock is clicked multiple times
 * @param type selected StreetBlock
 */
function changeActiveStreetBlock(type: StreetBlock) {
  if (type == activeBlock.streetBlock && !bulldozerActive.isActive) {
    const block = document.getElementById(prop.currentBlock.name);
    if (block) {
      let nextRotIndex =
        activeBlock.streetBlock.possibleRotation.indexOf(
          activeBlock.streetBlock.currentRotation
        ) + 1;

      if (nextRotIndex >= activeBlock.streetBlock.possibleRotation.length) {
        nextRotIndex = 0;
      }
      let nextRot = activeBlock.streetBlock.possibleRotation[nextRotIndex];
      block.style.rotate = `${nextRot}deg`;
      changeRotation(prop.currentBlock, nextRot);
    }
    return;
  }
  changeCurrentStreetType(type);

  toggleBulldozer(false);
  const entireDoc = document.documentElement;
  entireDoc.style.cursor = "default";
}
</script>
