<template>
  <h1 style="font-size: 20px; text-align: center">ROOMS</h1>
  <br />
  <div v-for="room in roomListItems" v-bind:key="room.roomNumber" class="flex">
    <div>
      <a style="color: red" :href="'/' + room.roomNumber"
        >Raum {{ room.roomNumber }}: {{ room.roomName }}<br
      /></a>

      <div
        v-for="user in room.userList"
        v-bind:key="user.sessionID"
        style="margin-left: 20px"
      >
        <p>{{ user.userName }}</p>
      </div>
    </div>
    <ButtonJythonUpload :room-number="room.roomNumber"></ButtonJythonUpload>
    <div v-if="room.jythonScript">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icon-tabler-file-code inline-block m-2 mt-[0.8em]"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M14 3v4a1 1 0 0 0 1 1h4" />
        <path
          d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"
        />
        <path d="M10 13l-1 2l1 2" />
        <path d="M14 13l1 2l-1 2" />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
//v-on:click="swapRooms(room.roomNumber)"
import { useRoomBox } from "@/services/useRoomList";
import { onMounted, computed } from "vue";
import { useUser } from "@/services/useUser";

import ButtonJythonUpload from "@/components/ButtonJythonUpload.vue";

const { roomListState, getRoomList } = useRoomBox();
const { createUser } = useUser();

const roomListItems = computed(() => {
  return roomListState.rooms.roomList;
});

onMounted(() => {
  createUser();
  getRoomList();
});
</script>
