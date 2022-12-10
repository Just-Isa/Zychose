<template>
  <main>
    <a class="exitToRoomList" v-on:click="hoden()" :href="'#'">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        width="50"
        height="50"
        viewBox="0 0 50 50"
      >
        <defs>
          <filter
            id="Ellipse_7"
            x="0"
            y="0"
            width="50"
            height="50"
            filterUnits="userSpaceOnUse"
          >
            <feOffset dy="3" input="SourceAlpha" />
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feFlood flood-opacity="0.161" />
            <feComposite operator="in" in2="blur" />
            <feComposite in="SourceGraphic" />
          </filter>
        </defs>
        <g id="ChatButton" transform="translate(-4.246 -986.246)">
          <g
            transform="matrix(1, 0, 0, 1, 4.25, 986.25)"
            filter="url(#Ellipse_7)"
          >
            <circle
              id="Ellipse_7-2"
              data-name="Ellipse 7"
              cx="16"
              cy="16"
              r="16"
              transform="translate(9 6)"
              fill="#424a4c"
            />
          </g>
          <path
            id="Icon_metro-exit"
            data-name="Icon metro-exit"
            d="M16.016,13.132V10.891h-5.6V8.65h5.6V6.41l3.361,3.361Zm-1.12-1.12v4.482h-5.6v3.361L2.571,16.493V1.928H14.9v5.6h-1.12V3.048H4.812L9.293,5.289V15.373h4.482V12.012Z"
            transform="translate(19.552 997.995)"
            fill="#fff"
          />
        </g>
      </svg>
    </a>
  </main>
</template>

<script setup lang="ts">
import { useRoom } from "@/services/useRoom";

const { removeUserFromRoom } = useRoom();

function hoden() {
  location.href = "/rooms";
  removeUserFromRoom();
}
</script>

<style>
.exitToRoomList {
  margin-left: 20px;
  margin-top: 20px;
  position: fixed;
  z-index: 999;
}
</style>
