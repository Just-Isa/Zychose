import { StreetBlock } from "@/services/IStreetBlock";
import { reactive, readonly } from "vue";
import type { VehicleType } from "./IVehicleType";
import swtpConfigJSON from "../../../swtp.config.json";
/**
 * State Interface for information on street menus
 * WIP: might change when street types are in json-format
 */
export interface IStreetTypes {
  vehicleTypes: VehicleType[];
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

const streetTypesFromJson = <StreetBlock[]>(
  JSON.parse(JSON.stringify(swtpConfigJSON.streetTypes))
);

const vehicleTypesFromJson = <VehicleType[]>(
  JSON.parse(JSON.stringify(swtpConfigJSON.allVehicleTypes))
);

const streetTypesState = reactive<IStreetTypes>({
  streetTypes: streetTypesFromJson,
  vehicleTypes: vehicleTypesFromJson,

  // Active tab is set to car at first initialisation
  currentActiveTab: vehicleTypesFromJson[0].name,
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
