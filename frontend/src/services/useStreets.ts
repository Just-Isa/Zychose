import { gridToJson } from "./JSONparser";
import { reactive, readonly } from "vue";
import { useRoom } from "./useRoom";
import { logger } from "@/helpers/Logger";

const { updateRoomMap } = useRoom();

/**
 * Interface to save street information
 * @param {String} streetType - Type of Street
 * @param {number} rotation - street rotation in degree
 * @param {number} posX - Position on x axis
 * @param {number} posY - Position on y axis
 */
export interface IStreetInformation {
  streetType: string;
  rotation: number;
  posX: number;
  posY: number;
  isBulldozer: boolean;
}
/**
 * State that saves the information about the streets in an Array of IStreetInformation Objects
 */
const state = reactive({
  streets: Array<IStreetInformation>(),
});

/**
 * State Management for the streets
 * @see {@link updateStreetState} function that handles the onGridClickObject
 * @see {@link IStreetInformation} interface for the information saved in the state
 * @returns Returns the Array of streets (readonly) and the functions updateStreetState, isStreetPlaced and receiveNewStreetState,
 */
export function useStreets() {
  /**
   * Initializes the streetState
   */
  function initializeStreetState(): void {
    const DEST =
      "/api/room/map/" + (location.pathname.split("/")[1] as any as number);

    fetch(DEST, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          logger.log(response);
        }
        return response.json();
      })
      .then((jsondata) => {
        updateRoomMap(JSON.stringify(jsondata));
        receiveNewStreetState(jsondata as Array<IStreetInformation>);
      })
      .catch((e) => {
        console.error(e);
      });
  }

  /**
   * Function of the State to handle the onGridClickObject.
   * If the bulldozer is selected the street in the array needs to be removed.
   * Otherwise the street needs to be saved.
   * @param {IStreetInformation} onGridClickObject - IStreetInformation Object that needs to be saved or deleted
   */
  function updateStreetState(onGridClickObject: IStreetInformation): void {
    if (onGridClickObject.isBulldozer) {
      state.streets = state.streets.filter(
        (street) =>
          street.posX !== onGridClickObject.posX ||
          street.posY !== onGridClickObject.posY
      );
    } else {
      if (state.streets.length) {
        const foundStreet = state.streets.find(
          (street) =>
            street.posX === onGridClickObject.posX &&
            street.posY === onGridClickObject.posY
        );
        if (foundStreet) {
          foundStreet.rotation = onGridClickObject.rotation;
          foundStreet.streetType = onGridClickObject.streetType;
        } else {
          state.streets.push(onGridClickObject);
        }
      } else {
        state.streets.push(onGridClickObject);
      }
    }
    logger.log(state.streets);
    gridToJson(state.streets);
  }

  /**
   * Sets our state to the new streets
   * @param {Array<IStreetInformation>} newStreets - Array of streets generated by our jsonToState-function
   */
  function receiveNewStreetState(newStreets: Array<IStreetInformation>) {
    state.streets = newStreets;
  }

  /**
   *
   * @param {number} row - row of the cell to be checked
   * @param {number} col - column of the cell to be checked
   * @returns the placed street, if there is a street placed on the checked cell, else undefined
   */
  function placedStreet(row: number, col: number) {
    if (state.streets.length) {
      return state.streets.find(
        (street) => street.posX === row && street.posY === col
      );
    }
  }

  return {
    streetsState: readonly(state),
    updateStreetState,
    placedStreet,
    receiveNewStreetState,
    initializeStreetState,
  };
}
