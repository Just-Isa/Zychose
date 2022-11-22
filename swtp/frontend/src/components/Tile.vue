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
  height: 6.1em;
  width: 6.1em;
  margin: 1em;
  display: inline-block;
}

.tile-ele:active {
  background-color: #95E8FF;
  border-radius: 1em;
}


</style>
