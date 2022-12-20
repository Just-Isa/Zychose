import { PerspectiveCamera } from "three";
import { reactive } from "vue";

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
  };
}
