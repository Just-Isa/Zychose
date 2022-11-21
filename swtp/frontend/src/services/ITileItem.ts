

export interface ITileItem {
    typeid: number,
    name: string,
}

export class TileEle implements ITileItem {
    typeid = 0;
    name = "";
    

    constructor(typeid: number, name: string) {
        this.typeid = typeid;
        this.name = name;
    }

}
