/**
 * Interface for StreetBlocks
 */
export interface IStreetBlock {
  name: string;
  currentRotation: number;
  possibleRotation: number[];
  vehicleTypes: string[];
  imgPath: string;
}

export class StreetBlock implements IStreetBlock {
  name = "";
  currentRotation = 0;
  possibleRotation = [0];
  vehicleTypes = [""];
  imgPath = "";

  /**
   *
   * @param name name of StreetBlock as string
   * @param currentRotation
   * @param possibleRotation array with possible rotations of this StreetBlock
   * @param vehicleTypes array that specifies which vehicle types this StreetBlock is used for
   * @param imgPath path to 2D-image to show in StreetMenu
   */
  constructor(
    name: string,
    currentRotation: number,
    possibleRotation: number[],
    vehicleTypes: string[],
    imgPath: string
  ) {
    this.name = name;
    this.currentRotation = currentRotation;
    this.possibleRotation = possibleRotation;
    this.vehicleTypes = vehicleTypes;
    this.imgPath = imgPath;
  }
}
