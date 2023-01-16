import { Client } from "@stomp/stompjs";
import { reactive, readonly } from "vue";
import { Vehicle, type IVehicle } from "./IVehicle";
const webSocketUrl = `ws://${window.location.host}/stompbroker`;
const stompClient = new Client({ brokerURL: webSocketUrl });

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
  const DEST =
    "/topic/vehicle/" + (location.pathname.split("/")[1] as unknown as number);
  if (!stompClient.connected) {
    stompClient.activate();
  }
  stompClient.onWebSocketError = (event) => {
    console.error("WS-error", JSON.stringify(event)); /* WS-Error */
  };
  stompClient.onStompError = (frame) => {
    console.error("STOMP-error", JSON.stringify(frame)); /* STOMP-Error */
  };
  stompClient.onConnect = () => {
    stompClient.subscribe(DEST, (message) => {
      vehicleState.vehicle = JSON.parse(message.body);
    });
  };
}
