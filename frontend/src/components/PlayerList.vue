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
          {{ getPlayedTimeString(user.loginTime) }}
        </td>
      </tr>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoom } from "@/services/useRoom";
const { roomState } = useRoom();

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
 * Calculate the played time
 *
 * @param {number} loginTime time when player logged in
 * @returns {string} played time
 */
function getPlayedTimeString(loginTime: number): string {
  const playedTime = new Date(Math.abs(new Date().getTime() - loginTime));
  console.log("PLAYEDTIME", playedTime);
  // Hours -1 because timezone of central europe is +1
  return `${playedTime.getHours() - 1}h ${playedTime.getMinutes()}min`;
}
</script>
