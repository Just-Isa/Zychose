import * as THREE from "three";
import { reactive } from "vue";

const camState = reactive<GLBState>({
  cameraMap: new Map(),
});

export function useCamera() {
  return { camState, createCamera };
}
export interface GLBState {
  cameraMap: Map<string, THREE.PerspectiveCamera>;
}

function createCamera() {
  const aspect = window.innerWidth / window.innerHeight;

  const cameraTop = new THREE.PerspectiveCamera(70, aspect, 1, 5500);
  cameraTop.position.z = 400;
  cameraTop.position.y = 1500;
  cameraTop.lookAt(0, 0, 0);
  cameraTop.name = "CameraTop";

  const cameraThird = new THREE.PerspectiveCamera(70, aspect, 0.01, 500);
  cameraThird.position.z = 10;
  cameraThird.position.y = 2;
  cameraThird.lookAt(0, 0, 0);
  cameraThird.name = "ThirdPersonCam";

  const cameraFirst = new THREE.PerspectiveCamera(10, aspect, 0.01, 500);
  cameraFirst.position.z = 0;
  cameraFirst.position.y = 10;
  cameraFirst.lookAt(0, 0, 0);
  cameraFirst.name = "FirstPersonCam";

  camState.cameraMap.set("CameraTop", cameraTop);
  camState.cameraMap.set("ThirdPersonCam", cameraThird);
  camState.cameraMap.set("FirstPersonCam", cameraFirst);
}
