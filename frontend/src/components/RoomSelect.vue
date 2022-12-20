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
    <div v-if="!room.jythonFile">
      <span
        class="h-5 w-5 bg-green-400 rounded-xl inline-block m-2 mt-[0.8em]"
      ></span>
    </div>
  </div>
</template>

<script setup lang="ts">
//v-on:click="swapRooms(room.roomNumber)"
import { useRoomBox } from "@/services/useRoomList";
import { onMounted, computed, ref, watch } from "vue";
import { useUser } from "@/services/useUser";

import ButtonJythonUpload from "@/components/ButtonJythonUpload.vue";

const { roomListState, getRoomList } = useRoomBox();
const { createUser } = useUser();

const roomListItems = computed(() => {
  return roomListState.rooms.roomList;
});

/*
const isSubmitted = ref(false);
const currentRoomList = ref(roomListState.rooms.roomList);

function checkJython() {
  for (let room of roomListItems.value) {
    console.log(room);
    if (room.jythonFile) {
      isSubmitted.value = true;
    }
  }
}*/

onMounted(() => {
  createUser();
  getRoomList();
});
/*
watch(currentRoomList, () => {
  for (let room of roomListItems.value) {
    console.log("ROOM" + room);
    if (room.jythonFile != null) {
      console.log("DRIN");
      isSubmitted.value = true;
    }
  }

  {
    deep: true;
  }
});*/
</script>
