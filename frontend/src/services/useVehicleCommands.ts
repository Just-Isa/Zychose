import { getSessionIDFromCookie } from "@/helpers/SessionIDHelper";
import type { Direction } from "@/services/keyInputHandler";
import { Client } from "@stomp/stompjs";

export function useVehicleCommands() {
  return { publishVehicleCommands };
}

export interface IVehicleCommandMessage {
  commands: Direction[];
  userSessionId: string;
}
export class VehicleCommandMessage implements IVehicleCommandMessage {
  commands: Direction[];
  userSessionId: string;
  constructor(commands: Direction[], userSessionId: string) {
    this.commands = commands;
    this.userSessionId = userSessionId;
  }
}

/**
 * sends the commands to the backend
 * @param commands
 */
function publishVehicleCommands(commands: Direction[]) {
  const message = new VehicleCommandMessage(commands, getSessionIDFromCookie());
  const webSocketUrl = `ws://${window.location.host}/stompbroker`;
  const DEST =
    "/topic/3d/commands/" +
    (location.pathname.split("/")[1] as unknown as number);
  const userClient = new Client({ brokerURL: webSocketUrl });
  userClient.onWebSocketError = () => {
    console.log("WS-error"); /* WS-Error */
  };
  userClient.onStompError = () => {
    console.log("STOMP-error"); /* STOMP-Error */
  };
  userClient.onConnect = () => {
    try {
      userClient.publish({
        destination: DEST,
        headers: {},
        body: JSON.stringify(message),
      });
    } catch (err) {
      // in case of an error
      console.log("Error while Publishing User! ", err);
    }
  };
  userClient.activate();
  userClient.onDisconnect = () => {
    /* Verbindung abgebaut*/
  };
}
