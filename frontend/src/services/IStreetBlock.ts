/**
 * Interface for StreetBlocks
 */
export interface IStreetBlock {
  name: string;
  currentRotation: number;
  svgPath: string;
  possibleRotations: number[];
  possibleVehicleTypes: string[];
}

export class StreetBlock implements IStreetBlock {
  name = "";
  currentRotation = 0;
  svgPath = "";
  possibleRotations = [0];
  possibleVehicleTypes = [""];

  /**
   *
   * @param name name of StreetBlock as string
   * @param currentRotation
   * @param possibleRotations array with possible rotations of this StreetBlock
   * @param possibleVehicleTypes array that specifies which vehicle types this StreetBlock is used for
   */
  constructor(
    name: string,
    currentRotation: number,
    svgPath: string,
    possibleRotations: number[],
    possibleVehicleTypes: string[]
  ) {
    this.name = name;
    this.currentRotation = currentRotation;
    this.svgPath = svgPath;
    this.possibleRotations = possibleRotations;
    this.possibleVehicleTypes = possibleVehicleTypes;
  }
}
