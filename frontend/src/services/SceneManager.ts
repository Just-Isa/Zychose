import * as THREE from "three";
import type { Scene } from "three";
import data from "../data/dummy.json";
import { generateMapArray } from "./JSONtoMapArray";

const BOXSIZE = 16;
export class SceneManager {
  scene: Scene;
  tileMap: Map<string, Promise<THREE.Group>>;
  streetArray: String[][] = generateMapArray(data);

  constructor(scene: Scene, tileMap: Map<string, Promise<THREE.Group>>) {
    this.scene = scene;
    this.tileMap = tileMap;
  }

  //adds loaded tile to Scene
  addTileToScene(
    objectKey: string,
    posX: number,
    posY: number,
    posZ: number,
    rotation: number
  ) {
    const tilePromise = this.tileMap.get(objectKey);
    if (tilePromise != undefined) {
      tilePromise
        ?.then((tile) => {
          const clonedTile = tile.clone();
          clonedTile.position.set(posX, posY, posZ);
          clonedTile.rotateY(rotation);
          this.scene.add(clonedTile);
        })
        .catch((error) => {
          this.getErrorTile(posX, posY, posZ);
          console.error(error);
        });
    } else {
      this.getErrorTile(posX, posY, posZ);
    }
  }

  //tile for error cases
  private getErrorTile(posX: number, posY: number, posZ: number) {
    const geometry = new THREE.BoxGeometry(BOXSIZE, 1, BOXSIZE);
    const material = new THREE.MeshBasicMaterial({ color: "#FF0000" });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(posX, posY, posZ);
    this.scene.add(cube);
  }

  //generates the objects according to the (json-)array
  createGrid() {
    for (let i = 0; i < this.streetArray.length; i++) {
      for (let j = 0; j < this.streetArray.length; j++) {
        const values = this.streetArray[i][j].split(":");
        const name = values[0];
        let rotation = Number(values[1]) * (Math.PI / 180);
        if (isNaN(rotation)) rotation = 0;
        if (name != "") {
          this.addTileToScene(
            name,
            (i - this.streetArray.length / 2) * BOXSIZE,
            0,
            (j - this.streetArray.length / 2) * BOXSIZE,
            rotation
          );
        }
      }
    }
  }

    // creates landscape with ground
    createLandscape(){
       this.addTileToScene("landscape", 0 , -17 , 0, 0);
    }
}
