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
          <span v-if="hours != 0">{{ hours }}h </span>
          <span v-if="min != 0">{{ min }}min </span>
        </td>
      </tr>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoom } from "@/services/useRoom";
const { roomState } = useRoom();

//TODO: WIP mit Testdaten, Zeitpunkt des LogIns sollte später aus useUser gelsen und mit der aktuellen Zeit verglichen werden
const date = new Date(2023, 0, 1, 0, 0, 0, 0);
const currentTimestamp = new Date(2023, 0, 3, 0, 423, 0, 0);
const hours = Math.round(diff_minutes(date, currentTimestamp) / 60);
const min = diff_minutes(date, currentTimestamp) % 60;

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

/**
 * Calculate the difference between two dates in minutes
 *
 * @param {Date} dt2 second date (after first date)
 * @param {Date} dt1 first date (before second date)
 * @returns {number} difference in minutes
 */
function diff_minutes(dt2: Date, dt1: Date) {
  let diff = (dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60;
  return Math.abs(Math.round(diff));
}
</script>
