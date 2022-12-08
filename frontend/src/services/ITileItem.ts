/**
 * Interface für States der Tiles
 * *
 * @param {string} type - Type of Tile
 * @param {string} imgSrc - Path to image
 * @param {number} rotate - street rotation in degree
 * @param {boolean[]} possibleRotation - valid street rotations [is90Allowed, is180Allowed, is270Allowed]
 */
export interface ITileItem {
  type: string;
  imgSrc: string;
  rotate: number;
  possibleRotation: boolean[];
}

export class TileEle implements ITileItem {
  type = "";
  imgSrc = "";
  rotate = 0;
  possibleRotation = [true, true, true];

  constructor(
    type: string,
    imgSrc: string,
    rotate: number,
    possibleRotation: boolean[]
  ) {
    this.type = type;
    this.imgSrc = imgSrc;
    this.rotate = rotate;
    this.possibleRotation = possibleRotation;
  }
}
