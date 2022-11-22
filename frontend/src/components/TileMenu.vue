<!--- 
Die vier Tilearten, geholt aus der getBasicTiles Funktion (als States). 
Geben beim Anklicken den Typ durch, Bild kann per URL / Icon(props) weitergereicht werden
Template ist als Footer angelegt, da das Menü unten liegt. 
-->
<template>
  <footer>
    <div class="tilemenuwrapper">
      <div class="highlightwrapper">
        <a href="#" class="highlight"></a>
        <a href="#" class="highlight"></a>
        <a href="#" class="highlight"></a>
        <a href="#" class="highlight"></a>
      </div>

      <div class="tilemenu">
        <Tile @click="setStreetType()" class="street" :tile="streetTile"></Tile>
        <Tile @click="setCrossType()" class="cross" :tile="crossTile"></Tile>
        <Tile @click="setCurveType()" class="curve" :tile="curveTile"></Tile>
        <Tile @click="setTCrossType()" class="tcross" :tile="tcrossTile"></Tile>
      </div>
    </div>

    <button id="baggercursor" @click="toggle()"></button>
  </footer>
</template>

<script setup lang="ts">
import { getBasicTiles } from "@/services/useTileList";
import { ref } from "vue";

/**
import t-cross from './icons/t-cross-road.png';
import curve from './icons/curve-road.png';
import cross from './icons/cross-road.png';

 */

/**
 * Basic Tiles werden aus den Interfaces geholt & zugewiesen
 */
const { tiles } = getBasicTiles();

const streetTile = tiles.value[0];
const crossTile = tiles.value[1];
const curveTile = tiles.value[2];
const tcrossTile = tiles.value[3];

/**
 * Baggerbutton: Einfacher Toggle, falls TRUE, wird Tiletyp geloggt.
 */

const baggerStatus = ref(false);

function toggle() {
  baggerStatus.value = !baggerStatus.value;
  console.log("TOGGLE " + baggerStatus.value);
}

/**
 * Jeweiliger Straßentyp wird geloggt (noch hardgecodet, geht mit durchreichen bestimmt noch eleganter)
 */

let currentType = ref("");

function setStreetType() {
  if (baggerStatus.value == true) {
    currentType.value = streetTile.name;
    console.log("CURRENT TYPE: " + currentType.value);
  }
}

function setCrossType() {
  if (baggerStatus.value == true) {
    currentType.value = crossTile.name;
    console.log("CURRENT TYPE: " + currentType.value);
  }
}

function setTCrossType() {
  if (baggerStatus.value == true) {
    currentType.value = tcrossTile.name;
    console.log("CURRENT TYPE: " + currentType.value);
  }
}

function setCurveType() {
  if (baggerStatus.value == true) {
    currentType.value = curveTile.name;
    console.log("CURRENT TYPE: " + currentType.value);
  }
}
</script>

<style scoped>
/**
CSS: Elemente mit Flex in der Mitte, Bilder erstmal mit URL drinne. Größte sollte universal sein
*/

footer {
  position: absolute;
  left: 30vw;
  bottom: 0;
  overflow: hidden;
  display: flex;
  justify-content: center;
}

.tilemenu {
  padding: 5px;
  display: flex;
}

.highlightwrapper {
  padding: 5px;
  border-radius: 25px;
  background-color: #5b6569;
  position: absolute;
}

.highlight {
  height: 6.1em;
  width: 6.1em;
  padding: 2em;
  margin: 1em;
  display: inline-block;
  position: relative;
  border-radius: 10px;
  background-color: white;
}
.highlight:hover {
  background-color: #95e8ff;
  z-index: 50;
}

.baggerhighlight {
  position: relative;
  display: inline-block;
  height: 3em;
  width: 3em;
  padding: 2em;
  margin: 2.5em;
}

#baggercursor {
  background-image: url("../assets/img/bull-dozer.png");
  background-repeat: no-repeat;
  background-position: center;
  background-color: #ffd941;
  height: 3em;
  width: 3em;
  padding: 2em;
  margin: 2.5em;
  border-radius: 2.5em;
}

#baggercursor:active {
  background-color: white;
}

.street {
  background-image: url("../assets/img/straight-road.png");
  background-repeat: no-repeat;
  background-position: center;
}

.curve {
  background-image: url("../assets/img/curve-road.png");
  background-size: 80%;
  background-repeat: no-repeat;
  background-position: center;
}

.cross {
  background-image: url("../assets/img/cross-road.png");
  background-size: 80%;
  background-repeat: no-repeat;
  background-position: center;
}

.tcross {
  background-image: url("../assets/img/t-cross-road.png");
  background-size: 80%;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
