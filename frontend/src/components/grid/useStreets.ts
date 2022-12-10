import { gridToJson } from "@/services/JSONparser";
import { reactive, readonly } from "vue";
/**
 * @enum {TypeStreet}  Different types of Streets and delete.
 */
export enum TypeStreet {
  delete,
  straight,
  curve,
  tCrossing,
  crossing,
}
/**
 * @enum {Rotations} Different types of Rotations
 */
export enum Rotations {
  Zero = 0,
  Ninety = 90,
  OneHundredEighty = 180,
  TwoHundredSeventy = 270,
}
/**
 * Interface to save street information
 * @param {TypeStreet} streetType - Type of Street
 * @param {number} rotation - street rotation in degree
 * @param {number} posX - Position on x axis
 * @param {number} posY - Position on y axis
 */
export interface IStreetInformation {
  streetType: TypeStreet;
  rotation: number;
  posX: number;
  posY: number;
}
/**
 * State that saves the information about the streets in an Array of IStreetInformation Objects
 */
const state = reactive({
  streets: Array<IStreetInformation>(),
});
/**
 * State Management for the streets
 * @see {@link handleClick} function that handles the onGridClickObject
 * @see {@link TypeStreet} enum for the different street types and delete
 * @see {@link IStreetInformation} interface for the information saved in the state
 * @returns Returns the Array of streets (readonly), the handleClick function and the enum TypeStreet
 */
export function useStreets() {
  /**
   * Function of the State to handle the onGridClickObject.
   * If delete is selected the street in the array needs to be removed.
   * Otherwise the street needs to be saved.
   * @param {IStreetInformation} onGridClickObject - IStreetInformation Object that needs to be saved or deleted
   */
  function handleClick(onGridClickObject: IStreetInformation): void {
    if (onGridClickObject.streetType === TypeStreet.delete) {
      state.streets = state.streets.filter(
        (street) =>
          street.posX !== onGridClickObject.posX ||
          street.posY !== onGridClickObject.posY
      );
    } else {
      const str = state.streets.filter(
        (street) =>
          street.posX === onGridClickObject.posX &&
          street.posY === onGridClickObject.posY
      );
      if (str.length > 0) {
        str[0].rotation = onGridClickObject.rotation;
        str[0].streetType = onGridClickObject.streetType;
      } else {
        state.streets.push(onGridClickObject);
      }
    }
    console.log("STATE: ", state.streets);
    gridToJson(state.streets);
  }

  function recieveNewStreetState(newStreets: Array<IStreetInformation>) {
    state.streets = newStreets;
  }

  function isStreetPlaced(row: number, col: number) {
    const streetFound = state.streets.filter(
      (street) => street.posX === row && street.posY === col
    );
    return streetFound.length > 0;
  }

  return {
    streets: readonly(state.streets),
    handleClick,
    TypeStreet,
    isStreetPlaced,
    recieveNewStreetState,
  };
}
