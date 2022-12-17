import type { IStreetBlock } from "@/services/IStreetBlock";
import { readonly, ref } from "vue";

const initCurrActiveState = "";

// Work in progress
const currentActiveTab = ref("car");

const stateStreetBlock = ref<IStreetBlock>({
  type: initCurrActiveState,
  rotate: 0,
  possibleRotation: [0, 90, 180, -90],
  bulldozerActive: false,
});

export function useStreetBlock() {
  /**
   * Find an element of tileTypes by type name
   * @returns found tileType
   */

  function changeCurrentTileType(s: string) {
    stateStreetBlock.value.type = s;
  }

  function toggleBulldozer(b: boolean) {
    stateStreetBlock.value.bulldozerActive = b;
  }

  function changeCurrentTab(s: string) {
    currentActiveTab.value = s;
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
      ele.rotate = degree;
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
