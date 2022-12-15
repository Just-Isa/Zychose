import * as THREE from "three";
import type { Scene } from "three";
import data from "../data/dummy.json";
import { generateMapArray } from "./JSONtoMapArray";
import * as TWEEN from '@tweenjs/tween.js'
import { Car } from "./Car";

const blockSize = 16;

/**
 * Manages Scene with all Objects
 */
export class SceneManager {
  scene: Scene;
  blockMap: Map<string, Promise<THREE.Group>>;
  streetArray: string[][] = generateMapArray(data);
  renderer:THREE.Renderer;
  camera:THREE.Camera ;
  direction = new THREE.Vector3();
  constructor(scene: Scene, blockMap: Map<string, Promise<THREE.Group>>, renderer:THREE.Renderer, camera:THREE.Camera) {
    this.scene = scene;
    this.blockMap = blockMap;
    this.renderer = renderer;
    this.camera = camera;
  }

  /**
   *
   * @param objectKey
   * @param posX
   * @param posY
   * @param posZ
   * @param rotation
   *
   * adds loaded tile to Scene
   */
  addBlockToScene(
    objectKey: string,
    posX: number,
    posY: number,
    posZ: number,
    rotation: number
  ) {
    const blockPromise = this.blockMap.get(objectKey);
    if (blockPromise != undefined) {
      blockPromise
        ?.then((block) => {
          const clonedBlock = block.clone();
          clonedBlock.position.set(posX, posY, posZ);
          clonedBlock.rotateY(rotation);
          this.scene.add(clonedBlock);
        })
        .catch((error) => {
          this.getErrorBlock(posX, posY, posZ);
          console.error(error);
        });
    } else {
      this.getErrorBlock(posX, posY, posZ);
    }
  }

  /**
   *
   * errorblock when promise could not be loaded
   *
   * @param posX
   * @param posY
   * @param posZ
   *
   */
  private getErrorBlock(posX: number, posY: number, posZ: number) {
    const geometry = new THREE.BoxGeometry(blockSize, 1, blockSize);
    const material = new THREE.MeshBasicMaterial({ color: "#FF0000" });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(posX, posY, posZ);
    this.scene.add(cube);
  }

  /**
   * generates the objects according to the (json-)array
   */
  createGrid() {
    for (const i in this.streetArray) {
      for (const j in this.streetArray[0]) {
        const values = this.streetArray[i][j].split(":");
        const name = values[0];
        let rotation = Number(values[1]) * (Math.PI / 180);
        if (isNaN(rotation)) rotation = 0;
        if (name != "") {
          this.addBlockToScene(
            name,
            (Number(i) - this.streetArray.length / 2) * blockSize,
            0,
            (Number(j) - this.streetArray.length / 2) * blockSize,
            rotation
          );
        }
      }
    }
  }

  /**
   * creates landscape with ground
   */
  createLandscape() {
    this.addBlockToScene("landscape", 0, -17, 0, 0);
  }

  handleCar() {
    const key = "car";
    const blockPromise = this.blockMap.get(key);
    if (blockPromise != undefined) {
      blockPromise
        ?.then((block) => {
          const carObject = block.clone();
          
          carObject.position.set(0, 0, 0);
          this.scene.add(carObject);
          let carm = new Car(carObject, this.scene, this.renderer, this.camera)
          carm.handleWithKeys()

        })
        .catch((error) => {
          this.getErrorBlock(0, 0, 0);
          console.error(error);
        });
    } else {
      this.getErrorBlock(0, 0, 0);
    }
  }
}
