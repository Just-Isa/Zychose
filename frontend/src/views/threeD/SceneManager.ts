import * as THREE from "three";
import type { Scene } from "three";
import swtpconfig from "../../../../swtp.config.json";
import type { IStreetInformation } from "@/services/useStreets";
import { useCamera } from "./CameraManager";
import { useVehicle } from "../../services/use3DVehicle";
import type { VehicleCameraContext } from "./VehicleCamera";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { logger } from "@/helpers/Logger";

const blockSize = 16;
const { camState, switchCamera } = useCamera();
const { vehicleState } = useVehicle();
type StreetBlock = IStreetInformation;

/**
 * Manages Scene with all Objects
 */
export class SceneManager {
  scene: Scene;
  blockMap: Map<string, Promise<THREE.Group>>;
  data: StreetBlock[];
  private renderer: THREE.Renderer;
  private vehicles: THREE.Group[]; // list of all Object u should update every frame.
  private vehicleCamera: VehicleCameraContext =
    camState.vehicleCam as VehicleCameraContext;

  constructor(
    scene: Scene,
    blockMap: Map<string, Promise<THREE.Group>>,
    data: StreetBlock[],
    renderer: THREE.Renderer
  ) {
    this.scene = scene;
    this.blockMap = blockMap;
    this.data = JSON.parse(JSON.stringify(data));
    this.renderer = renderer;
    this.vehicles = [];
  }
  /**
   * runs all functions to create the scene
   */
  initScene() {
    this.createLandscape();
    this.createGrid();
    this.addControllableVehicle();
    this.handleRender();
    this.addSkybox();
    switchCamera(this.vehicleCamera);
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
          logger.error(error);
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
    this.data.forEach((streetBlock: StreetBlock) => {
      this.addBlockToScene(
        streetBlock.streetType,
        (streetBlock.posX - 1 - swtpconfig.gridSize / 2) * blockSize,
        0,
        (streetBlock.posY - 1 - swtpconfig.gridSize / 2) * blockSize,
        Number(streetBlock.rotation) * (Math.PI / 180)
      );
    });
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
          logger.error(error);
        });
    } else {
      this.getErrorBlock(0, 0, 0);
    }
  }
  /**
   * adds skybox to the scene.
   */
  addSkybox() {
    const scene = this.scene;
    new RGBELoader()
      .setPath("/assets/skybox/")
      .load("skylight.hdr", function (texture: any) {
        texture.mapping = THREE.EquirectangularReflectionMapping;

        scene.background = texture;
        scene.environment = texture;
      });
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
