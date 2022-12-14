<template>
  <div id="wrapper">
    <table id="gridTable" class="border-separate">
      <tr v-for="row in props.gridSize" v-bind:key="row" class="gridRow">
        <td
          v-for="col in props.gridSize"
          class="gridCell"
          v-bind:key="col"
          v-on:click="cellClicked(row, col)"
          v-on:dblclick="clearCell(row, col)"
          v-on:mouseover="onHover(row, col)"
          v-on:mouseleave="onEndHover(row, col)"
        ></td>
      </tr>
    </table>
  </div>
</template>

<script setup lang="ts">
import { useStreets, type IStreetInformation } from "../services/useStreets";
import swtpConfigJSON from "../jsons/swtp.config.json";

/**
 * @param {number} gridSize defines the size of the grid component
 */
const props = defineProps<{
  gridSize: number;
}>();
const { handleClick, isStreetPlaced } = useStreets();
const streetTypes = swtpConfigJSON.streetTypes;
//TODO
//Sobald der Input von Malte, Lara und Antonia eingelesen werden kann, wird diese Methode angepasst.
//Hier wird der Input(strassentyp und rotation) aus dem anderen state geholt und zusammen mit den Positionen fuer die Achsen im state fuer den grid gespeichert.
/**
 * cellClicked handles the click event for cells.
 * Data like Typestreet and rotation of the selected Street are passed in through a state.
 * Changes the backgroundImage of the cell. The Cell will be saved in the state.
 * @param {number} posX position on x axis (click)
 * @param {number} posY position on y axis (click)
 */
function cellClicked(posX: number, posY: number): void {
  console.log("(posX,posY): ", [posX, posY]);
  const tabelle = document.getElementById("gridTable") as HTMLTableElement;
  const cell = tabelle.rows[posX - 1].cells[posY - 1];
  /* testInput has to be hard coded as long as we're not able to get the informations from the states of the streetTileMenu */
  let testInput: IStreetInformation = {
    streetType: "straight-road",
    rotation: 90,
    posX: posX,
    posY: posY,
  };
  setCellStyle(cell, testInput);
  handleClick(testInput);
}

/**
 * getting the hovered cell and changing the backgroundImage to 50% opaque "new" road.
 * the image is hardcoded right now, but it will change as soon as we get the streets from the state
 * @param {number} x position on x axis (click)
 * @param {number} y position on y axis (click)
 */
function onHover(x: number, y: number): void {
  const tabelle = document.getElementById("gridTable") as HTMLTableElement;
  const cell = tabelle.rows[x - 1].cells[y - 1];
  cell.style.backgroundImage = "url(/src/assets/cross-road.svg)";
  cell.style.opacity = "0.5";
}

/**
 * when the mouse exits the previously hovered cell, we check, if a street was placed.
 * if yes: call cellClicked, which changes the backgroundImage to the right streetType
 * if no: reset the backgroundImage to nothing
 * either way the opacity gets resetted to default (=1)
 * @param {number} x position on x axis (click)
 * @param {number} y position on y axis (click)
 */
function onEndHover(x: number, y: number): void {
  const tabelle = document.getElementById("gridTable") as HTMLTableElement;
  const cell = tabelle.rows[x - 1].cells[y - 1];
  if (isStreetPlaced(x, y)) {
    cellClicked(x, y);
  } else {
    cell.style.backgroundImage = "";
  }
  cell.style.opacity = "1";
}

/**
 * //TODO
 * Function to display the streets that are saved in the state.
 */
/*
 function stateToGrid():void{
  const tabelle = document.getElementById("gridTable") as HTMLTableElement;
  for(const street of streets){
    const cell = tabelle.rows[street.posX - 1].cells[street.posY - 1];
    setCellStyle(cell, street);
  }
}*/

/**
 * Function that sets the style of the given Cell. The given street is needed for information about the streetType and rotation.
 * @param {HTMLTableCellElement} cell cell object which style should be set
 * @param {IStreetInformation} street information about the street
 */
function setCellStyle(
  cell: HTMLTableCellElement,
  street: IStreetInformation
): void {
  cell.style.backgroundSize = "cover";
  cell.style.backgroundRepeat = "no-repeat";
  cell.style.backgroundPosition = "center";
  for (const streetType of streetTypes) {
    if (streetType.name === street.streetType) {
      cell.style.backgroundImage = streetType.svgPath;
      cell.style.transform = `rotate(${street.rotation}deg)`;
    }
  }
}

/**
 * //TODO
 * Sobald der Input von Malte, Lara und Antonia eingelesen werden kann, wird diese Methode nicht mehr gebraucht.
 * Diese Methode ist nur zum testen gedacht, um zu sehen, ob Strassen richtig aus dem state geloescht werden.
 * Sie wird entfernt, sobald der Strassentyp und die Rotation ueber einen weiteren State ausgelesen werden koennen.
 * Dann wird das loeschen der Zelle ueber die cellClicked Methode gemacht.
 */
function clearCell(posX: number, posY: number): void {
  console.log("clearCell aufgerufen!");
  let neuerInput: IStreetInformation = {
    streetType: "delete",
    rotation: 90,
    posX: posX,
    posY: posY,
  };
  const tabelle = document.getElementById("gridTable") as HTMLTableElement;
  handleClick(neuerInput);
  const cell = tabelle.rows[posX - 1].cells[posY - 1];
  cell.style.backgroundImage = "";
  cell.style.backgroundSize = "cover";
  cell.style.backgroundRepeat = "no-repeat";
}
/*
    two EventListeners on the wheel-scrool to prevent the default browser functionalities and
    instead scale the component independently with CSS, so no other ui parts are effected.
*/
let scale = 1;
document.addEventListener(
  "wheel",
  (event) => {
    event.preventDefault();
    scale += event.deltaY * -0.01;
    scale = Math.min(Math.max(1, scale), 4);
    const element = document.getElementById("wrapper");
    if (element != null) {
      element.style.transformOrigin = "left top 0";
      element.style.transform = `scale(${scale})`;
    }
  },
  { passive: false }
);
</script>

<style>
body {
  padding: 0;
  margin: 0;
  scrollbar-width: none;
}
html {
  -ms-overflow-style: none; /* for Internet Explorer, Edge */
  scrollbar-width: none; /* for Firefox */
  overflow: scroll;
}
html::-webkit-scrollbar {
  display: none; /* for Chrome, Safari, and Opera */
}
.wrapper {
  width: 100%;
}
table {
  border-spacing: 0;
  table-layout: fixed;
  width: 100%;
  background-color: green;
}
.gridRow {
  height: 5em;
  border: 1px solid black;
  padding: 0;
  box-sizing: border-box;
}
.gridCell {
  width: 5em;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0;
  box-sizing: border-box;
  /*
        --- maybe useful for tile-types later ---
        background-image: url("../../assets/grass.png");
        background-size: cover;
        background-repeat: no-repeat;*/
}
.gridCell:hover {
  border-color: rgba(255, 255, 255, 1);
  box-shadow: inset 0px 0px 4px 1px #fff;
}
</style>
