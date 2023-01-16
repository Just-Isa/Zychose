import type { Direction } from "@/services/keyInputHandler";
import { Client } from "@stomp/stompjs";

const webSocketUrl = `ws://${window.location.host}/stompbroker`;
const stompClient = new Client({ brokerURL: webSocketUrl });

export function useVehicleCommands() {
  return { publishVehicleCommands };
}
/**
 * sends the commands to the backend
 * @param commands
 */
function publishVehicleCommands(commands: Direction[]) {
  const DEST =
    "/topic/3d/commands/" +
    (location.pathname.split("/")[1] as unknown as number);
  if (!stompClient.connected) {
    stompClient.activate();
  }
  stompClient.onWebSocketError = (event) => {
    console.error("WS-error", JSON.stringify(event)); /* WS-Error */
  };
  stompClient.onStompError = (frame) => {
    console.error("STOMP-error", JSON.stringify(frame)); /* STOMP-Error */
  };
  try {
    stompClient.publish({
      destination: DEST,
      headers: {},
      body: JSON.stringify(commands),
    });
  } catch (err) {
    console.error("Error while publishing VehicleCommands", err);
  }
}
