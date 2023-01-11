import { reactive, readonly } from "vue";
import swtpConfigJSON from "../../../swtp.config.json";
import type { StreetBlock } from "./IStreetBlock";

/**
 * State Interface for information on active StreetBlock and Bulldozer
 */
const stateStreetBlock = reactive({
  streetBlock: {
    name: "",
    currentRotation: 0,
    svgPath: "",
    possibleRotations: [0],
    possibleVehicleTypes: [""],
  },
});

const bulldozerActive = reactive({
  isActive: false,
});

const vehicleTypes = swtpConfigJSON.allVehicleTypes;

const menuTabState = reactive({
  // Active tab is set to car at first initialisation
  currentActiveTab: vehicleTypes[0].name,
});

export function useStreetBlock() {
  function changeCurrentStreetType(s: StreetBlock) {
    stateStreetBlock.streetBlock = s;
  }

  function toggleBulldozer(b: boolean) {
    bulldozerActive.isActive = b;
  }

  function changeCurrentTab(s: string) {
    menuTabState.currentActiveTab = s;
  }

  /**
   * changes currentRotation of StreetBlock
   * WIP: might change when street types are in json-format
   *
   * @param s currently selected StreetBlock
   * @param d new rotation
   */
  function changeRotation(d: number) {
    stateStreetBlock.streetBlock.currentRotation = d;
  }

  return {
    activeBlock: readonly(stateStreetBlock),
    changeCurrentStreetType,
    toggleBulldozer,
    changeRotation,
    changeCurrentTab,
    bulldozerActive,
    menuTabState,
  };
}
