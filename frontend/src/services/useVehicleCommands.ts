import { logger } from "@/helpers/ConsoleLoggingManager";
import type { Direction } from "@/services/keyInputHandler";
import { Client } from "@stomp/stompjs";

export function useVehicleCommands() {
  return { publishVehicleCommands };
}
/**
 * sends the commands to the backend
 * @param commands
 */
function publishVehicleCommands(commands: Direction[]) {
  const webSocketUrl = `ws://${window.location.host}/stompbroker`;
  const DEST =
    "/topic/3d/commands/" +
    (location.pathname.split("/")[1] as unknown as number);
  const userClient = new Client({ brokerURL: webSocketUrl });
  userClient.onWebSocketError = () => {
    logger.log("WS-error"); /* WS-Error */
    location.href = "/500";
  };
  userClient.onStompError = () => {
    logger.log("STOMP-error"); /* STOMP-Error */
    location.href = "/500";
  };
  userClient.onConnect = () => {
    try {
      userClient.publish({
        destination: DEST,
        headers: {},
        body: JSON.stringify(commands),
      });
    } catch (err) {
      // in case of an error
      logger.log("Error while Publishing User! ", err);
      location.href = "/500";
    }
  };
  userClient.activate();
  userClient.onDisconnect = () => {
    /* Verbindung abgebaut*/
  };
}
