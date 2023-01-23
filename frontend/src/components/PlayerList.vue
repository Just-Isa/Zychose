<template>
  <div class="text-white fixed w-60 mt-5 ml-20 z-50">
    <div
      class="bg-back-folder-gray rounded-full cursor-pointer px-8 py-2 mb-3 shadow-lg text-center"
      @click="changeVisibilty()"
    >
      {{ roomState.room.userList.length }} Players online
    </div>
    <div
      id="playerlist"
      class="bg-back-folder-gray rounded shadow-lg p-3 hidden"
    >
      <tr v-for="user in roomState.room.userList" v-bind:key="user.sessionID">
        <td class="w-24 truncate block">
          {{ user.userName }}
        </td>
        <td class="w-32 text-right">
          <span v-if="hours != 0"> {{ calculateHours(date) }} h </span>
          <span v-if="min != 0">{{ calculateMinutes(date) }}min </span>
        </td>
      </tr>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoom } from "@/services/useRoom";
const { roomState } = useRoom();

//TODO: WIP mit Testdaten, Zeitpunkt des LogIns sollte später aus useUser gelsen und mit der aktuellen Zeit verglichen werden
const date = new Date(2023, 0, 20, 0, 0, 0, 0);
const hours = calculateHours(date);
const min = calculateMinutes(date);

console.log("USER", roomState);

/**
 * Change visibility of player list (visible or hidden)
 */
function changeVisibilty() {
  const playerlist = document.getElementById("playerlist");
  if (playerlist != null) {
    if (playerlist.classList.contains("hidden")) {
      playerlist.classList.remove("hidden");
    } else {
      playerlist.classList.add("hidden");
    }
  }
}

function calculateHours(loginTime: Date) {
  return Math.round(diff_minutes(loginTime) / 60);
}

function calculateMinutes(loginTime: Date) {
  return diff_minutes(loginTime) % 60;
}

/**
 * Calculate the difference between loginDate and currentDate in minutes
 *
 * @param {Date} loginDate login time
 * @returns {number} difference in minutes
 */
function diff_minutes(loginDate: Date) {
  const currentDate = new Date();
  let diff = (currentDate.getTime() - loginDate.getTime()) / 1000;
  diff /= 60;
  return Math.abs(Math.round(diff));
}
</script>
