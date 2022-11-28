/**
 * Interface für States der Tiles
 */
 export interface ITileItem {
  type: string,
}

export class TileEle implements ITileItem {
  type = "";
  

  constructor(type: string) {
      this.type = type;
  }

}
