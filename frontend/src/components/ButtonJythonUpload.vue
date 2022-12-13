<!-- https://malcoded.com/posts/vue-file-upload-ts/ -->
<template>
  <div class="jython-upload">
    <form class="pl-5">
      <button
        type="button"
        onclick="document.getElementById('getFile').click()"
        class="bg-neutral-400 hover:bg-lime-200"
      >
        Jython File
      </button>
      <input type="file" id="getFile" class="hidden" />
    </form>
  </div>
</template>

<script setup lang="ts"></script>
