<!--- 
Menu for selecting street tiles according to selected vehicle.
Source for basic tab idea: https://vuejsexamples.com/tabbed-content-with-vue-js/
-->

<template>
  <footer>
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

/**
 * activetab: numeration of tabs from left to right
 */
const activetab = ref(1);

/**
 * function to change the selected tab and switch the displayed content for the tile menu
 * @param newTabNumber number of the newly selected tab
 */
function changeTab(newTabNumber: number) {
  console.log("altes Tab: " + activetab.value);

  // delete class on old tab
  let oldTab = document.getElementById("tab" + activetab.value);
  if (oldTab != null) {
    oldTab.classList.remove("active");
  }

  activetab.value = newTabNumber;

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

/* footer style taken over from StreetTileMenu.vue */
footer {
  position: absolute;
  left: 30vw;
  bottom: 0;
  overflow: hidden;
  justify-content: center;
}

/* Style the tabs */
.tabHead {
  height: 1.125rem;
  width: 3.125rem;
}

.tabs {
  overflow: hidden;
}

.tabs a {
  float: left;
  cursor: pointer;
  padding: 5px 5px;
  transition: background-color 0.2s;
  border-right: none;
  background-color: #424a4c;
  border-radius: 10px 10px 0 0;
  font-weight: bold;
  margin-right: 0.7rem;
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
  cursor: default;
}

/* Style the tab content */
.tabcontent {
  border-radius: 0.625rem;
  display: flex;
}

/* svg-files for tabs corresponding with ids */
#car {
  background-image: url("../assets/img/car-pictogram.svg");
  background-repeat: no-repeat;
  background-position: center;
}

#bicycle {
  background-image: url("../assets/img/bicycle-pictogram.svg");
  background-size: 32%;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
