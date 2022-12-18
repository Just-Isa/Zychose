import * as THREE from "three";
import { PerspectiveCamera } from "three";
import { reactive, readonly } from "vue";

let camActive = 0;

const enum Camera {
  CAMERATOP = 0,
  THIRDPERSIONCAM = 1,
  FIRSTPERSONCAM = 2,
}

const cameras = [
  Camera.CAMERATOP,
  Camera.THIRDPERSIONCAM,
  Camera.FIRSTPERSONCAM,
];

export interface iCameraState {
  cam: PerspectiveCamera;
}

const camState = reactive<iCameraState>({
  cam: new PerspectiveCamera(),
});

export function useCamera() {
  return {
    camState: readonly(camState),
    switchCamera,
    updateCamera,
  };
}
/** 
 * Switches Perspective when c is pressed.
 * Iterates with each pressed key throw cameras.
 */
function switchCamera() {
  document.addEventListener("keypress", (event) => {
    if (event.key === "c") {
      camActive = (camActive + 1) % cameras.length;
      console.log(cameras[camActive]);
    }
  });
}
/**
 * Updates the Camera according to the car position.
 */
function updateCamera(car: THREE.Group) {}
