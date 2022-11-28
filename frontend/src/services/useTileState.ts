import type { ITileItem } from "@/services/ITileItem";
import { readonly, ref } from "vue";

/**
 * Tiles werden mit Interface erstellt, durchgereicht mit Export Function
 */
const state = ref<ITileItem>({
    type: ""
}); 



export function useTile() {
    function getTileType() {
        console.log(state.value.type);
        return state.value.type;
    }

    function setTileType(s: string) {
        console.log("STATE VORHER: "+ state.value.type)
        state.value.type = s;
        console.log("STATE NACHHER: "+ state.value.type)
    }

    return {
        tile: readonly(state),
        getTileType,
        setTileType
    }
}

