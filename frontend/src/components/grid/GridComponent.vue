<template>
  <div class="wrapper" id="wrapper">
    <table id="gridTable">
      <tr v-for="i in props.gridSize" v-bind:key="i" class="gridRow">
        <td
          v-for="j in props.gridSize"
          class="gridCell"
          v-bind:key="j"
          v-on:click="logCoordinates(i, j)"
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
function logCoordinates(posX: number, posY: number): void {
  console.log("(posX,posY): ", [posX, posY]);
  // TODO implement logic to handleClick
  /*
    handleClick(INPUT)

    sobald alle UI-Komponenten fertig sind und gemerged werden, wird der Input aus der Tile-Komponente entgegengenommen
    und dann wird dieser Input in handleClick gesteckt und dort ausgewertet.
    Der Input fuer handleClick besteht aus der Information über die gewuenschste Strasse, sowie die Rotation.
    Alles weitere regelt die handleClick function. Damit werden alle Strassen in einem State gespeichert und koennen dort
    easy eingesehn werden und später dann auch in eine JSON geschrieben werden.
  */
}

/*
    two EventListeners on the wheel-scrool to prevent the default browser-zoom functionality and
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
