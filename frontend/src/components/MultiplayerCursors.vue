<template>
  <svg
    v-for="(item, key, index) in mouseDict"
    v-bind:style="{
      transform: `translateX(${item[0]}px) translateY(${item[1]}px)`,
    }"
    class="cursor"
    v-bind:fill="colors[index]"
    v-bind:key="key"
  >
    <path
      d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
    />
  </svg>
</template>

<script setup lang="ts">
import { Mouse } from "@/services/IMouse";
import { User } from "@/services/IUser";
import { useRoom } from "@/services/useRoom";
import { useUser } from "@/services/useUser";
import { onMounted, reactive, ref } from "vue";

// https://vueuse.org/core/usemouse/
import { MessageOperator } from "@/services/MessageOperators";
import { useMouse } from "@vueuse/core";

const colors = ref([
  "#A9E5BB",
  "#FCF6B1",
  "#F72C25",
  "#F4989C",
  "#DAC4F7",
  "#A9E5BB",
  "#FCF6B1",
  "#F72C25",
  "#F4989C",
  "#DAC4F7",
  "#A9E5BB",
  "#FCF6B1",
  "#F72C25",
  "#F4989C",
  "#DAC4F7",
]);

const { x, y } = useMouse({ touch: false });
let lastXsent = 0;
let lastYsent = 0;

//const mouseMap = reactive(new Map<string, number[]>());
let mouseDict: { [sessionID: string]: number[] } = reactive({});

const { roomState, receiveRoom } = useRoom();
const { publishMouse, mouseState, receiveMouse } = useUser();
const { publishUser } = useUser();

onMounted(() => {
  receiveRoom();
  receiveMouse();
  createUser();
});

function createUser() {
  if (document.cookie.split("=")[0] != "sid") {
    document.cookie = "sid=" + crypto.randomUUID();
    const user = new User(
      document.cookie.split("=")[1],
      1,
      document.cookie.split("=")[1]
    );
    publishUser(MessageOperator.CREATE, user);
  }
}

setInterval(function () {
  if (
    Math.abs(lastXsent - x.value) > 10 ||
    Math.abs(lastYsent - y.value) > 10
  ) {
    lastXsent = x.value;
    lastYsent = y.value;
    publishMouse(
      new Mouse(
        document.cookie.split("=")[1],
        roomState.room.roomNumber,
        x.value,
        y.value
      )
    );
  }
  //mouseMap.set(mouseState.mouse.sessionID, [x.value, y.value]);
  if (
    mouseState.mouse.sessionID != "" &&
    mouseState.mouse.sessionID != null &&
    mouseState.mouse.sessionID != document.cookie.split("=")[1]
  ) {
    mouseDict[mouseState.mouse.sessionID] = [
      mouseState.mouse.x,
      mouseState.mouse.y,
    ];
  }
}, 300);
</script>

<style>
.cursor {
  position: absolute;
  transition: transform 120ms linear;
  top: 0;
  left: 0;
}
</style>
