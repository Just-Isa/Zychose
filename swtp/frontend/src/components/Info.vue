<template>
    <h2>Infofenster</h2>

    <button v-on:click="receiveRoom">test</button>
</template>

<script setup lang="ts">
import { useRoom } from "@/services/useRoom";
import { onMounted } from "vue";

const {room, updateRoom, receiveRoom} = useRoom();

onMounted(async()=>{
    receiveRoom();
})
</script>