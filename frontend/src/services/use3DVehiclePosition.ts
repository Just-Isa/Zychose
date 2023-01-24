import { logger } from "@/helpers/Logger";
import { Client } from "@stomp/stompjs";
import { getSessionIDFromCookie } from "@/helpers/SessionIDHelper";
import {
  VehiclePositionMessage,
  type IVehiclePositionMessage,
} from "../model/IVehiclePosition";
const webSocketUrl = `ws://${window.location.host}/stompbroker`;
const positionMessageClient = new Client({ brokerURL: webSocketUrl });

export function use3DVehiclePosition() {
  return {
    createVehiclePositionAndSend,
  };
}

/**
 * All Data needed to create a new vehicle is collected here.
 * @param posX
 * @param posY
 * @param vehicleType
 */
function createVehiclePositionAndSend(
  posX: number,
  posY: number,
  vehicleType: string
) {
  console.log(
    "Info: X is " + posX + " and Z is " + posY + " for " + vehicleType
  );
  const sessionID = getSessionIDFromCookie();

  const vehiclePositionMessage = new VehiclePositionMessage(
    sessionID,
    vehicleType,
    posX,
    posY
  );
  console.log(vehiclePositionMessage);
  sendVehiclePositionMessage(vehiclePositionMessage);
}
/**
 * Connection to Backend
 */
function sendVehiclePositionMessage(
  vehiclePositionMessage: IVehiclePositionMessage
) {
  const DEST = "/topic/createVehicle";
  if (!positionMessageClient.connected) {
    positionMessageClient.activate();
  }
  positionMessageClient.onWebSocketError = (event) => {
    logger.error("WS-error", JSON.stringify(event)); /* WS-Error */
    location.href = "/500";
  };
  positionMessageClient.onStompError = (frame) => {
    logger.error("STOMP-error", JSON.stringify(frame)); /* STOMP-Error */
    location.href = "/500";
  };
  positionMessageClient.onConnect = () => {
    try {
      positionMessageClient.publish({
        destination: DEST,
        headers: {},
        body: JSON.stringify(vehiclePositionMessage),
      });
    } catch (err) {
      logger.error("Error while publishing vehicle! ", err);
    }
  };
}
