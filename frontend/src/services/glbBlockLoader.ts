import type * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { reactive } from "vue";
import swtpConfigJSON from "../../../swtp.config.json";

if (!swtpConfigJSON.consoleLogging) {
  console.log = function () {};
  console.error = function () {};
}

const gltfloader = new GLTFLoader();
const glbState = reactive<GLBState>({
  blockMap: new Map(),
});

export function useGLB() {
  return { glbState, loadModel };
}

export interface GLBState {
  blockMap: Map<string, Promise<THREE.Group>>;
}

/**
 * loads the block assets from filepath
 * returns a Promise
 */
async function loadModel(filepath: string): Promise<THREE.Group> {
  return new Promise((resolve, reject) => {
    try {
      gltfloader.load(
        filepath,
        (data) => resolve(data.scene),
        function (xhr) {
          console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
        },
        reject
      );
    } catch (error) {
      console.error(error);
    }
  });
}
