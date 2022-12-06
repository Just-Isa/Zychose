/**
 * Interface für States der Tiles
 * *
 * @param {string} type - Type of Tile
 * @param {number} rotate - street rotation in degree
 * @param {boolean[]} possibleRotation - valid street rotations [is90Allowed, is180Allowed, is270Allowed]
 */
export interface ITileItem {
  type: string;
  rotate: number;
  possibleRotation: boolean[];
}

export class TileEle implements ITileItem {
  type = "";
  rotate = 0;
  possibleRotation = [true, true, true];

  constructor(type: string, rotate: number, possibleRotation: boolean[]) {
    this.type = type;
    this.rotate = rotate;
    this.possibleRotation = possibleRotation;
  }
}
