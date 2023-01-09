import { PerspectiveCamera } from "three";
import { reactive } from "vue";
import type { VehicleCameraContext } from "./VehicleCamera";

const aspect = window.innerWidth / window.innerHeight;

export interface ICameraState {
  cam: PerspectiveCamera;
}

const camState = reactive<ICameraState>({
  cam: new PerspectiveCamera(70, aspect, 1, 2000),
});

export function useCamera() {
  return {
    camState,
    switchCamera,
  };
}
/**
 * Switches Perspective when c is pressed.
 * Check which perspective is in use and changes it accordingly.
 */
export function switchCamera(vCam: VehicleCameraContext) {
  window.addEventListener("keypress", (event) => {
    if (event.key === "c") {
      vCam.switchCameraState();
    }
  });
}
