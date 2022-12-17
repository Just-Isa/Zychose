<template>
  <div class="flex">
    <a
      class="mr-2 pointer-events-auto bg-street-menu-bg-gray px-4 pt-1 rounded-tl-lg rounded-tr-lg hover:cursor-pointer"
    >
      <img src="src/assets/img/${imgSrc}" alt="props.vehicleType" />
    </a>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  vehicleType: string;
  imgSrc: string;
}>();

console.log(props.imgSrc);
</script>
