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
export interface IReceiveVehicleMessage {
  operator: MessageOperator;
  userSessionId: string;
  postitionX: number;
  postitionY: number;
  postitionZ: number;
  rotationX: number;
  rotationY: number;
  rotationZ: number;
  speed: number;
}

export function useVehicle() {
  return { vehicleState: readonly(vehicleState), receiveVehicle };
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
  if (jsonObject.operator == MessageOperator.DELETE) {
    vehicleState.vehicles.delete(jsonObject.userSessionId);
  }
  if (jsonObject.operator === MessageOperator.CREATE) {
    vehicleState.vehicles.set(
      jsonObject.userSessionId,
      new Vehicle(
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
  if (jsonObject.operator === MessageOperator.UPDATE) {
    vehicleState.vehicles.set(
      jsonObject.userSessionId,
      new Vehicle(
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
