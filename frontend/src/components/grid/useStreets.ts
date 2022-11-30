import { reactive, readonly } from "vue";
/**
 * @enum {TypeStreet}  Different types of Streets and delete.
 */
export enum TypeStreet {
  // TODO add to type when Malte finishes StreetMenu
  delete,
  straight,
  curve,
  tCrossing,
  crossing,
}
/**
 * Interface to save street information
 * @param {TypeStreet} streetType - Type of Street
 * @param {number} rotation - street rotation in degree
 * @param {number} posX - Position on x axis
 * @param {number} posY - Position on y axis
 */
export interface IStreetInformation {
  streettype: TypeStreet;
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
    //const finished = false;
    if (onGridClickObject.streettype === TypeStreet.delete) {
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
        str[0].streettype = onGridClickObject.streettype;
      } else {
        state.streets.push(onGridClickObject);
      }
      /*
      for (const street of state.streets) {
        if (
          street.posX === onGridClickObject.posX &&
          street.posY === onGridClickObject.posY
        ) {
          street.rotation = onGridClickObject.rotation;
          street.streettype = onGridClickObject.streettype;
          finished = true;
          break;
        }
      }
      if (!finished) {
        state.streets.push(onGridClickObject);
      }*/
    }
    console.log("STATE: ", state.streets);
    console.log("#####################################################");
  }

  return {
    streets: readonly(state.streets),
    handleClick,
    TypeStreet,
  };
}
