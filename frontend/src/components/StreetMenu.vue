<template>
  <div class="fixed bottom-6 left-1/2 -translate-x-1/2 pointer-events-none">
    <!-- <div class="tabs flex gap-3">
      <a
        @click="changeTab(1)"
        v-bind:class="[
          activetab === 1 ? 'active shadow-lg' : 'bg-inactive-folder-gray',
        ]"
        class="pointer-events-auto bg-street-menu-bg-gray px-4 pt-1 rounded-tl-lg rounded-tr-lg hover:cursor-pointer"
      >
        <img src="../assets/img/car-pictogram.svg" alt="car-menu" />
      </a>
      <a
        @click="changeTab(2)"
        v-bind:class="[
          activetab === 2 ? 'active shadow-lg' : 'bg-inactive-folder-gray',
        ]"
        class="pointer-events-auto bg-street-menu-bg-gray px-4 pt-1 rounded-tl-lg rounded-tr-lg hover:cursor-pointer"
      >
        <img src="../assets/img/bicycle-pictogram.svg" alt="bicycle-menu"
      /></a>
    </div> -->
    <div class="tabs flex gap-3">
      <div v-for="vehicle in vehicleTypes" v-bind:key="vehicle[1]">
        <StreetMenuTab
          :vehicleType="vehicle[0]"
          :imgSrc="vehicle[1]"
          @click="changeTab(vehicle[0])"
          v-bind:class="[
            activetab === vehicle[0] ? 'active shadow-lg' : 'bg-[#424A4C]',
          ]"
        ></StreetMenuTab>
      </div>
    </div>

    <div class="flex justify-items-center items-center">
      <div id="streetMenuFolder">
        <StreetMenuFolder
          v-if="activetab === 'streetTypes'"
          class="pointer-events-auto tabcontent flex rounded-b-lg rounded-tr-lg"
          :types="streetTypes"
        />
        <StreetMenuFolder
          v-if="activetab === 'bikeTypes'"
          class="pointer-events-auto tabcontent flex rounded-b-lg rounded-tr-lg"
          :types="bikeTypes"
        />
      </div>

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
import StreetMenuTab from "./StreetMenuTab.vue";
import { useTile } from "@/services/useTileState";

const { changeCurrentTileType, toggleBulldozer } = useTile();

/**
 * activetab: currently string representing the corresponding vehicle
 */
const activetab = ref("streetTypes");

const streetTypes = ["straight", "tCrossing", "curve", "crossing"];
const bikeTypes = ["straight", "tCrossing"];

/**
 * TODO: wie bekommt man die Daten? auch über json, wie die StreetBlocks?
 */
const vehicleTypes = [
  ["streetTypes", "car-pictogram.svg"],
  ["bikeTypes", "bicycle-pictogram.svg"],
];

/**
 * function to change the selected tab and switch the displayed content for the tile menu
 * @param newTabNumber number of the newly selected tab
 */
function changeTab(vehicleType: string) {
  changeCurrentTileType("");
  toggleBulldozer(false);
  // set active StreetTile to "" when switching between folders
  console.log("altes Tab: " + activetab.value);

  activetab.value = vehicleType;

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
