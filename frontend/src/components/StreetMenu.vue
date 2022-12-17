<template>
  <div class="fixed bottom-6 left-1/2 -translate-x-1/2 pointer-events-none">
    <div class="tabs flex gap-3">
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
        :types="streetTypes"
      />
      <StreetMenuFolder
        v-if="activetab === 2"
        class="pointer-events-auto tabcontent flex rounded-b-lg rounded-tr-lg"
        :types="bikeTypes"
      />
      <BullDozerBtn
        cursorSrc="src/assets/img/bulldozer-cursor.svg"
        class="pointer-events-auto"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import StreetMenuFolder from "./StreetMenuFolder.vue";
import BullDozerBtn from "./BullDozerBtn.vue";
import { useTile } from "@/services/useTileState";

const { changeCurrentTileType, tile, allTiles, toggleBulldozer } = useTile();

/**
 * activetab: numeration of tabs from left to right
 */
const activetab = ref(1);

const streetTypes = ["straight", "tCrossing", "curve", "crossing"];
const bikeTypes = ["straight", "tCrossing"];

/**
 * function to change the selected tab and switch the displayed content for the tile menu
 * @param newTabNumber number of the newly selected tab
 */
function changeTab(newTabNumber: number) {
  changeCurrentTileType("");
  toggleBulldozer(false);
  // set active StreetTile to "" when switching between folders
  console.log("altes Tab: " + activetab.value);

  activetab.value = newTabNumber;

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
