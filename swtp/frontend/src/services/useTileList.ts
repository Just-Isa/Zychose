import { TileEle, type ITileItem } from "@/services/ITileItem";
import { readonly, ref, computed } from "vue";

// (sehr bescheidener) innerer "State": Liste von Angeboten als ref
// da die Liste leer initialisiert werden soll, geben wir der ref()-Funktion
// einen passenden Typparameter mit, da der Array-Typ aus [] allein nicht hervorgeht
const tiles = ref<ITileItem[]>([])



// Liste mit hardcodierten Angeboten (aber echten Geo-Koordinaten)
function basicTiles(): ITileItem[] {
    const tiles: ITileItem[] = [
        new TileEle(1, "STREET"),
        new TileEle(2, "CROSS"),
        new TileEle(3, "CURVE"),
        new TileEle(4, "TCROSS")
    ]
    return tiles
}



tiles.value = basicTiles()


export function getBasicTiles() {
    return {
        tiles: readonly(tiles)
    }
}

