<template>
  <div id="wrapper">
    <table id="gridTable">
      <tr v-for="row in props.gridSize" v-bind:key="row" class="gridRow">
        <td
          v-for="col in props.gridSize"
          class="gridCell"
          v-bind:key="col"
          v-on:click="cellClicked(row, col)"
        ></td>
      </tr>
    </table>
  </div>
</template>

<script setup lang="ts">
/**
 * @param {number} gridSize defines the size of the grid component
 */
const props = defineProps<{
  gridSize: number;
}>();
// const { streets, handleClick, TypeStreet } = useStreets(); useStreets delivers all information we need about the placed streets
function cellClicked(posX: number, posY: number): void {
  console.log("(posX,posY): ", [posX, posY]);
}

/*
    two EventListeners on the wheel-scrool to prevent the default browser functionalities and
    instead scale the component independently with CSS, so no other ui parts are effected.
*/
let scale = 1;
document.addEventListener("wheel", (event) => {
  event.preventDefault();
  scale += event.deltaY * -0.01;
  scale = Math.min(Math.max(1, scale), 4);
  const element = document.getElementById("wrapper");
  if (element != null) {
    element.style.transformOrigin = "left top 0";
    element.style.transform = `scale(${scale})`;
  }
});

window.addEventListener("wheel", (e) => e.preventDefault(), { passive: false });
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
  border-collapse: separate;
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
