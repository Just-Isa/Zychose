<!--- 
Menu for selecting street tiles according to selected vehicle.
Source for basic tab idea: https://vuejsexamples.com/tabbed-content-with-vue-js/
-->
<template>
  <footer class="justify-center fixed">
    <div class="tabs overflow-hidden">
      <a
        class="tabHead bg-center bg-no-repeat"
        @click="changeTab(1)"
        v-bind:class="[activetab === 1 ? 'active' : '']"
        id="car"
      ></a>
      <a
        class="tabHead bg-center bg-no-repeat"
        @click="changeTab(2)"
        v-bind:class="[activetab === 2 ? 'active' : '']"
        id="bicycle"
      ></a>
    </div>
    <div class="content">
      <div v-if="activetab === 1" class="tabcontent flex rounded-lg">
        <StreetTileMenu></StreetTileMenu>
      </div>
      <div v-if="activetab === 2" class="tabcontent flex rounded-lg"></div>
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
footer {
  bottom: 7.8rem;
}

/* Style the tabs */
.tabHead {
  height: 1.125rem;
  width: 3.125rem;
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
  margin-bottom: 0.2rem;
}

/* Styling for active tab */
.tabs a.active {
  background-color: #5b6569; /* Tallwind Configuration nötig für custom-Farbvariable */
  color: #fff;
  cursor: default;
}

/* svg-files for tabs corresponding with ids */
#car {
  background-image: url("../assets/img/car-pictogram.svg");
}

#bicycle {
  background-image: url("../assets/img/bicycle-pictogram.svg");
  background-size: 32%;
}
</style>
