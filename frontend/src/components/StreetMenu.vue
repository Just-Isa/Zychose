<!--- 
Menu for selecting street tiles according to selected vehicle.
Source for basic tab idea: https://vuejsexamples.com/tabbed-content-with-vue-js/
-->
<template>
  <div class="fixed bottom-6 left-1/2 -translate-x-1/2">
    <div class="flex gap-5">
      <a
        @click="changeTab(1)"
        v-bind:class="[activetab === 1 ? 'active' : '']"
        class="bg-street-menu-bg-gray px-3 pt-1 rounded-tl-lg rounded-tr-lg"
      >
        <img src="../assets/img/car-pictogram.svg" />
      </a>
      <a @click="changeTab(2)" v-bind:class="[activetab === 2 ? 'active' : '']">
        <img src="../assets/img/bicycle-pictogram.svg"
      /></a>
    </div>
    <div class="flex justify-items-center items-center">
      <StreetMenuFolder
        v-if="activetab === 1"
        class="tabcontent flex rounded-lg"
      />
      <StreetMenuFolder
        v-if="activetab === 2"
        class="tabcontent flex rounded-lg"
      />
      <BulldozerIcon />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import StreetMenuFolder from "./StreetMenuFolder.vue";
import BulldozerIcon from "./BulldozerIcon.vue";

/**
 * activetab: numeration of tabs from left to right
 */
const activetab = ref(1);

/**
 * function to change the selected tab and switch the displayed content for the tile menu
 * @param newTabNumber number of the newly selected tab
 */
function changeTab(newTabNumber: number) {
  console.log("altes Tab: " + activetab.value);

  // delete class on old tab
  let oldTab = document.getElementById("tab" + activetab.value);
  if (oldTab != null) {
    oldTab.classList.remove("active");
  }

  activetab.value = newTabNumber;

  // set class on new tab
  let newTab = document.getElementById("tab" + activetab.value);
  if (newTab != null) {
    newTab.classList.add("active");
  }

  console.log("neues Tab:" + activetab.value);
}
</script>

<style>
footer {
  bottom: 7.8rem;
}

/* Style the tabs */
.tabHead {
  height: 1.125rem;
  width: 3.125rem;
}

.tabs a {
  float: left;
  cursor: pointer;
  padding: 5px 5px;
  transition: background-color 0.2s;
  border-right: none;
  background-color: #424a4c;
  border-radius: 10px 10px 0 0;
  font-weight: bold;
  margin-right: 0.7rem;
  margin-bottom: 0.2rem;
}

/* Styling for active tab */
.tabs a.active {
  background-color: #5b6569; /* Tallwind Configuration nötig für custom-Farbvariable */
  color: #fff;
  cursor: default;
}
</style>
