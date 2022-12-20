import type * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { reactive } from "vue";

const gltfloader = new GLTFLoader();
const path = "/src/assets/models/";
const glbState = reactive<GLBState>({
  blockMap: new Map(),
});

export function useGLB() {
  return { glbState, generateBlockMap };
}

export interface GLBState {
  blockMap: Map<string, Promise<THREE.Group>>;
}

/**
 * creates an map of blocks with filename as key and Promise as Value.
 */
function generateBlockMap() {
  //path cant be variable, i dont know why
  const assetNames = import.meta.glob(`/src/assets/models/*`);

  for (const path in assetNames) {
    const key = path.toString().split("/")[4].split(".")[0];
    glbState.blockMap.set(key, loadModel(key));
  }
}

/**
 * loads the block assets from filepath
 * returns a Promise
 */
async function loadModel(filename: string): Promise<THREE.Group> {
  const url = `${path}${filename}.glb`;
  return new Promise((resolve, reject) => {
    try {
      gltfloader.load(
        url,
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
