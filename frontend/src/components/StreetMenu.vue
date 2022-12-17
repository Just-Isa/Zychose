<template>
  <div class="fixed bottom-6 left-1/2 -translate-x-1/2 pointer-events-none">
    <div class="tabs flex gap-3">
      <div v-for="vehicle in vehicleTypes" v-bind:key="vehicle[1]">
        <StreetMenuTab
          :vehicleType="vehicle[0]"
          :imgSrc="vehicle[1]"
          @click="changeCurrentTab(vehicle[0])"
          v-bind:class="[
            currentActiveTab === vehicle[0]
              ? 'active shadow-lg'
              : 'bg-[#424A4C]',
          ]"
        ></StreetMenuTab>
      </div>
    </div>

    <div class="flex justify-items-center items-center">
      <div id="streetMenuFolder" class="hover:cursor-default">
        <StreetMenuFolder
          v-if="currentActiveTab === 'car'"
          class="pointer-events-auto tabcontent flex rounded-b-lg rounded-tr-lg"
          :types="streetTypes"
        />
        <StreetMenuFolder
          v-if="currentActiveTab === 'bike'"
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
import StreetMenuFolder from "./StreetMenuFolder.vue";
import BullDozerBtn from "./BullDozerBtn.vue";
import StreetMenuTab from "./StreetMenuTab.vue";
import { useStreetBlock } from "@/services/useStreetBlock";
import { StreetBlock } from "@/services/IStreetBlock";

const { currentActiveTab, changeCurrentTab } = useStreetBlock();

const streetTypes = [
  new StreetBlock("straight", 0, [0, 90], false),
  new StreetBlock("tCrossing", 0, [0, 90, 180, -90], false),
  new StreetBlock("curve", 0, [0, 90, 180, -90], false),
  new StreetBlock("crossing", 0, [0], false),
];

const bikeTypes = [
  new StreetBlock("straight", 0, [0, 90], false),
  new StreetBlock("tCrossing", 0, [0, 90, 180, -90], false),
];
/**
 * TODO: wie bekommt man die Daten? auch über json, wie die StreetBlocks?
 */
const vehicleTypes = [
  ["car", "car-pictogram.svg"],
  ["bike", "bicycle-pictogram.svg"],
];
</script>
