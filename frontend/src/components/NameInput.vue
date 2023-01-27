<template>
  <form @submit.prevent="submitForm">
    <label for="nameInput">Wie dürfen wir Dich nennen?</label><br />
    <input
      class="text-black p-2 mt-2 w-60 rounded"
      v-model="nameInput"
      placeholder="Name"
      type="text"
      name="name"
      id="name"
    />
    <br />
    <p class="mt-2 text-error-message-pink">{{ message }}</p>
    <button
      type="submit"
      class="bg-button-green font-semibold rounded py-4 px-8 text-4xl mt-10 mb-10"
    >
      Play
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";

let nameInput = "";
let message = ref("");
function submitForm(submitEvent: any) {
  document.cookie = "name=" + submitEvent.target.elements.name.value;
  if (nameInput != "") {
    location.href = "/rooms";
  } else {
    message.value = "Bitte keinen leeren Namen wählen";
  }
}
</script>
