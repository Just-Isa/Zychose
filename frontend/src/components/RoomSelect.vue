<template>
  <div class="grid grid-cols-3 my-8 mx-20">
    <div class="w-1/12 self-end">
      <GoBackButtonVue />
    </div>
    <span class="font-bold text-6xl text-center self-center">SERVERS</span>
    <div class="w-1/12 place-self-end pr-2.5">
      <AddButtonVue />
    </div>
  </div>

  <div v-for="room in roomListItems" v-bind:key="room.roomNumber"
    class="grid grid-cols-2 gp-96 py-5 pl-5 my-5 mx-20 bg-gray-500 drop-shadow-md rounded-md">
    <span class="font-bold text-xl">Raum {{ room.roomNumber }}</span>
    <div class="flex grid-cols-3 justify-end pr-5">
      <span class="text-right text-lg">{{ room.userList.length }} Players</span>
      <button class="bg-teal-500 font-semibold text-lg rounded-md px-2 mx-2.5">Upload Script</button>
      <button v-on:click="$router.push('/' + room.roomNumber)"
        class="bg-green-500 font-semibold text-lg rounded-md px-2 w-20">Join</button>
    </div>
  </div>
</template>

<script setup lang="ts">
//v-on:click="swapRooms(room.roomNumber)"
import { useRoomBox } from "@/services/useRoomList";
import { onMounted, computed } from "vue";
import { useUser } from "@/services/useUser";
import AddButtonVue from "./AddButton.vue";
import GoBackButtonVue from "./GoBackButton.vue";

const { roomListState, getRoomList } = useRoomBox();
const { createUser } = useUser();

const roomListItems = computed(() => {
  return roomListState.rooms.roomList;
});

onMounted(() => {
  createUser();
  // 600ms chosen to account for slower Connection (and slower Computers)
  setTimeout(function () {
    getRoomList();
  }, 600);
});
</script>

<style>
body {
  font-family: Poppins;
  color: white;
  background-color: rgb(63 63 70);
}
</style>