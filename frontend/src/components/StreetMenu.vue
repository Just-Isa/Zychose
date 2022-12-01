<!--- 
Menü, in dem alles zu den Straßen angezeigt wird
-->

<template>
    <footer class="container">
        <div class="tabs">
        <a @click="changeTab(1)" v-bind:class="[ activetab === 1 ? 'active' : '' ]" id="tab1">Tab 1</a>
        <a @click="changeTab(2)" v-bind:class="[ activetab === 2 ? 'active' : '' ]" id="tab2">Tab 2</a>
        <a @click="changeTab(3)" v-bind:class="[ activetab === 3 ? 'active' : '' ]" id="tab3">Tab 3</a>
    </div>

    <div class="content">
        <div v-if="activetab === 1" class="tabcontent">
            <StreetTileMenu></StreetTileMenu>
        </div>
        <div v-if="activetab === 2" class="tabcontent">
            <StreetTileMenu></StreetTileMenu>
        </div>
        <div v-if="activetab === 3" class="tabcontent">
            <p>
               Content for tab three 
            </p>
            
        </div>
    </div>
    </footer>
    
</template>

<script setup lang="ts">
import StreetTileMenu from './StreetTileMenu.vue';


    let activetab = 1;

    function changeTab(x:number){
        console.log("altes Tab: "+ activetab);

        // delete class on old tab
        let oldTab = document.getElementById("tab"+activetab);
        if (oldTab != null){
            oldTab.classList.remove("active");
        }

        activetab = x;

        // set class on new tab
        let newTab = document.getElementById("tab"+activetab);
        if (newTab != null){
            newTab.classList.add("active");
        }

        console.log("neues Tab:" + activetab);
        
        
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
.tabs {
    overflow: hidden;
  margin-left: 20px;
    margin-bottom: -2px; /*hide bottom border*/
}

.tabs ul {
    list-style-type: none;
    margin-left: 20px;
}

.tabs a{
    z-index: -10;
    float: left;
    cursor: pointer;
    padding: 5px 5px;
    transition: background-color 0.2s;
    /*border: 1px solid #ccc;*/
    border-right: none;
    background-color: #5b6569;
    border-radius: 10px 10px 0 0;
    font-weight: bold;
}
.tabs a:last-child { 
    border-right: 1px solid #ccc;
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
  box-shadow: 3px 3px 6px #e1e1e1
}

</style>