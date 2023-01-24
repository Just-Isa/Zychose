<template>
  <tr>
    <td class="w-28 truncate block">
      {{ userName }}
    </td>
    <td class="w-16 text-right">{{ playedHoursString }}</td>
    <td class="w-14 text-right">{{ playedMinutesString }}</td>
    <td class="w-8 text-right">{{ playedSecondsString }}</td>
  </tr>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

let playedHoursString = ref("");
let playedMinutesString = ref("");
let playedSecondsString = ref("");

const prop = defineProps<{
  userName: string;
  userLoginTime: number;
}>();

/**
 * Calculate the played time
 *
 * @param {number} loginTime time when player logged in
 * @returns {string} played time
 */
onMounted(() => {
  setInterval(() => {
    const playedTime = new Date(
      Math.abs(new Date().getTime() - prop.userLoginTime)
    );
    // Hours -1 because timezone of central europe is +1
    playedHoursString.value = createTimeString(
      playedTime.getHours() - 1,
      "h",
      false
    );
    playedMinutesString.value = createTimeString(
      playedTime.getMinutes(),
      "min",
      true
    );
    playedSecondsString.value = createTimeString(
      playedTime.getSeconds(),
      "s",
      true
    );
  }, 1000);
});

/**
 * create string for played time
 *
 * @param {number} value value of time
 * @param {string} label kind of time
 * @param {boolean} leadingNull should there be a leading 0 at small numbers?
 * @returns {string} played time string
 */
function createTimeString(value: number, label: string, leadingNull: boolean) {
  const leadingNullString = leadingNull && value < 10 ? "0" : "";
  return `${leadingNullString}${value}${label}`;
}
</script>
