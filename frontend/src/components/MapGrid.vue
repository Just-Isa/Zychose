<template>
  <div
    id="wrapper"
    v-bind:class="
      currentVehicle.type !== ''
        ? `duration-1000 bg-white opacity-70 h-screen`
        : ``
    "
  >
    <table
      id="gridTable"
      class="bg-[#008000] w-full border-spacing-0 border-separate table-fixed"
    >
      <tr
        v-for="row in checkedGridSize"
        v-bind:key="row"
        class="box-border h-20 p-0"
      >
        <td
          v-for="col in checkedGridSize"
          class="box-border w-20 p-0 border border-white/20 hover:border-white hover:shadow-[inset_0_0_4px_1px_#fff] hover:opacity-50 bg-cover bg-no-repeat bg-center"
          v-bind:key="col"
          @dragover.prevent="dragOver(row, col)"
          @dragleave="dragLeave(row, col)"
          @dragenter.prevent
          v-on:drop="onDrop(row, col)"
          v-on:click="cellClicked(row, col)"
          v-on:mouseover="onHover(row, col)"
          v-on:mouseleave="onEndHover(row, col)"
        ></td>
      </tr>
    </table>
  </div>
</template>

<script setup lang="ts">
import { useStreets, type IStreetInformation } from "../services/useStreets";
import swtpConfigJSON from "../../../swtp.config.json";
import { computed, onMounted } from "vue";
import { useVehicle } from "@/services/useVehicle";
import router from "@/router";
import { logger } from "@/helpers/Logger";

/**
 * @param {number} gridSize defines the size of the grid component
 */
const props = defineProps<{
  gridSize: any;
}>();

/**
  //TODO werte für 100 und 20 vllt auch in die config --> können dort aber auch so angepasst werden, dass bullshit drin ist
  * Hardcoded Wert 24, weil 1rem entspricht 16px, also 1920/16 = 120 -> 120/5rem (cell-width) = 24 cells
  //TODO ?min-gridSize dynamisch berechenbar machen/ cell-size in config einstellbar ----- storyless task oder issue?
 */
const checkedGridSize = computed(() => {
  if (isNaN(props.gridSize)) {
    return 100;
  } else {
    if (props.gridSize < 24) {
      return 24;
    } else {
      return props.gridSize;
    }
  }
});

const {
  updateStreetState,
  isStreetPlaced,
  streetsState,
  initializeStreetState,
} = useStreets();
const { currentVehicle } = useVehicle();
const streetTypes = swtpConfigJSON.streetTypes;

onMounted(() => {
  initializeStreetState();
  // Template loads table first, slower connections need extra time -> 700 ms tested to be sufficient
  setTimeout(function () {
    stateToGrid();
  }, 700);
});

//TODO
//Hier wird der Input(strassentyp und rotation), sobald es moeglich ist, aus dem anderen state geholt und zusammen mit den Positionen fuer die Achsen im state fuer die strassen gespeichert
/**
 * cellClicked handles the click event for cells.
 * Data like Typestreet and rotation of the selected Street are passed in through a state.
 * Changes the backgroundImage of the cell. The Cell will be saved in the state.
 * @param {number} posX position on x axis (click)
 * @param {number} posY position on y axis (click)
 */
function cellClicked(posX: number, posY: number): void {
  logger.log("(posX,posY): ", [posX, posY]);
  const table = document.getElementById("gridTable") as HTMLTableElement;
  const cell = table.rows[posX - 1].cells[posY - 1];
  /* testInput has to be hard coded as long as we're not able to get the informations from the states of the streetTileMenu */
  let testInput: IStreetInformation = {
    streetType: "straight-road",
    rotation: 90,
    posX: posX,
    posY: posY,
  };
  setCellBackgroundStyle(cell, testInput);
  updateStreetState(testInput);
}

/**
 * onDrop function for the drag&drop process
 * @param {number} posX position on x axis (click)
 * @param {number} posY position on y axis (click)
 */
function onDrop(posX: number, posY: number) {
  //TODO posX und posY müssen statt geloggt zu werden, ans backend gesendet werden an dieser Stelle
  logger.log("Vehicle-Position: ", posX, posY);
  changeTo3DView();
}

/**
 * Changes the View to the 3D-View
 */
function changeTo3DView() {
  let wrapper = document.getElementById("wrapper");
  if (wrapper != null) {
    wrapper.classList.add(
      "absolute",
      "duration-1000",
      "bg-white",
      "opacity-0",
      "h-screen",
      "w-screen"
    );
  }
  //TODO die 800ms sind gesetzt, weil es sonst keine richtige fade-to-white transition gibt !
  //TODO manchmal wechselt der router die seite nicht! --> außerdem wird ein *[Violation]'requestAnimationFrame' handler took XYZms* Hinweis geworfen --> die Performance der 3D-View ist also nicht so toll!
  setTimeout(function () {
    router.push((location.pathname.split("/")[1] as unknown as number) + "/3d");
  }, 800);
}

/**
 * dragOver function of the drag&drop process
 * @param {number} posX position on the x axis while dragging over the grid
 * @param {number} posY position on the y axis while dragging over the grid
 */
function dragOver(posX: number, posY: number) {
  const table = document.getElementById("gridTable") as HTMLTableElement;
  const cell = table.rows[posX - 1].cells[posY - 1] as HTMLTableCellElement;
  cell.classList.add(
    "shadow-[inset_0_0_4px_1px_rgba(255,255,0,1)]",
    "border-yellow-300"
  );
}

/**
 * dragLeave function of the drag&drop process
 * @param {number} posX position on the x axis while leaving a cell on the grid
 * @param {number} posY position on the y axis while leaving a cell on the grid
 */
function dragLeave(posX: number, posY: number) {
  const table = document.getElementById("gridTable") as HTMLTableElement;
  const cell = table.rows[posX - 1].cells[posY - 1] as HTMLTableCellElement;
  cell.classList.remove(
    "shadow-[inset_0_0_4px_1px_rgba(255,255,0,1)]",
    "border-yellow-300"
  );
}

/**
 * getting the hovered cell and changing the backgroundImage to 50% opaque "new" road.
 * the image is hardcoded right now, but it will change as soon as we get the streets from the state
 * @param {number} x position on x axis (click)
 * @param {number} y position on y axis (click)
 */
function onHover(x: number, y: number): void {
  const table = document.getElementById("gridTable") as HTMLTableElement;
  const cell = table.rows[x - 1].cells[y - 1];
  //TODO sobald man die Informationen ueber streetType und rotation aus dem State lesen kann, muss der code unterhalb angepasst werden
  cell.style.backgroundImage = "url(/assets/img/cross-road.svg)";
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
  const table = document.getElementById("gridTable") as HTMLTableElement;
  const cell = table.rows[x - 1].cells[y - 1];
  if (isStreetPlaced(x, y)) {
    cellClicked(x, y);
  } else {
    cell.style.backgroundImage = "";
  }
}

/* eslint-disable @typescript-eslint/no-unused-vars*/
/**
 * Function to display the streets that are saved in the state.
 */
function stateToGrid(): void {
  const table = document.getElementById("gridTable") as HTMLTableElement;
  for (const street of streetsState.streets) {
    const cell = table.rows[street.posX - 1].cells[street.posY - 1];
    setCellBackgroundStyle(cell, street);
  }
}
/* eslint-enable */

/**
 * Function that sets the style of the given Cell. The given street is needed for information about the streetType and rotation.
 * @param {HTMLTableCellElement} cell cell object which style should be set
 * @param {IStreetInformation} street information about the street
 */
function setCellBackgroundStyle(
  cell: HTMLTableCellElement,
  street: IStreetInformation
): void {
  for (const streetType of streetTypes) {
    if (streetType.name === street.streetType) {
      cell.style.backgroundImage = `url(${streetType.svgPath})`;
      cell.style.transform = `rotate(${street.rotation}deg)`;
    }
  }
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
      element.classList.add("origin-left-top");
      element.style.transform = `scale(${scale})`; // muss direkt über style geändert werden, lösung mit tailwind nicht möglich
    }
  },
  { passive: false }
);
</script>
