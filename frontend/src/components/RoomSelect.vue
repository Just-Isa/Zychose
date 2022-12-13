<template>
  <h1 style="font-size: 20px; text-align: center">ROOMS</h1>
  <br />
  <div v-for="room in roomListItems" v-bind:key="room.roomNumber" class="flex">
    <a style="color: red" :href="'/' + room.roomNumber"
      >Raum {{ room.roomNumber }}: {{ room.roomName }}<br
    /></a>
    <ButtonJythonUpload></ButtonJythonUpload>
    <div
      v-for="user in room.userList"
      v-bind:key="user.sessionID"
      style="margin-left: 20px"
    >
      <p>{{ user.userName }}</p>
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
