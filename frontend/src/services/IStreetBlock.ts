/**
 * Interface for StreetBlocks
 */
export interface IStreetBlock {
  type: string;
  currentRotation: number;
  possibleRotation: number[];
}

export class StreetBlock implements IStreetBlock {
  type = "";
  currentRotation = 0;
  possibleRotation = [0];

  /**
   *
   * @param type name of StreetBlock as string
   * @param currentRotation
   * @param possibleRotation array with possible rotations of this StreetBlock
   */
  constructor(
    type: string,
    currentRotation: number,
    possibleRotation: number[]
  ) {
    this.type = type;
    this.currentRotation = currentRotation;
    this.possibleRotation = possibleRotation;
  }
}
