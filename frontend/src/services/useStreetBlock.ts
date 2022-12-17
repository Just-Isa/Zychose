import type { IStreetBlock, StreetBlock } from "@/services/IStreetBlock";
import { readonly, ref } from "vue";

const initCurrActiveState = "";

// Work in progress
const currentActiveTab = ref("car");

const stateStreetBlock = ref<IStreetBlock>({
  type: initCurrActiveState,
  currentRotation: 0,
  possibleRotation: [0, 90, 180, -90],
  bulldozerActive: false,
});

export function useStreetBlock() {
  function changeCurrentTileType(s: StreetBlock) {
    stateStreetBlock.value = s;
  }

  function toggleBulldozer(b: boolean) {
    stateStreetBlock.value.bulldozerActive = b;
  }

  function changeCurrentTab(s: string) {
    currentActiveTab.value = s;
    //changeCurrentTileType("");
    toggleBulldozer(false);
  }

  /**
   * Set the rotate value from tile
   * @param {number} degree - new rotate value
   * @param {string} type - Type of Tile
   */
  function changeRotation(degree: number, type: string) {
    console.log("DEGREE" + degree + "TYPE" + type);
    const ele = stateStreetBlock.value;
    if (ele) {
      ele.currentRotation = degree;
    }
    console.log(ele);
  }

  return {
    streetBlock: readonly(stateStreetBlock),
    changeCurrentTileType,
    toggleBulldozer,
    changeRotation,
    currentActiveTab: readonly(currentActiveTab),
    changeCurrentTab,
  };
}
