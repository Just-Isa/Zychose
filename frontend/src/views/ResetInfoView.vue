<template>
  <h1>Everything is being reset!</h1>
  <h2>Please wait.</h2>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { resetEverything } from "@/helpers/ResetHelper";
import { deleteSessionId } from "@/helpers/SessionIDHelper";

onMounted(() => {
  deleteSessionId();
  resetEverything();
  // Timeout necessary due to Firefox' request lifetime
  setTimeout(function () {
    location.href = "/rooms";
  }, 100);
});
</script>
