<template>
  <h1>Everything is being reset!</h1>
  <h2>Please wait.</h2>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { resetEverything } from "@/helpers/ResetHelper";
import { deleteSessionId } from "@/helpers/SessionIDHelper";

onMounted(() => {
  resetEverything();
  deleteSessionId();
  location.href = "/rooms";
});
</script>
