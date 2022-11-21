<template>
  <span class="tile-ele">
    NAME {{tile.name}} TYPE {{tile.typeid}} UUID {{uuid}}
  </span>
</template>
  
<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import type { ITileItem } from '@/services/ITileItem';


const props = defineProps<{ 
    tile: ITileItem;
}>();

let uuid = computed(() => Math.floor(Math.random() * 100));


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