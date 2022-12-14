import type { ITileItem } from "@/services/ITileItem";
import { TileEle } from "@/services/ITileItem";
import { readonly, reactive, ref } from "vue";

/**
 * tiles are created and exported in interface
 */
const state = ref<ITileItem>({
  type: "",
  imgSrc: "",
  rotate: 0,
  possibleRotation: [true, true, true],
});

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
 * initial ActiveState
 */
const initcurrActiveState = "";

/**
 * Set reactive
 */
const rea = reactive({
  allTiles: initTiles,
  currActiveState: initcurrActiveState,
});

export function useTile() {
  function getTileType() {
    return state.value.type;
  }

  function setTileType(s: string) {
    state.value.type = s;
  }

  /**
   * Find an element of tileTypes by type name
   * @returns found tileType
   */
  function findElementByType(type: string) {
    const ele = rea.allTiles.find((element) => element.type == type);
    return ele;
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
   * Get the current activeState
   * @returns current activeState (Type of tile or "delete" from Bulldozer)
   */
  function getActiveState() {
    return rea.currActiveState;
  }

  /**
   * Set activeState
   * @param {string} type - Type of Tile or "delete" from Bulldozer
   */
  function setActiveState(type: string) {
    rea.currActiveState = type;
  }

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
    allTiles: rea.allTiles,
    getTileType,
    setTileType,
    getpossibleRotation,
    getRotate,
    setRotate,
    getActiveState,
    setActiveState,
    getImgSrc,
  };
}
