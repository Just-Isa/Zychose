<!--- 
Die vier Tilearten, geholt aus der getBasicTiles Funktion (als States). 
Geben beim Anklicken den Typ durch, Bild kann per URL / Icon(props) weitergereicht werden
Template ist als Footer angelegt, da das Menü unten liegt. 
-->
<template>
  <footer>

      <div class="tilemenuwrapper">
          <div class="tilemenu">
              <Tile @click="setTileResetBagger(tileTypes[1])" class="cross"></Tile>
              <Tile @click="setTileResetBagger(tileTypes[3])" class="curve"></Tile>
              <Tile @click="setTileResetBagger(tileTypes[2])" class="tcross"></Tile>
              <Tile @click="setTileResetBagger(tileTypes[0])" class="street"></Tile>
          </div>
      </div>

      <a id="baggercursor" @click="setBaggerToDelete()"></a>
      
  </footer>

</template>



<script setup lang="ts">
import { useTile } from '@/services/useTileState';
import { ref } from "vue";
import Tile from './Tile.vue';

const tileTypes = [
  "STREET",
  "CROSS",
  "TCROSS",
  "CURVE"
]


/**
* Basic Tiles werden aus den Interfaces geholt & zugewiesen
*/

const { tile, getTileType, setTileType } = useTile();

/**
* Baggerbutton: Einfacher Toggle, falls TRUE, wird Tiletyp geloggt.
*/

const baggerStatus = ref(false);


function setBaggerToDelete() {
  const baggerStatusId = document.getElementById("baggercursor");

  if (baggerStatus.value == false){
      
      if (baggerStatusId){
          baggerStatusId.style.backgroundColor = "yellow";
          setTileType("DELETE")
      }
     
      baggerStatus.value = !baggerStatus.value;

  } else {
      
      if (baggerStatusId){
          baggerStatusId.style.backgroundColor = "grey";
      }

      baggerStatus.value = !baggerStatus.value;
  }
}

function setTileResetBagger(s: string){
  baggerStatus.value = false;
  const baggerStatusId = document.getElementById("baggercursor");
  
  if (baggerStatusId){
      baggerStatusId.style.backgroundColor = "yellow";
  }

  setTileType(s);
}

function highlightCurrentTile(s: string){
  console.log(s)
}

/**
* Jeweiliger Straßentyp wird geloggt (noch hardgecodet, geht mit durchreichen bestimmt noch eleganter)
*/



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
  background-color: #5B6569;
  border-radius: 25px;
}

.tilemenu {
  padding: 5px;
  display:flex;
}


.baggerhighlight {
  position:relative;
  display: inline-block;
  height: 3em;
  width: 3em;
  padding: 2em;
  margin: 2.5em;
}

#baggercursor {
  background-image: url('./icons/bull-dozer.png');
  background-repeat: no-repeat;
  background-position: center;
  background-color: #FFD941;
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
  background-image: url('./icons/straight-road.png');
  background-repeat: no-repeat;
  background-position: center;
}

.curve {
  background-image: url('./icons/curve-road.png');
  background-size: 80%;
  background-repeat: no-repeat;
  background-position: center;
}

.cross {
  background-image: url('./icons/cross-road.png');
  background-size: 80%;
  background-repeat: no-repeat;
  background-position: center;
}

.tcross {
  background-image: url('./icons/t-cross-road.png');
  background-size: 80%;
  background-repeat: no-repeat;
  background-position: center;
}


</style>
