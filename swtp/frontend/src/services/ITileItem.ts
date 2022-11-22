/**
 * Interface für States der Tiles
 */
export interface ITileItem {
    id: number,
    name: string,
}

export class TileEle implements ITileItem {
    id = 0;
    name = "";
    

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

}
