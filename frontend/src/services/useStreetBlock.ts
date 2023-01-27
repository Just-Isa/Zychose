import { reactive, readonly, ref } from "vue";
import swtpConfigJSON from "../../../swtp.config.json";
import type { StreetBlock } from "@/model/IStreetBlock";

/**
 * State Interface for information on active StreetBlock and Bulldozer
 */
const stateStreetBlock = reactive({
  streetBlock: {
    name: "",
    currentRotation: 0,
    imgPath: "",
    possibleRotations: new Array<number>(),
    possibleVehicleTypes: new Array<string>(),
    isBulldozer: false,
  },
});

const bulldozerActive = reactive({
  isActive: false,
});

const vehicleTabs = swtpConfigJSON.vehicleTabs;

const menuTabState = reactive({
  // Active tab is set to first entry in SWTPConfig at first initialisation
  currentActiveTab: vehicleTabs[0].name,
  currentTabChanged: false,
});

const isRotationTriggeredState = ref(false);

export function useStreetBlock() {
  function changeCurrentStreetType(s: StreetBlock) {
    stateStreetBlock.streetBlock = s;
  }

  function toggleBulldozer(b: boolean) {
    bulldozerActive.isActive = b;
    stateStreetBlock.streetBlock.isBulldozer = b;
  }

  function changeCurrentTab(s: string) {
    menuTabState.currentActiveTab = s;
    menuTabState.currentTabChanged = true;
  }

  function resetCurrentChangedTab() {
    menuTabState.currentTabChanged = false;
  }

  function changeRotationTriggered(b: boolean) {
    isRotationTriggeredState.value = b;
  }

  /**
   * changes currentRotation of StreetBlock
   * WIP: might change when street types are in json-format
   *
   * @param s currently selected StreetBlock
   * @param d new rotation
   */
  function changeRotation(degree: number) {
    stateStreetBlock.streetBlock.currentRotation = degree;
  }

  return {
    activeBlock: readonly(stateStreetBlock),
    changeCurrentStreetType,
    toggleBulldozer,
    changeRotation,
    changeCurrentTab,
    bulldozerActive,
    menuTabState,
    resetCurrentChangedTab,
    isRotationTriggeredState,
    changeRotationTriggered,
  };
}
