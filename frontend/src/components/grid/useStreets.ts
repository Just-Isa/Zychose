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
 * @param {TypeStreet} streettype - Type of Street
 * @param {number} rotation - street rotation -----> 0 => 0°, 1 => 90°, 2 => 180°, 3 => 270°
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
    let finished: boolean = false;
    if (onGridClickObject.streettype === TypeStreet.delete) {
      state.streets = state.streets.filter(
        (e) =>
          e.posX !== onGridClickObject.posX && e.posY !== onGridClickObject.posY
      );
    } else {
      for (const ele of state.streets) {
        if (
          ele.posX === onGridClickObject.posX &&
          ele.posY === onGridClickObject.posY
        ) {
          ele.streettype = onGridClickObject.streettype;
          ele.rotation = onGridClickObject.rotation;
          finished = true;
          break;
        }
      }
      if (!finished) {
        state.streets.push(onGridClickObject);
      }
    }
  }

  return {
    streets: readonly(state.streets),
    handleClick,
    TypeStreet,
  };
}
