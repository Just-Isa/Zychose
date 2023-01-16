import { logger } from "@/helpers/ConsoleLoggingManager";
import { Client } from "@stomp/stompjs";
import { reactive, readonly } from "vue";
import { Vehicle, type IVehicle } from "./IVehicle";

export interface IVehicleState {
  vehicle: IVehicle;
  errorMessage: string;
}

const vehicleState = reactive<IVehicleState>({
  vehicle: new Vehicle(0, 0, 0, 0, 0, 0, 0),
  errorMessage: "",
});

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
    logger.log("WS-error"); /* WS-Error */
    location.href = "/500";
  };
  stompClient.onStompError = () => {
    vehicleState.errorMessage = "STOMP-ERROR";
    logger.log("STOMP-error"); /* STOMP-Error */
    location.href = "/500";
  };
  stompClient.onConnect = () => {
    stompClient.subscribe(DEST, (message) => {
      vehicleState.vehicle = JSON.parse(message.body);
    });
  };
  stompClient.activate();
  stompClient.onDisconnect = () => {
    /* Verbindung abgebaut*/
  };
}
