/**
 * Interface für States der Tiles
 */
export interface ITileItem {
  type: string;
  active: boolean;
}

export class TileEle implements ITileItem {
  type = "";
  active = false;

  constructor(type: string, active: boolean) {
    this.type = type;
    this.active = active;
  }
}
