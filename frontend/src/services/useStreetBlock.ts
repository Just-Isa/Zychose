import { StreetBlock } from "@/services/IStreetBlock";
import { reactive, readonly } from "vue";
/**
 * State Interface for information on street menus
 * WIP: might change when street types are in json-format
 */
export interface IStreetTypes {
  vehicleTypes: string[][];
  carTypes: StreetBlock[];
  bikeTypes: StreetBlock[];
  currentActiveTab: string;
}

/**
 * State Interface for information on active StreetBlock and Bulldozer
 */
export interface IStateStreetblock {
  streetBlock: StreetBlock;
  bulldozerActive: boolean;
}

const stateStreetBlock = reactive<IStateStreetblock>({
  streetBlock: new StreetBlock("", 0, []),
  bulldozerActive: false,
});

const streetTypesState = reactive<IStreetTypes>({
  vehicleTypes: [
    ["car", "car-pictogram.svg"],
    ["bike", "bicycle-pictogram.svg"],
  ],
  carTypes: [
    new StreetBlock("straight", 0, [0, 90]),
    new StreetBlock("tCrossing", 0, [0, 90, 180, -90]),
    new StreetBlock("curve", 0, [0, 90, 180, -90]),
    new StreetBlock("crossing", 0, [0]),
  ],
  bikeTypes: [
    new StreetBlock("straight", 0, [0, 90]),
    new StreetBlock("tCrossing", 0, [0, 90, 180, -90]),
  ],
  currentActiveTab: "car",
});

export function useStreetBlock() {
  function changeCurrentTileType(s: StreetBlock) {
    stateStreetBlock.streetBlock = s;
  }

  function toggleBulldozer(b: boolean) {
    stateStreetBlock.bulldozerActive = b;
  }

  function changeCurrentTab(s: string) {
    streetTypesState.currentActiveTab = s;
    changeCurrentTileType(new StreetBlock("", 0, []));
    toggleBulldozer(false);
  }

  /**
   * changes currentRotation of StreetBlock
   * WIP: might change when street types are in json-format
   *
   * @param s currently selected StreetBlock
   * @param d new rotation
   */
  function changeRotation(s: StreetBlock, d: number) {
    switch (streetTypesState.currentActiveTab) {
      case "car":
        streetTypesState.carTypes[
          streetTypesState.carTypes.indexOf(s)
        ].currentRotation = d;
        break;

      case "bike":
        streetTypesState.bikeTypes[
          streetTypesState.bikeTypes.indexOf(s)
        ].currentRotation = d;
        break;
      default:
        console.log("Error while rotating, no active tab!");
        break;
    }
  }

  return {
    streetBlockState: readonly(stateStreetBlock),
    changeCurrentTileType,
    toggleBulldozer,
    changeRotation,
    changeCurrentTab,
    streetTypesState: readonly(streetTypesState),
  };
}
