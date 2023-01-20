<template>
  <form @submit.prevent="submitForm">
    <label for="name">Wie dürfen wir Dich nennen?</label><br />
    <input
      class="text-black p-2 mt-2 w-60 rounded"
      v-model="name"
      placeholder="Name"
      type="text"
      name="name"
      id="name"
    />
    <br />
    <button
      type="submit"
      class="bg-button-green font-semibold rounded py-4 px-8 text-4xl mt-10 mb-10"
    >
      Play
    </button>
  </form>
</template>

<script setup lang="ts">
let name = "";
function submitForm(submitEvent: any) {
  name = submitEvent.target.elements.name.value;
  console.log(name);
  if (name != "") {
    location.href = "/rooms";
  }
}
</script>
