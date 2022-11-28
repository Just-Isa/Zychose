import type { ITileItem } from "@/services/ITileItem";
import { readonly, ref } from "vue";

/**
 * Tiles werden mit Interface erstellt, durchgereicht mit Export Function
 */
const state = ref<ITileItem>({
    type: "",
    active: false
}); 



export function useTile() {
    function getTileType() {
        return state.value.type;
    }

    function setTileType(s: string) {
        console.log("STATE VORHER: "+ state.value.type)
        state.value.type = s;
        console.log("STATE NACHHER: "+ state.value.type)
    }

    function getActive(){
        return state.value.active;
    }

    function setActive(b: boolean){
        state.value.active = b;
    }

    return {
        tile: readonly(state),
        getTileType,
        setTileType,
        getActive,
        setActive
    }
}

