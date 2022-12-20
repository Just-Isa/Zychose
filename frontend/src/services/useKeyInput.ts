import { reactive, readonly } from "vue";
import type { VehicleCamera } from "./VehicleCamera";

const keysPressed = reactive(new Map<string, boolean>());

export function useKeyInput() {
  return { keysPressed: readonly(keysPressed), inputs, switchCamera};
}

/**
 * Detects when a key gets pressed and changes the boolean of that key in the map to true,
 * when key gets released the boolean will set to false again.
 */
function inputs() {
  document.addEventListener("keydown", (event) => {
    keysPressed.set(event.key, true);
  });

  document.addEventListener("keyup", (event) => {
    keysPressed.set(event.key, false);
  });
}

/**
 * Switches Perspective when c is pressed.
 * Check which perspective is in use and changes it accordingly.
 */
function switchCamera(vCam:VehicleCamera) {
  document.addEventListener("keypress", (event) => {
    if (event.key === "c") {
      vCam.switchPerspective();
    }
  });
}