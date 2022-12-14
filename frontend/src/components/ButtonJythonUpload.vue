<!-- https://malcoded.com/posts/vue-file-upload-ts/ -->
<template>
  <div class="jython-upload">
    <form class="pl-5">
      <button
        type="button"
        onclick="document.getElementById('getFile').click()"
        class="border-black bg-neutral-400 hover:bg-lime-200 rounded p-1 m-1"
      >
        Script Upload
      </button>
      <!-- akzeptiert .txt zum Testen, solange ich mich noch nicht mit jython beschäftigt habe -->
      <input
        type="file"
        id="getFile"
        class="hidden"
        accept=".jy, .py, .txt"
        @change="onChangeFile"
      />
      <!-- <ul v-show="files.length">
        <li v-for="file of files" :key="file">{{ file }}</li>
      </ul> -->
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const files = ref([]);

function addFiles(newFiles: any) {
  files.value = files.value.concat(newFiles);
  console.log("newFile " + newFiles[0].name);
}

function onChangeFile(event: any) {
  console.log("----- onChange: files test -----");
  addFiles(event.target.files);
  for (let file of event.target.files) {
    console.log("File Upload: " + file.name);

    const reader = new FileReader();
    // reads and encodes the file as a base64 string
    reader.readAsDataURL(file);
    // onloadend gets triggered when the file read above was completed
    reader.onloadend = () => {
      console.log(`HIER: ${JSON.stringify(reader.result)}`);
    }
  }
  event.target.value = null;
}
</script>
