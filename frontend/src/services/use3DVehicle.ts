import { Client } from "@stomp/stompjs";
import { reactive, readonly } from "vue";
import { Vehicle, type IVehicle, type IVehicleMessage } from "./IVehicle";
import { MessageOperator } from "./MessageOperators";

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
  const webSocketUrl = `ws://${window.location.host}/stompbroker`;
  const DEST =
    "/topic/vehicle/" + (location.pathname.split("/")[1] as unknown as number);
  const stompClient = new Client({ brokerURL: webSocketUrl });
  stompClient.onWebSocketError = () => {
    vehicleState.errorMessage = "WS-error";
    console.log("WS-error"); /* WS-Error */
  };
  stompClient.onStompError = () => {
    vehicleState.errorMessage = "STOMP-ERROR";
    console.log("STOMP-error"); /* STOMP-Error */
  };
  stompClient.onConnect = () => {
    stompClient.subscribe(DEST, (message) => {
      handleMessage(JSON.parse(message.body));
    });
  };
  stompClient.activate();
  stompClient.onDisconnect = () => {
    /* Verbindung abgebaut*/
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
