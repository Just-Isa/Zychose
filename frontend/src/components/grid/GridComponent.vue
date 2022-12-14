<template>
  <div id="wrapper">
    <table
      id="gridTable"
      class="bg-grid-bg w-full border-spacing-0 border-separate table-fixed"
    >
      <tr
        v-for="row in props.gridSize"
        v-bind:key="row"
        class="gridRow box-border h-20 p-0"
      >
        <td
          v-for="col in props.gridSize"
          class="gridCell box-border w-20 p-0 border border-white/20 hover:border-white hover:shadow-inner hover:shadow-white"
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
