<template>
  <h1 style="font-size: 20px; text-align: center">ROOMS</h1>
  <br />
  <div v-for="room in roomListItems">
    <a style="color: red" :href="'/' + room.roomNumber"
      >Raum {{ room.roomNumber }}: {{ room.roomName }}<br
    /></a>
    <div v-for="user in room.userList" style="margin-left: 20px">
      <p>{{ user.userName }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
//v-on:click="swapRooms(room.roomNumber)"
import { useRoomBox } from "@/services/useRoomList";
import { onMounted, computed } from "vue";
import { useUser } from "@/services/useUser";

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
