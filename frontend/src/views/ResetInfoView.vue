<template>
  <h1>Everything is being reset!</h1>
  <h2>Please wait.</h2>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { deleteSessionId } from "@/helpers/SessionIDHelper";
import swtpConfigJSON from "../../../swtp.config.json";

if(!swtpConfigJSON.consoleLogging) {
  console.log = function() {}
}

onMounted(() => {
  deleteSessionId();
  resetEverything();
  // Timeout necessary due to Firefox' request lifetime
  setTimeout(function () {
    location.href = "/rooms";
  }, 100);
});

function resetEverything() {
  const DEST = "/api/reset";
  fetch(DEST, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        console.log("Error @ Restarting everything.");
      } else {
        return response.text();
      }
    })
    .then(() => {
      console.log("Done! Game has been reset. Please refresh.");
    })
    .catch(() => {
      console.log("Error @ Restarting everything.");
    });
}
</script>
