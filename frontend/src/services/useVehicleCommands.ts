import type { Direction } from "@/services/keyInputHandler";
import { Client } from "@stomp/stompjs";
import { checkStompConnect, stompErrors, stompPublishData } from "./stompFunc";

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
  checkStompConnect(stompClient);
  stompErrors(stompClient);
  stompPublishData(stompClient, DEST, commands);
}
