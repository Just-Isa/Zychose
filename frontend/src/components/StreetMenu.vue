<!--- 
Menü, in dem alles zu den Straßen angezeigt wird
-->

<template>
  <footer class="container">
    <div class="tabs">
      <a
        class="tabHead"
        @click="changeTab(1)"
        v-bind:class="[activetab === 1 ? 'active' : '']"
        id="car"
      ></a>
      <a
        class="tabHead"
        @click="changeTab(2)"
        v-bind:class="[activetab === 2 ? 'active' : '']"
        id="bicycle"
      ></a>
    </div>

    <div class="content">
      <div v-if="activetab === 1" class="tabcontent">
        <StreetTileMenu></StreetTileMenu>
      </div>
      <div v-if="activetab === 2" class="tabcontent">
        <StreetTileMenu></StreetTileMenu>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref } from "vue";
import StreetTileMenu from "./StreetTileMenu.vue";

let activetab = ref(1);

function changeTab(x: number) {
  console.log("altes Tab: " + activetab.value);

  // delete class on old tab
  let oldTab = document.getElementById("tab" + activetab.value);
  if (oldTab != null) {
    oldTab.classList.remove("active");
  }

  activetab.value = x;

  // set class on new tab
  let newTab = document.getElementById("tab" + activetab.value);
  if (newTab != null) {
    newTab.classList.add("active");
  }

  console.log("neues Tab:" + activetab.value);
}
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

footer {
  position: absolute;
  left: 30vw;
  bottom: 0;
  overflow: hidden;
  /*display: flex;*/
  justify-content: center;
}

.container {
  max-width: 620px;
  min-width: 420px;
  margin: 40px auto;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.9em;
  color: #888;
}

/* Style the tabs */
.tabHead {
  height: 2em;
  width: 3em;
}

.tabs {
  overflow: hidden;
}

.tabs ul {
  list-style-type: none;
  margin-left: 20px;
}

.tabs a {
  float: left;
  cursor: pointer;
  padding: 5px 5px;
  transition: background-color 0.2s;
  /*border: 1px solid #ccc;*/
  border-right: none;
  background-color: #424a4c;
  border-radius: 10px 10px 0 0;
  font-weight: bold;
  margin-right: 1em;
}

/* Change background color of tabs on hover */
.tabs a:hover {
  background-color: #aaa;
  color: #fff;
}

/* Styling for active tab */
.tabs a.active {
  background-color: #5b6569;
  color: #fff;
  /*border-bottom: 2px solid #fff;*/
  cursor: default;
}

/* Style the tab content */
.tabcontent {
  /*padding: 30px;
    border: 1px solid #ccc; */
  border-radius: 10px;
  background-color: aqua;
  height: auto;
  /*box-shadow: 3px 3px 6px #e1e1e1;*/
}

#car {
  background-image: url("../assets/img/car-pictogram.svg");
  background-repeat: no-repeat;
  background-position: center;
}

#bicycle {
  background-image: url("../assets/img/bicycle-pictogram.svg");
  background-repeat: no-repeat;
  background-position: center;
}
</style>
