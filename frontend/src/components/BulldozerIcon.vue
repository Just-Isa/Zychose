<template>
  <div
    @click="changeActiveState()"
    class="shadow-lg border-4 rounded-full ml-4 hover:cursor-pointer bg-bulldozer-yellow h-16 w-16 mt-2"
    :class="
      getActiveState() == type
        ? 'active border-white'
        : 'inactive border-bulldozer-gray'
    "
  >
    <svg
      id="bulldozer"
      width="65%"
      height="65%"
      viewBox="-40 -30 126 95"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      xml:space="preserve"
      xmlns:serif="http://www.serif.com/"
      style="
        fill-rule: evenodd;
        clip-rule: evenodd;
        stroke-linejoin: round;
        stroke-miterlimit: 2;
        overflow: visible;
      "
    >
      <g transform="matrix(4.16667,0,0,4.16667,0,0)">
        <g transform="matrix(1,0,0,1,-144.915,1441.44)">
          <path
            id="bull"
            d="M147.559,-1441.39C147.139,-1441.28 146.787,-1440.99 146.595,-1440.6L146.411,-1440.23L146.411,-1432.4L146.111,-1432.32C145.718,-1432.24 145.373,-1432.01 145.154,-1431.67L144.954,-1431.37L144.912,-1426.37L145.096,-1426.37C145.231,-1426.37 145.396,-1426.49 145.696,-1426.82C145.923,-1427.06 146.183,-1427.28 146.469,-1427.45C147.206,-1427.86 147.178,-1427.86 154.707,-1427.86C159.407,-1427.86 161.754,-1427.83 162.045,-1427.78C162.315,-1427.72 162.578,-1427.64 162.832,-1427.53C163.286,-1427.3 163.68,-1426.96 163.981,-1426.55L164.081,-1426.37L166.137,-1426.37L166.094,-1428.78C166.145,-1429.67 166.093,-1430.57 165.938,-1431.45C165.803,-1431.78 165.55,-1432.05 165.229,-1432.2C164.967,-1432.35 164.829,-1432.36 163.229,-1432.38L161.506,-1432.4L161.506,-1434.07C161.561,-1434.71 161.526,-1435.36 161.4,-1435.99C161.158,-1436.54 160.614,-1436.89 160.018,-1436.89C159.421,-1436.89 158.877,-1436.54 158.635,-1435.99C158.509,-1435.36 158.473,-1434.7 158.529,-1434.06L158.529,-1432.39L155.48,-1432.39L155.48,-1440.25L155.28,-1440.62C155.164,-1440.87 154.973,-1441.08 154.734,-1441.22L154.394,-1441.44L151.094,-1441.45C149.282,-1441.45 147.687,-1441.43 147.559,-1441.39ZM152.437,-1438.41L152.437,-1430.83L149.459,-1430.83L149.459,-1438.41L152.437,-1438.41Z"
            style="fill: rgb(75, 83, 87); fill-rule: nonzero"
          />
        </g>
        <g transform="matrix(1,0,0,1,-1203.51,946.311)">
          <path
            id="bull2"
            d="M1226.2,-935.697L1226.2,-923.644L1233.72,-923.644L1233.7,-924.403L1233.68,-925.154L1231.44,-925.905L1229.2,-926.65L1228.47,-931.01C1228.07,-933.41 1227.73,-935.448 1227.71,-935.541C1227.67,-935.69 1227.64,-935.697 1226.94,-935.697L1226.2,-935.697Z"
            style="fill: rgb(75, 83, 87); fill-rule: nonzero"
          />
        </g>
        <g transform="matrix(1,0,0,1,-146.899,665.47)">
          <path
            id="bull3"
            d="M149.1,-648.716C148.257,-648.475 147.557,-647.883 147.179,-647.092C146.964,-646.704 146.879,-646.256 146.938,-645.816C146.882,-645.384 146.961,-644.946 147.165,-644.561C147.454,-643.919 147.963,-643.401 148.6,-643.1L149.132,-642.838L164.311,-642.838L164.811,-643.079C165.861,-643.57 166.535,-644.629 166.535,-645.788C166.535,-646.566 166.232,-647.314 165.69,-647.872C165.299,-648.286 164.801,-648.583 164.251,-648.73C163.688,-648.879 149.664,-648.865 149.1,-648.716Z"
            style="fill: rgb(75, 83, 87); fill-rule: nonzero"
          />
        </g>
      </g>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { useTile } from "@/services/useTileState";

const { setActiveState, getActiveState } = useTile();

const props = defineProps<{
  cursorSrc: string;
}>();

const type = "delete";

/**
 * change activeState
 */
function changeActiveState() {
  const entireDoc = document.documentElement;

  if (entireDoc) {
    if (getActiveState() == type) {
      setActiveState("");
      entireDoc.style.cursor = "default";
      const fillSvg = document.getElementById("bull");
      const fillSvg2 = document.getElementById("bull2");
      const fillSvg3 = document.getElementById("bull3");
      if (fillSvg && fillSvg2 && fillSvg3) {
        fillSvg.style.fill = "#4B5357";
        fillSvg2.style.fill = "#4B5357";
        fillSvg3.style.fill = "#4B5357";
      }
    } else {
      setActiveState(type);

      const fillSvg = document.getElementById("bull");
      const fillSvg2 = document.getElementById("bull2");
      const fillSvg3 = document.getElementById("bull3");
      if (fillSvg && fillSvg2 && fillSvg3) {
        fillSvg.style.fill = "white";
        fillSvg2.style.fill = "white";
        fillSvg3.style.fill = "white";
      }

      entireDoc.style.cursor = 'v-bind(url("props.cursorSrc")) 25 25, auto';
    }
  }
}
</script>
