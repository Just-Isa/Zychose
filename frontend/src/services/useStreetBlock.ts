import { StreetBlock } from "@/services/IStreetBlock";
import { reactive, readonly } from "vue";

// Work in progress

export interface IStreetTypes {
  vehicleTypes: string[][];
  carTypes: StreetBlock[];
  bikeTypes: StreetBlock[];
  currentActiveTab: string;
}

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
    console.log(streetTypesState.currentActiveTab);

    streetTypesState.currentActiveTab = s;
    console.log(s);
    console.log(streetTypesState.currentActiveTab);
    changeCurrentTileType(new StreetBlock("", 0, []));
    toggleBulldozer(false);
  }

  /**
   * Set the rotate value from tile
   * @param {number} degree - new rotate value
   * @param {string} type - Type of Tile
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
