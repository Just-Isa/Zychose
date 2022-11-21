<template>
    <div>
        <table>
            <thead>
                <th>DROPZONE</th>
            </thead>

            <tbody>
                <Tile :tile="tile" v-for="tile in tiles"/>
            </tbody>
        </table>
    </div>
</template>


<script setup lang="ts">
import { getBasicTiles } from '@/services/useTileList';
import { computed } from '@vue/runtime-core';
import Tile from './Tile.vue';

const {tiles} = getBasicTiles();

function showMeTheGoods(): void {
    for (const i in tiles.value){
        console.log(`SHOW[${i}]: ${tiles.value[i].name} & ${tiles.value[i].typeid}`)
    }
}

const uuid = computed(() => Math.floor(Math.random() * 50));;



</script>
