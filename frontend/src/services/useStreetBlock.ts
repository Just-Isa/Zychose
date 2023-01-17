import { StreetBlock } from "@/model/IStreetBlock";
import { reactive, readonly } from "vue";
/**
 * State Interface for information on street menus
 * WIP: might change when street types are in json-format
 */
export interface IStreetTypes {
  vehicleTypes: string[][];
  streetTypes: StreetBlock[];
  currentActiveTab: string;
}

/**
 * State Interface for information on active StreetBlock and Bulldozer
 */
export interface IStateStreetblock {
  streetBlock: StreetBlock;
}

const stateStreetBlock = reactive<IStateStreetblock>({
  streetBlock: new StreetBlock("", 0, [], [""]),
});

const bulldozerActive = reactive({
  isActive: false,
});

const streetTypesState = reactive<IStreetTypes>({
  vehicleTypes: [
    ["car", "car-pictogram.svg"],
    ["bike", "bicycle-pictogram.svg"],
  ],
  streetTypes: [
    new StreetBlock("straight-road", 0, [0, 90], ["car"]),
    new StreetBlock("t-road", 0, [0, 90, 180, -90], ["car"]),
    new StreetBlock("curve-road", 0, [0, 90, 180, -90], ["car"]),
    new StreetBlock("cross-road", 0, [0], ["car"]),
    new StreetBlock("straight-road", 0, [0, 90], ["bike"]),
    new StreetBlock("cross-road", 0, [0, 90, 180, -90], ["bike"]),
  ],
  // Active tab is set to car at first initialisation
  currentActiveTab: "car",
});

export function useStreetBlock() {
  function changeCurrentStreetType(s: StreetBlock) {
    stateStreetBlock.streetBlock = s;
  }

  function toggleBulldozer(b: boolean) {
    bulldozerActive.isActive = b;
  }

  function changeCurrentTab(s: string) {
    streetTypesState.currentActiveTab = s;
    changeCurrentStreetType(new StreetBlock("", 0, [], [""]));
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
    streetTypesState.streetTypes[
      streetTypesState.streetTypes.indexOf(s)
    ].currentRotation = d;
  }

  return {
    activeBlock: readonly(stateStreetBlock),
    changeCurrentStreetType,
    toggleBulldozer,
    changeRotation,
    changeCurrentTab,
    streetTypesState: readonly(streetTypesState),
    bulldozerActive,
  };
}
