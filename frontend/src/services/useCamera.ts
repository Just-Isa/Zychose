import * as THREE from "three";
import { PerspectiveCamera } from "three";
import { reactive } from "vue";
import { CarCamera } from "./CarCamera";

const firstPerson = true;
const aspect = window.innerWidth / window.innerHeight;

export interface iCameraState {
  cam: PerspectiveCamera;
  carcam: CarCamera;
}

const camState = reactive<iCameraState>({
  cam: new PerspectiveCamera(70, aspect, 1, 2000),
  carcam: new CarCamera(
    new THREE.Group(),
    new THREE.PerspectiveCamera(),
    false
  ),
});

export function useCamera() {
  return {
    camState: camState,
    switchCamera,
    updateCamera,
    initCarCamera,
  };
}
/**
 * Switches Perspective when c is pressed.
 * Check which perspective is in use and changes it accordingly.
 */
function switchCamera() {
  document.addEventListener("keypress", (event) => {
    if (event.key === "c") {
      camState.carcam.switchPerspective();
    }
  });
}
/**
 * Attaches camera to vehicle by updating the camera position to the car's position.
 * @param speed
 */
function updateCamera(speed: number) {
  camState.carcam.updateCamera(speed);
}
/**
 * Initialize car camera.
 * @param car
 */
function initCarCamera(car: THREE.Group) {
  camState.carcam = new CarCamera(car, camState.cam, firstPerson);
}
