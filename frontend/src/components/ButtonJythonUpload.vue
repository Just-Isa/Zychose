<!-- https://malcoded.com/posts/vue-file-upload-ts/ -->
<template>
  <div class="jython-upload">
    <form class="pl-5" @submit.prevent="submitForm">
      
      <!-- akzeptiert .txt zum Testen, solange ich mich noch nicht mit jython beschäftigt habe -->
      <input
        type="file"
        id="getFile"
        accept=".jy, .py, .txt"
        @change="onChangeFile"
      />
      <!-- <ul v-show="files.length">
        <li v-for="file of files" :key="file">{{ file }}</li>
      </ul> -->
      <button
        type="submit"
        class="border-black bg-neutral-400 hover:bg-lime-200 rounded p-1 m-1"
      >
        Script Upload
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const files = ref([]);

const props = defineProps<{
  roomNumber: number;
}>();

function addFiles(newFiles: any) {
  files.value = files.value.concat(newFiles);
  console.log("newFile " + newFiles[0].name);
}

function onChangeFile(event: any) {
  console.log("----- onChange: files test -----");
  addFiles(event.target.files);
  for (let file of event.target.files) {
    console.log("File Upload: " + file.name);
  }
  event.target.value = null;
}

async function submitForm() {

  const formData = new FormData();
  const reqOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData)
  };

  formData.append('file', files.value[0]);

  try {
    const response = await fetch('/upload', reqOptions)
      .then((response) => {
        if(!response.ok) {
          //console.error("ERROR in response")
          throw new Error();
        }
        response.json();
      })
      .catch((error) => {
        console.error(error)
      })

    console.log(`RESPONSE HERE: ${response}`)
  } catch(error) {
    console.error(`ERROR ${error}`);
  }

}

</script>
