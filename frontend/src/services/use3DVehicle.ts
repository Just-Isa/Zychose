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
  botVehicle: Map<string, IVehicle>;
  errorMessage: string;
}

const vehicleState = reactive<IVehicleState>({
  vehicles: new Map<string, IVehicle>(),
  botVehicle: new Map<string, IVehicle>(),
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
    logger.error("WS-error", JSON.stringify(event)); /* WS-Error */
    location.href = "/500";
  };
  stompClient.onStompError = (frame) => {
    logger.error("STOMP-error", JSON.stringify(frame)); /* STOMP-Error */
    location.href = "/500";
  };
  stompClient.onConnect = () => {
    stompClient.subscribe(DEST, (message) => {
      checkIfVehicleIsBot(JSON.parse(message.body));
    });
  };
}

function checkIfVehicleIsBot(vehicle: IVehicleMessage) {
  if (vehicle.vehicleType === "bot") {
    handleMessage(vehicleState.botVehicle, vehicle);
  } else {
    handleMessage(vehicleState.vehicles, vehicle);
  }
}

function handleMessage(vehiclemap: Map<string, IVehicle> ,jsonObject: IVehicleMessage) {
  
  if (jsonObject.operator === MessageOperator.DELETE) {
    vehiclemap.delete(jsonObject.userSessionId);
  }
  if (
    jsonObject.operator === MessageOperator.CREATE ||
    jsonObject.operator === MessageOperator.UPDATE
  ) {
    vehiclemap.set(
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
