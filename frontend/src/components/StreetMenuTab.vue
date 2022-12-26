<template>
  <div
    class="p-1 -mb-[4px] max-h-7 pointer-events-auto bg-street-menu-bg-gray px-4 pt-1 rounded-tl-lg rounded-tr-lg hover:cursor-pointer"
  >
    <button>
      <img :src="`src/assets/img/${props.imgSrc}`" :alt="props.vehicleType + ' icon'" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
const props = defineProps<{
  vehicleType: string;
  imgSrc: string;
}>();
</script>
