<template>
  <div
    class="bg-back-folder-gray w-screen h-screen text-white pt-20 flex justify-center items-center bg-[url('@/assets/img/fallback-title-bg.jpg')] bg-center bg-cover"
  >
    <div class="text-center">
      <h1 class="font-bold text-[10rem] uppercase">Zychose</h1>
      <button
        class="bg-button-green font-semibold rounded py-4 px-8 text-4xl mb-10"
        v-on:click="$router.push('/rooms')"
      >
        Play
      </button>
    </div>
  </div>
</template>
