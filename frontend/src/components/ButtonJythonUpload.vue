<template>
  <form class="pl-5" @submit.prevent="submitForm">
    <div class="flex items-center h-12">
      <input type="file" accept=".jy, .py" @change="onChangeFile" />
    </div>
  </form>
</template>

<script setup lang="ts">
import { getRoomList } from "@/services/useRoomList";
import { reactive } from "vue";

let files: File[] = reactive([]);

const props = defineProps<{
  roomNumber: number;
}>();

/**
 * Function that is triggered when a file was selected
 *
 * @param event event that triggers
 */
function onChangeFile(event: Event) {
  const target = <HTMLInputElement>event.target;
  if (target.files != null) {
    if (
      (target.files[0].name as string).split(".")[1] == "py" ||
      (target.files[0].name as string).split(".")[1] == "jy"
    ) {
      files = files.concat(target.files[0] as File);
      submitForm(props.roomNumber);
    } else {
      console.log("Only python or jython files allowed!");
    }
  }
}

/**
 * asynchronous function to send a selected file from the frontend to the backend
 */
async function submitForm(roomNumber: number) {
  const formData = new FormData();
  const postURL = "/api/upload/" + roomNumber;
  formData.append("file", files[0]);

  const reqOptions = {
    method: "POST",
    headers: {},
    body: formData,
  };

  const response = await fetch(postURL, reqOptions);

  getRoomList();
}
</script>
