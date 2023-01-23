<template>
  <div
    id="overlay"
    :class="
      prop.isActive ? 'absolute duration-1000 bg-white h-screen w-screen' : ''
    "
  ></div>
</template>

<script setup lang="ts">
const prop = defineProps<{
  isActive: boolean;
}>();
</script>
