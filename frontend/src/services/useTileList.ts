import { TileEle, type ITileItem } from "@/services/ITileItem";
import { readonly, ref } from "vue";

/**
 * Tiles werden mit Interface erstellt, durchgereicht mit Export Function
 */
const tiles = ref<ITileItem[]>([]);

function basicTiles(): ITileItem[] {
  const tiles: ITileItem[] = [
    new TileEle(1, "STREET"),
    new TileEle(2, "CROSS"),
    new TileEle(3, "CURVE"),
    new TileEle(4, "TCROSS"),
  ];
  return tiles;
}

tiles.value = basicTiles();

export function getBasicTiles() {
  return {
    tiles: readonly(tiles),
  };
}
