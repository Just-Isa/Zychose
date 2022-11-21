<template>
  <span class="tile-ele">
    {{tile.name}} TYPEID {{tile.id}}
  </span>
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
  padding: 4em;
  margin: 1em;
  width: 50px;
  height: 50px;
  display: inline-block;
}


</style>
