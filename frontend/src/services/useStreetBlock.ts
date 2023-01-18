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
  streetBlock: new StreetBlock("", 0, [], [""], ""),
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
    new StreetBlock(
      "road_straight",
      0,
      [0, 90],
      ["car"],
      "/assets/img/road_straight.png"
    ),
    new StreetBlock(
      "road_t",
      0,
      [0, 90, 180, -90],
      ["car"],
      "/assets/img/road_t.png"
    ),
    new StreetBlock(
      "road_curve",
      0,
      [0, 90, 180, -90],
      ["car"],
      "/assets/img/road_curve.png"
    ),
    new StreetBlock(
      "road_cross",
      0,
      [0],
      ["car"],
      "/assets/img/road_cross.png"
    ),
    new StreetBlock(
      "sidewalk_straight",
      0,
      [0, 90],
      ["bike"],
      "/assets/img/sidewalk_straight.png"
    ),
    new StreetBlock(
      "sidewalk_t",
      0,
      [0, 90, 180, -90],
      ["bike"],
      "/assets/img/sidewalk_t.png"
    ),
    new StreetBlock(
      "sidewalk_curve",
      0,
      [0, 90, 180, -90],
      ["bike"],
      "/assets/img/sidewalk_curve.png"
    ),
    new StreetBlock(
      "sidewalk_cross",
      0,
      [0],
      ["bike"],
      "/assets/img/sidewalk_cross.png"
    ),
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
    changeCurrentStreetType(new StreetBlock("", 0, [], [""], ""));
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
