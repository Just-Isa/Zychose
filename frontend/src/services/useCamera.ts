import * as THREE from "three";
import { PerspectiveCamera } from "three";
import { reactive, readonly } from "vue";
import { CarCamera } from "./CarCamera";

let firstPerson = true; 
const aspect = window.innerWidth / window.innerHeight;

export interface iCameraState {
  cam: PerspectiveCamera;
  carcam: CarCamera;

}

const camState = reactive<iCameraState>({
  cam: new PerspectiveCamera(70, aspect, 2, 2000),
  carcam: new CarCamera(new THREE.Group(), new THREE.PerspectiveCamera(), false)
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
 * Iterates with each pressed key throw cameras.
 */
function switchCamera() {
  document.addEventListener("keypress", (event) => {
    if (event.key === "c") {
        camState.carcam.switchPerspective();  
    }
  });
}
/**
 * Updates the Camera according to the car position.
 */
function updateCamera(speed: number) {
    camState.carcam.updateCamera(speed);
    
}

function initCarCamera(car: THREE.Group){
    camState.carcam = new CarCamera(car, camState.cam, firstPerson);

}
