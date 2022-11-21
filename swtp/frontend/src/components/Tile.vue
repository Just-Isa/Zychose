<template>
  <span class="tile-ele"></span>
</template>
  
<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import type { ITileItem } from '@/services/ITileItem';


const props = defineProps<{ 
    imgurl: string;
    tile: ITileItem;
}>();


</script>


<style scoped>
.tile-ele {
  background-color: blue;
  height: 6em;
  width: 6em;
  padding: 1em;
  margin: 1em;
  display: inline-block;
}


</style>
