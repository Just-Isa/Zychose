<template>
  <div class="bg-back-folder-gray fixed w-full h-full">
    <div class="flex justify-between my-8 mx-20">
      <GoBackButton
        class="drop-shadow-md place-self-end"
        v-on:click="$router.push('/')"
      />
      <h1 class="font-bold text-6xl text-white font-sans self-center uppercase">
        Servers
      </h1>
      <AddButton class="drop-shadow-md place-self-end" />
    </div>

    <div
      v-for="room in roomListItems"
      v-bind:key="room.roomNumber"
      class="flex justify-between items-center py-3 pl-5 my-5 mx-20 bg-room-list-bg-gray text-white font-sans drop-shadow-md rounded-md"
    >
      <span class="font-bold text-xl">Raum {{ room.roomNumber }}</span>
      <div class="flex justify-end items-center pr-3 text-lg">
        <span>{{ room.userList.length }} Players</span>
        <button
          class="bg-button-blue-bright font-semibold rounded w-40 py-1 ml-3 mr-4"
        >
          Upload Script
        </button>
        <button
          v-on:click="$router.push('/' + room.roomNumber)"
          class="bg-button-green font-semibold rounded w-16 py-1"
        >
          Join
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
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
