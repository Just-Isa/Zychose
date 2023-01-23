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
          <span v-if="calculateHours(user.minutesPlayed) != 0">
            {{ calculateHours(user.minutesPlayed) }}h
          </span>
          <span v-if="calculateMinutes(user.minutesPlayed) != 0"
            >{{ calculateMinutes(user.minutesPlayed) }}min
          </span>
        </td>
      </tr>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoom } from "@/services/useRoom";
const { roomState } = useRoom();

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

/**
 * Calculate the played hours
 *
 * @param {number} minutesPlayed total minutes played
 * @returns {number} full hours played
 */
function calculateHours(minutesPlayed: number) {
  return Math.abs(Math.round(minutesPlayed / 60));
}

/**
 * Calculate the played minutes
 *
 * @param {number} minutesPlayed total minutes played
 * @returns {number} minutes played (without hours)
 */
function calculateMinutes(minutesPlayed: number) {
  return Math.abs(Math.round(minutesPlayed % 60));
}
</script>
