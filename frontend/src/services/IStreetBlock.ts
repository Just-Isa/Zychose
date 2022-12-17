/**
 * Interface für States der Tiles
 * *
 * @param {string} type - Type of Tile
 * @param {string} imgSrc - Path to image
 * @param {number} rotate - street rotation in degree
 * @param {boolean[]} possibleRotation - valid street rotations [is90Allowed, is180Allowed, is270Allowed]
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
