<!--- 
Die vier Tilearten, geholt aus der getBasicTiles Funktion (als States). 
Geben beim Anklicken den Typ durch, Bild kann per URL / Icon(props) weitergereicht werden
Template ist als Footer angelegt, da das Menü unten liegt. 
-->
<template>
  <div class="tilemenuwrapper">
    <div class="tilemenu">
      <StreetTile
        @click="setTileResetBagger(tileTypes[1])"
        id="cross-road"
      ></StreetTile>
      <StreetTile
        @click="setTileResetBagger(tileTypes[3])"
        id="curve-road"
      ></StreetTile>
      <StreetTile
        @click="setTileResetBagger(tileTypes[2])"
        id="t-cross-road"
      ></StreetTile>
      <StreetTile
        @click="setTileResetBagger(tileTypes[0])"
        id="street-road"
      ></StreetTile>
    </div>
  </div>

  <a id="baggercursor" @click="setBaggerToDelete()"></a>
</template>

<script setup lang="ts">
import { useTile } from "@/services/useTileState";
import { ref } from "vue";
import StreetTile from "./StreetTile.vue";

const tileTypes = ["street-road", "cross-road", "t-cross-road", "curve-road"];

/**
 * Basic Tiles werden aus den Interfaces geholt & zugewiesen
 */

const { getTileType, setTileType, getActive, setActive } = useTile();

/**
 * Baggerbutton: Einfacher Toggle, falls TRUE, wird Tiletyp geloggt.
 */

const baggerStatus = ref(true);

function setBaggerToDelete() {
  const baggerStatusId = document.getElementById("baggercursor");

  if (baggerStatus.value == false) {
    if (baggerStatusId) {
      baggerStatusId.style.backgroundColor = "yellow";
      setTileType("DELETE");
    }

    baggerStatus.value = !baggerStatus.value;
  } else {
    if (baggerStatusId) {
      baggerStatusId.style.backgroundColor = "white";
    }

    baggerStatus.value = !baggerStatus.value;
  }
}

function setTileResetBagger(s: string) {
  const previousTile = document.getElementById(getTileType());

  if (getTileType() != s && previousTile) {
    previousTile.style.backgroundColor = "#E4F9FF";
    setActive(false);
  }

  baggerStatus.value = false;

  const baggerStatusId = document.getElementById("baggercursor");
  const currentTile = document.getElementById(s);

  if (baggerStatusId) {
    baggerStatusId.style.backgroundColor = "yellow";
  }

  setTileType(s);
  console.log(currentTile);

  if (!getActive()) {
    if (currentTile) {
      currentTile.style.backgroundColor = "#95E8FF";
    }

    setActive(true);
  } else {
    if (currentTile) {
      currentTile.style.backgroundColor = "#E4F9FF";
    }

    setActive(false);
  }

  const dies = document.documentElement;
  dies.style.cursor = "url('../assets/img/bull-dozer.png'), auto";
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

.tilemenuwrapper {
  background-color: #5b6569;
  border-radius: 0 1em 1em 1em;
  height: 7.6em;
}

.tilemenu {
  padding: 5px;
  display: flex;
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
  height: 5em;
  width: 5em;
  margin-left: 2em;
  margin-top: 1.5em;
  border-radius: 2.5em;
}

#street-road {
  background-image: url("../assets/img/straight-road.png");
  background-repeat: no-repeat;
  background-position: center;
}

#curve-road {
  background-image: url("../assets/img/curve-road.png");
  background-size: 80%;
  background-repeat: no-repeat;
  background-position: center;
}

#cross-road {
  background-image: url("../assets/img/cross-road.png");
  background-size: 80%;
  background-repeat: no-repeat;
  background-position: center;
}

#t-cross-road {
  background-image: url("../assets/img/t-cross-road.png");
  background-size: 80%;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
