<!-- https://malcoded.com/posts/vue-file-upload-ts/ -->
<template>
  <div class="jython-upload">
    <form class="pl-5" @submit.prevent="submitForm">
      <!-- akzeptiert .txt zum Testen, solange ich mich noch nicht mit jython beschäftigt habe -->
      <div class="flex items-center h-12">
        <input
          type="file"
          id="getFile"
          accept=".jy, .py, .txt"
          @change="onChangeFile"
        />
        <button
          type="submit"
          class="border-black bg-neutral-400 hover:bg-lime-200 rounded p-1 m-1"
        >
          Script Upload
        </button>
        <div v-if="isSubmitted">
          <span
            class="h-5 w-5 bg-green-400 rounded-xl inline-block m-2 mt-[0.8em]"
          ></span>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch, ref } from "vue";

let files: File[] = reactive([]);
let isSubmitted = ref(false);

const props = defineProps<{
  roomNumber: number;
}>();

/**
 * function that saves all selected files to an array
 * @param newFiles list of new selected files
 */
function addFiles(newFiles: any) {
  console.log(`NEWFILES: ${(newFiles[0] as File).size}`);
  files = files.concat(newFiles[0] as File);
  console.log("newFile " + newFiles[0].name);
  console.log(`FILES: ${files}`);
}

/**
 * Function that is triggered when a file was selected
 * @param event --
 */
function onChangeFile(event: any) {
  console.log("----- onChange: files test -----");
  addFiles(event.target.files);
  for (let file of event.target.files) {
    console.log("File Upload: " + file.name);
  }
  //event.target.value = null;
}

/**
 * asynchronous function to send a selected file from the frontend to the backend
 */
async function submitForm() {
  const formData = new FormData();
  const postURL = `/api/upload/${props.roomNumber}`;

  formData.append("file", files[0]);

  console.log(files);

  console.log(formData.get("file"));

  const reqOptions = {
    method: "POST",
    headers: {},
    body: formData,
  };

  const response = await fetch(postURL, reqOptions);
  if (response.ok) {
    isSubmitted.value = true;
  }
}
</script>
