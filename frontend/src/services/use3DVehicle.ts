import { logger } from "@/helpers/Logger";
import { Client } from "@stomp/stompjs";
import { reactive, readonly } from "vue";
import {
  Vehicle,
  type IVehicle,
  type IVehicleMessage,
} from "../model/IVehicle";
const webSocketUrl = `ws://${window.location.host}/stompbroker`;
const stompClient = new Client({ brokerURL: webSocketUrl });
import { MessageOperator } from "../model/MessageOperators";

export interface IVehicleState {
  vehicles: Map<string, IVehicle>;
  errorMessage: string;
}

const vehicleState = reactive<IVehicleState>({
  vehicles: new Map<string, IVehicle>(),
  errorMessage: "",
});

export function use3DVehicle() {
  return {
    vehicleState: readonly(vehicleState),
    receiveVehicle,
  };
}

/**
 * Subscribes to the Vehicle-Topic and updates the vehicleState.
 */
function receiveVehicle() {
  const DEST =
    "/topic/vehicle/" + (location.pathname.split("/")[1] as unknown as number);
  if (!stompClient.connected) {
    stompClient.activate();
  }
  stompClient.onWebSocketError = (event) => {
    logger.error("WS-error", JSON.stringify(event)); /* WS-Error */
    location.href = "/500";
  };
  stompClient.onStompError = (frame) => {
    logger.error("STOMP-error", JSON.stringify(frame)); /* STOMP-Error */
    location.href = "/500";
  };
  stompClient.onConnect = () => {
    stompClient.subscribe(DEST, (message) => {
      handleMessage(JSON.parse(message.body));
    });
  };
}
function handleMessage(jsonObject: IVehicleMessage) {
  if (jsonObject.operator !== MessageOperator.UPDATE)
    logger.log("HANDLE MESSAGE: ", jsonObject);
  if (jsonObject.operator === MessageOperator.DELETE) {
    logger.log(
      "SESSIONID: ",
      vehicleState.vehicles.get(jsonObject.userSessionId)
    );
    logger.log("map vor delete:", vehicleState.vehicles);
    vehicleState.vehicles.delete(jsonObject.userSessionId);
    logger.log("VEHICLE DELETED");
    logger.log(vehicleState.vehicles);
  }
  if (
    jsonObject.operator === MessageOperator.CREATE ||
    jsonObject.operator === MessageOperator.UPDATE
  ) {
    vehicleState.vehicles.set(
      jsonObject.userSessionId,
      new Vehicle(
        jsonObject.vehicleType,
        jsonObject.postitionX,
        jsonObject.postitionY,
        jsonObject.postitionZ,
        jsonObject.rotationX,
        jsonObject.rotationY,
        jsonObject.rotationZ,
        jsonObject.speed
      )
    );
  }
}
