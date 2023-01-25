<template>
  <main>
    <FadeToWhiteOverlay :isActive="showOverlay" />
    <Exit3DButton @click="changeTo2DView()" />
    <PlayerList />
    <ThreeDGame />
  </main>
</template>

<script setup lang="ts">
import ThreeDGame from "@/views/threeD/ThreeDGame.vue";
import FadeToWhiteOverlay from "@/components/FadeToWhiteOverlay.vue";
import Exit3DButton from "@/components/Exit3DButton.vue";
import PlayerList from "@/components/PlayerList.vue";
import { useRoom } from "@/services/useRoom";
import { ref } from "vue";
import { getSessionIDFromCookie } from "@/helpers/SessionIDHelper";
import { Client } from "@stomp/stompjs";
import { logger } from "@/helpers/Logger";
const { roomState } = useRoom();

const webSocketUrl = `ws://${window.location.host}/stompbroker`;
const stompVehicleClient = new Client({ brokerURL: webSocketUrl });

const publishVehicleStompClientConnection = setInterval(function () {
  if (!stompVehicleClient.connected) {
    stompVehicleClient.activate();
  } else {
    clearTimeout(publishVehicleStompClientConnection);
  }
}, 20);

let showOverlay = ref(false);

window.addEventListener("keyup", (event) => {
  if (event.key === "Escape") {
    changeTo2DView();
  }
});

/**
 * Changes the View to the 2D-View
 */
function changeTo2DView() {

  const DEST = "/topic/vehicle/delete/" + roomState.room.roomNumber;
  const sessionID = getSessionIDFromCookie();

  logger.log("NUTZER: ", sessionID);

  if (!stompVehicleClient.connected) {
    stompVehicleClient.activate();
  }
  stompVehicleClient.onWebSocketError = (event) => {
    logger.error("WS-error", JSON.stringify(event)); /* WS-Error */
    location.href = "/500";
  };
  stompVehicleClient.onStompError = (frame) => {
    logger.error("STOMP-error", JSON.stringify(frame)); /* STOMP-Error */
    location.href = "/500";
  };
  try {
    stompVehicleClient.publish({
      destination: DEST,
      headers: {},
      body: sessionID,
    });
  } catch (err) {
    logger.error("Error while publishing vehicle! ", err);
  }

  console.log("GEWARTET");

  showOverlay.value = true;
  setTimeout(function () {
    location.href = "/" + roomState.room.roomNumber;
  }, 800);
}
</script>
