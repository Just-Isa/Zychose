import * as THREE from "three";
import data from "../data/dummy.json";
import { generateMapArray } from "./JSONtoMapArray";
import { useCamera } from "./CameraManager";
import { useVehicle } from "@/services/use3DVehicle";
import type { VehicleCameraContext } from "./VehicleCamera";

const blockSize = 16;
const { camState, switchCamera } = useCamera();
const { vehicleState } = useVehicle();

/**
 * Manages Scene with all Objects
 */
export class SceneManager {
  private scene: THREE.Scene;
  private blockMap: Map<string, Promise<THREE.Group>>;
  private streetArray: string[][] = generateMapArray(data);
  private renderer: THREE.Renderer;
  private vehicles: THREE.Group[]; // list of all Object u should update every frame.
  private vehicleCamera: VehicleCameraContext =
    camState.vehicleCam as VehicleCameraContext;
  constructor(
    scene: THREE.Scene,
    blockMap: Map<string, Promise<THREE.Group>>,
    renderer: THREE.Renderer
  ) {
    this.scene = scene;
    this.blockMap = blockMap;
    this.renderer = renderer;
    this.vehicles = [];
  }
  initScene() {
    this.createLandscape();
    this.createGrid();
    this.addControllableVehicle();
    this.handleRender();
    switchCamera(this.vehicleCamera);
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
        if (name !== "") {
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
  addControllableVehicle() {
    const blockPromise = this.blockMap.get("car");
    if (blockPromise !== undefined) {
      blockPromise
        ?.then((block) => {
          const car = block.clone();

          car.position.set(
            vehicleState.vehicle.postitionX,
            vehicleState.vehicle.postitionY,
            vehicleState.vehicle.postitionZ
          );
          car.rotation.set(
            vehicleState.vehicle.rotationX,
            vehicleState.vehicle.rotationX,
            vehicleState.vehicle.rotationX
          );
          this.scene.add(car);
          this.vehicleCamera.request(vehicleState.vehicle.speed, car);
          this.vehicles.push(car);
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
      //every vehicle gets rendered
      this.vehicles.forEach((vehicle) => {
        this.updateVehicle(vehicle);
      });
      this.renderer.render(this.scene, camState.cam as THREE.PerspectiveCamera);
      requestAnimationFrame(animate);
    };
    animate();
  }

  /**
   *
   * updates the vehicle with lerping
   *
   * @param threeVehicle
   * @param t
   */
  updateVehicle(threeVehicle: THREE.Group) {
    const lerpDuration = 0.075;
    const quaternion = new THREE.Quaternion();

    const destination = new THREE.Vector3(
      vehicleState.vehicle.postitionX,
      vehicleState.vehicle.postitionY,
      vehicleState.vehicle.postitionZ
    );

    const newRotation = new THREE.Euler(
      vehicleState.vehicle.rotationX,
      vehicleState.vehicle.rotationY,
      vehicleState.vehicle.rotationZ,
      "XYZ"
    );

    const newQuaterion = quaternion.setFromEuler(newRotation);
    threeVehicle.quaternion.slerp(newQuaterion, lerpDuration);
    threeVehicle.position.lerp(destination, lerpDuration);
    this.vehicleCamera.request(vehicleState.vehicle.speed, threeVehicle);
  }
}
