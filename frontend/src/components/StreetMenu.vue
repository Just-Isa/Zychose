<template>
  <div
    class="fixed bottom-6 left-1/2 -translate-x-1/2 pointer-events-none z-50"
  >
    <div class="tabs flex gap-3">
      <div v-for="vehicle in vehicleTabs" v-bind:key="vehicle.name">
        <StreetMenuTab
          :vehicleType="vehicle.name"
          :imgSrc="vehicle.iconPath"
          :isActive="menuTabState.currentActiveTab === vehicle.name"
          @click="changeCurrentTab(vehicle.name)"
        />
      </div>
    </div>

    <div class="flex justify-items-center items-center">
      <div id="streetMenuFolder" class="hover:cursor-default">
        <StreetMenuFolder :types="filteredStreetBlocks" />
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
import swtpConfigJSON from "../../../swtp.config.json";
import { computed } from "vue";
import type { StreetBlock } from "@/services/IStreetBlock";

const { changeCurrentTab, menuTabState } = useStreetBlock();

const streetTypes = swtpConfigJSON.streetTypes;

const vehicleTypes = swtpConfigJSON.allVehicleTypes;

const vehicleTabs = swtpConfigJSON.vehicleTabs;

const filteredStreetBlocks = computed(() => {
  let streetBlocks: StreetBlock[] = [];
  let filtered = streetTypes.filter((street) =>
    street.vehicleTypes.includes(menuTabState.currentActiveTab)
  );
  filtered.forEach((street) => {
    let streetBlock: StreetBlock = {
      name: street.name,
      currentRotation: 0,
      svgPath: street.svgPath,
      possibleRotations: street.possibleRotations,
      possibleVehicleTypes: street.vehicleTypes,
    };
    console.log(streetBlock.possibleRotations);
    streetBlocks.push(streetBlock);
  });
  return streetBlocks;
});
</script>
