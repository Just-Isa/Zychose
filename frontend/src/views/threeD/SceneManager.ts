import * as THREE from "three";
import type { Scene } from "three";
import swtpconfig from "../../../../swtp.config.json";
import type { IStreetInformation } from "@/services/useStreets";
import { useCamera } from "./CameraManager";
import { useVehicle } from "../../services/use3DVehicle";
import type { VehicleCameraContext } from "./VehicleCamera";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import type { IVehicle } from "../../model/IVehicle";
import { getSessionIDFromCookie } from "@/helpers/SessionIDHelper";
import { logger } from "@/helpers/Logger";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { TTFLoader } from "three/examples/jsm/loaders/TTFLoader.js";
import config from "../../../../swtp.config.json";

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
  private vehicles: Map<string, THREE.Group> = new Map<string, THREE.Group>(); // list of all Object u should update every frame.
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
  }
  /**
   * runs all functions to create the scene
   */
  initScene() {
    this.createLandscape();
    this.createGrid();
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
  addVehicle(vehicle: IVehicle, vehicleSessionId: string) {
    const blockPromise = this.blockMap.get("car");

    if (blockPromise !== undefined && !this.vehicles.has(vehicleSessionId)) {
      blockPromise
        ?.then((block) => {
          const car = block.clone();

          car.position.set(
            vehicle.postitionX,
            vehicle.postitionY,
            vehicle.postitionZ
          );
          car.rotation.set(
            vehicle.rotationX,
            vehicle.rotationY,
            vehicle.rotationZ
          );
          this.scene.add(car);
          this.addTextToVehicle(vehicleSessionId, car);

          if (vehicleSessionId === getSessionIDFromCookie()) {
            this.vehicleCamera.request(vehicle.speed, car);
          }

          this.vehicles.set(vehicleSessionId, car);
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
      this.updateVehicleMap();
      for (const [key, val] of this.vehicles) {
        this.updateVehicle(
          val,
          vehicleState.vehicles.get(key) as IVehicle,
          key
        );
      }
      //every vehicle gets rendered
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
  private updateVehicle(
    threeVehicle: THREE.Group,
    vehicle: IVehicle,
    sessionID: string
  ) {
    const lerpDuration = 0.075;
    const quaternion = new THREE.Quaternion();

    const destination = new THREE.Vector3(
      vehicle.postitionX,
      vehicle.postitionY,
      vehicle.postitionZ
    );

    const newRotation = new THREE.Euler(
      vehicle.rotationX,
      vehicle.rotationY,
      vehicle.rotationZ,
      "XYZ"
    );

    const newQuaterion = quaternion.setFromEuler(newRotation);
    threeVehicle.quaternion.slerp(newQuaterion, lerpDuration);
    threeVehicle.position.lerp(destination, lerpDuration);

    if (sessionID === getSessionIDFromCookie()) {
      this.vehicleCamera.request(vehicle.speed, threeVehicle);
    } else {
      threeVehicle.getObjectByName("text")?.lookAt(camState.cam.position);
    }
  }

  /**
   * checks if vehicles are added or removed and updates the map
   */
  private updateVehicleMap() {
    for (const [key, val] of vehicleState.vehicles) {
      logger.log("Vehicle von " + key + " wurde hinzugefügt");
      if (!this.vehicles.has(key)) {
        this.addVehicle(val, key);
      }
    }
    for (const [key, val] of this.vehicles) {
      if (!vehicleState.vehicles.has(key)) {
        logger.log("Vehicle von " + key + " wurde gelöscht");
        this.scene.remove(val);
        this.vehicles.delete(key);
      }
    }
  }
  private addTextToVehicle(text: string, vehicle: THREE.Group) {
    const fontLoader = new FontLoader();
    const ttfloader = new TTFLoader();
    const textHightOverVehicle = 7;
    ttfloader.load(config.font, function (json) {
      const font = fontLoader.parse(json);
      const textGeometry = new TextGeometry(text, {
        font: font,
        height: 0.1,
        size: 0.75,
      });
      textGeometry.center();
      const textmesh = new THREE.Mesh(textGeometry);
      textmesh.position.set(0, textHightOverVehicle, 0);

      textmesh.name = "text";
      textmesh.quaternion.copy(camState.cam.quaternion);
      vehicle.add(textmesh);
    });
  }
}
