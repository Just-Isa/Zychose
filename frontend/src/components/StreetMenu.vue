<template>
  <div
    class="fixed bottom-6 left-1/2 -translate-x-1/2 pointer-events-none z-50"
  >
    <div class="tabs flex gap-3">
      <div
        v-for="vehicle in streetTypesState.vehicleTypes"
        v-bind:key="vehicle[1]"
      >
        <StreetMenuTab
          :vehicleType="vehicle[0]"
          :imgSrc="vehicle[1]"
          @click="changeCurrentTab(vehicle[0])"
          v-bind:class="[
            streetTypesState.currentActiveTab === vehicle[0]
              ? 'active shadow-lg'
              : 'bg-inactive-folder-gray',
          ]"
        ></StreetMenuTab>
      </div>
    </div>

    <div class="flex justify-items-center items-center">
      <div
        id="streetMenuFolder"
        class="hover:cursor-default"
        v-for="key in Object.keys(vehicleTypeDict)"
        v-bind:key="key"
      >
        <StreetMenuFolder
          v-if="streetTypesState.currentActiveTab === key"
          :types="vehicleTypeDict[key]"
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
import type { StreetBlock } from "@/services/IStreetBlock";

const { changeCurrentTab, streetTypesState } = useStreetBlock();

const vehicleTypeDict: { [type: string]: StreetBlock[] } = {};

streetTypesState.vehicleTypes.forEach((type) => {
  vehicleTypeDict[type[0]] = streetTypesState.streetTypes.filter((obj) => {
    return obj.vehicleTypes.includes(type[0]);
  }) as StreetBlock[];
});

vehicleTypeDict;
</script>
