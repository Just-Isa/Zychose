import type { ITileItem } from "@/services/ITileItem";
import { TileEle } from "@/services/ITileItem";
import { readonly, reactive, ref } from "vue";

/**
 * initial ActiveState
 */

const initCurrActiveState = "";

/**
 * initial tileTypes
 */
// WIP: Could be generated in useStreets.ts later (if the enum there would be expanded)
const initTiles: TileEle[] = [
  new TileEle("crossing", "src/assets/img/crossing.svg", 0, [
    false,
    false,
    false,
  ]),
  new TileEle("curve", "src/assets/img/curve.svg", 0, [true, true, true]),
  new TileEle("tCrossing", "src/assets/img/tCrossing.svg", 0, [
    true,
    true,
    true,
  ]),
  new TileEle("straight", "src/assets/img/straight.svg", 0, [
    true,
    false,
    false,
  ]),
];

/**
 * Set reactive
 */
const state = reactive({
  allTiles: initTiles,
  currActiveState: initCurrActiveState,
  bulldozerMode: false,
});

export function useTile() {
  /**
   * Find an element of tileTypes by type name
   * @returns found tileType
   */
  function findElementByType(type: string) {
    const ele = state.allTiles.find((element) => element.type == type);
    return ele;
  }

  function changeCurrentTileType(s: string) {
    state.currActiveState = s;
  }

  function toggleBulldozer(b: boolean) {
    state.bulldozerMode = b;
  }

  /**
   * IMPORTANT: Only for Tile-Types. Make sure that type is not "delete"
   * Get the possible rotate values from tile
   * @param {string} type - Type of Tile
   * @returns Array with possibleRotation values
   */
  function getpossibleRotation(type: string) {
    const ele = findElementByType(type);
    return ele?.possibleRotation;
  }

  /**
   * IMPORTANT: Only for Tile-Types. Make sure that type is not "delete"
   * Get the rotate value from tile
   * @param {string} type - Type of Tile
   * @returns rotation value
   */
  function getRotate(type: string) {
    const ele = findElementByType(type);
    console.log(ele?.rotate);
    return ele?.rotate;
  }

  /**
   * Set the rotate value from tile
   * @param {number} degree - new rotate value
   * @param {string} type - Type of Tile
   */
  function setRotate(degree: number, type: string) {
    console.log("DEGREE" + degree + "TYPE" + type);
    const ele = findElementByType(type);
    if (ele) {
      ele.rotate = degree;
    }
    console.log(ele);
  }

  /**
   * Set activeState
   * @param {string} type - Type of Tile or "delete" from Bulldozer
   */

  /**
   * IMPORTANT: Only for Tile-Types. Make sure that type is not "delete"
   * Get the image Source from tile
   * @param {string} type - Type of Tile
   * @returns image Source
   */
  function getImgSrc(type: string) {
    const ele = findElementByType(type);
    return ele?.imgSrc;
  }

  return {
    tile: readonly(state),
    allTiles: state.allTiles,
    changeCurrentTileType,
    toggleBulldozer,
    getpossibleRotation,
    getRotate,
    setRotate,
    getImgSrc,
  };
}
