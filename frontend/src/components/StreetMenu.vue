<!--- 
Menu for selecting street tiles according to selected vehicle.
Source for basic tab idea: https://vuejsexamples.com/tabbed-content-with-vue-js/
-->

<template>
  <div class="fixed bottom-6 left-1/2 -translate-x-1/2 pointer-events-none">
    <div class="tabs flex gap-3">
      <!--- 
        Tabs jetzt nicht als Komponente - werden nicht weiter modifiziert/weiterbenutzt, 
        ergo einfacher einfach nur ein Tag mit Klickfunktion und CSS zu haben.
      -->
      <a
        @click="changeTab(1)"
        v-bind:class="[
          activetab === 1 ? 'active shadow-lg' : 'bg-inactive-folder-gray',
        ]"
        class="pointer-events-auto bg-street-menu-bg-gray px-4 pt-1 rounded-tl-lg rounded-tr-lg hover:cursor-pointer"
      >
        <img src="../assets/img/car-pictogram.svg" />
      </a>
      <a
        @click="changeTab(2)"
        v-bind:class="[
          activetab === 2 ? 'active shadow-lg' : 'bg-inactive-folder-gray',
        ]"
        class="pointer-events-auto bg-street-menu-bg-gray px-4 pt-1 rounded-tl-lg rounded-tr-lg hover:cursor-pointer"
      >
        <img src="../assets/img/bicycle-pictogram.svg"
      /></a>
    </div>
    <div class="flex justify-items-center items-center">
      <StreetMenuFolder
        v-if="activetab === 1"
        class="pointer-events-auto tabcontent flex rounded-b-lg rounded-tr-lg"
      />
      <BikeMenuFolder
        v-if="activetab === 2"
        class="pointer-events-auto tabcontent flex rounded-b-lg rounded-tr-lg"
      />
      <BulldozerIcon class="pointer-events-auto" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import StreetMenuFolder from "./StreetMenuFolder.vue";
import BikeMenuFolder from "./BikeMenuFolder.vue";
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
/**
mit Tailwind lässt sich die Hintergrund-Farbe des nicht aktiven Tabs leider nicht ändern
(wie es mit tailwind funktionieren sollte, ist aber noch drin)
 */

.tabs a {
  background-color: #424a4c;
}

.tabs a.active {
  background-color: #5b6569;
}
</style>
