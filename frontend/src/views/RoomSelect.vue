<template>
  <div class="flex justify-between my-8 mx-20">
    <GoBackButton class="drop-shadow-md place-self-end" v-on:click="$router.push('/')" />
    <h1 class="font-bold text-6xl text-white font-Poppins self-center capitalize">Servers</h1>
    <AddButton class="drop-shadow-md place-self-end"/>
  </div>

  <div v-for="room in roomListItems" v-bind:key="room.roomNumber"
    class="flex justify-between py-5 pl-5 my-5 mx-20 bg-light-gray-custom text-white font-Poppins drop-shadow-md rounded-md">
    <span class="font-bold text-xl">Raum {{ room.roomNumber }}</span>
    <div class="flex justify-end pr-5 text-lg">
      <span>{{ room.userList.length }} Players</span>
      <button class="bg-blue-custom font-semibold rounded px-2 mx-2.5">Upload Script</button>
      <button v-on:click="$router.push('/' + room.roomNumber)"
        class="bg-green-custom font-semibold rounded px-2 w-20">Join</button>
    </div>
  </div>
</template>

<script setup lang="ts">
//v-on:click="swapRooms(room.roomNumber)"
import { useRoomBox } from "@/services/useRoomList";
import { onMounted, computed } from "vue";
import { useUser } from "@/services/useUser";
import AddButton from "../components/AddButton.vue";
import GoBackButton from "../components/GoBackButton.vue";

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