import * as THREE from "three";
import data from "../data/dummy.json";
import { generateMapArray } from "./JSONtoMapArray";
import { ControllableVehicle } from "./ControllableVehicle";
import { useCamera } from "./useCamera";
import type { IUpdatable } from "./IUpdatable";

const blockSize = 16;
const {camState} = useCamera();

/**
 * Manages Scene with all Objects
 */
export class SceneManager {
  private scene: THREE.Scene;
  private blockMap: Map<string, Promise<THREE.Group>>;
  private streetArray: string[][] = generateMapArray(data);
  private renderer: THREE.Renderer;
  private updatables: IUpdatable[]; // list of all Object u should update every frame.
  constructor(
    scene: THREE.Scene,
    blockMap: Map<string, Promise<THREE.Group>>,
    renderer: THREE.Renderer, 
  ) {
    this.scene = scene;
    this.blockMap = blockMap;
    this.renderer = renderer;
    this.updatables = [];
  }

  /**
   *
   * adds loaded tile to Scene
   *
   * @param objectKey
   * @param posX
   * @param posY
   * @param posZ
   * @param rotation
   *
   *
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

  /**
   * adds new car
   */
  addCar() {
    const key = "car";
    const blockPromise = this.blockMap.get(key);
    if (blockPromise != undefined) {
      blockPromise
        ?.then((block) => {
          const car = block.clone();
          car.position.set(0, 0, 0);
          console.log(":(")
          console.log(camState)
          this.scene.add(car);
          this.updatables.push(new ControllableVehicle(car,1,0.01,0.015,0.05));
        })
        .catch((error) => {
          this.getErrorBlock(0, 0, 0);
          console.error(error);
        });
    } else {
      this.getErrorBlock(0, 0, 0);
    }
  }

  /**
   * 
   * Renders and animates the scene.
   *
   */
  handleRender() {
    const animate = () => {
      //every updatable gets rendered
      this.updatables.forEach((updatables) => {
        updatables.update();
      });
      this.renderer.render(
        this.scene,
        camState.cam as THREE.PerspectiveCamera
      );
      requestAnimationFrame(animate);
    };
    animate();
  }
}
