import { TileEle, type ITileItem } from "@/services/ITileItem";
import { readonly, ref, computed } from "vue";

// (sehr bescheidener) innerer "State": Liste von Angeboten als ref
// da die Liste leer initialisiert werden soll, geben wir der ref()-Funktion
// einen passenden Typparameter mit, da der Array-Typ aus [] allein nicht hervorgeht
const tiles = ref<ITileItem[]>([])



// Liste mit hardcodierten Angeboten (aber echten Geo-Koordinaten)
function basicTiles(): ITileItem[] {
    const tiles: ITileItem[] = [
        new TileEle(1, "Straße"),
        new TileEle(2, "Kreuzung"),
        new TileEle(3, "Kurve")
    ]
    return tiles
}



tiles.value = basicTiles()



export function getBasicTiles() {
    return {
        tiles: readonly(tiles)
    }
}

