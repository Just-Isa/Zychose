import * as THREE from "three";
import type { PerspectiveCamera, Renderer, Scene } from "three";

const aspect = window.innerWidth / window.innerHeight;

export class CameraManager {
  scene: Scene;
  renderer: Renderer;
  cam: PerspectiveCamera;
  camMap: Map<string, THREE.PerspectiveCamera>;

  constructor(
    scene: Scene,
    renderer: Renderer,
    cam: THREE.PerspectiveCamera,
    camMap: Map<string, THREE.PerspectiveCamera>
  ) {
    this.scene = scene;
    this.renderer = renderer;
    this.cam = cam;
    this.camMap = camMap;
  }

  switchCamera() {
    //TODO Enum
    //const camaraTop = "CameraTop";
    // const camaraThird = "ThirdPersonCam";
    //const camaraFirst = "FirstPersonCam";
    //const activeCamera = this.cam;
    const renderer = this.renderer;

    window.addEventListener("keydown", (event) => {
      if (event.code === "KeyC") {
        if (this.cam.name === "CameraTop") {
          console.log("This Camera is " + this.cam.name);
          // this.cam.name = "ThirdPersonCam";
          const cameraThird = new THREE.PerspectiveCamera(
            70,
            aspect,
            0.01,
            500
          );
          cameraThird.position.z = 10;
          cameraThird.position.y = 2;
          cameraThird.lookAt(0, 0, 0);
          cameraThird.name = "ThirdPersonCam";
          this.cam = cameraThird;
          console.log(this.cam);
          console.log(cameraThird);
          /*
                    this.cam.position.z = 10;
                    this.cam.position.y = 10;
                    this.cam.lookAt(0,0,0)
                    */
        } else if (this.cam.name === "ThirdPersonCam") {
          console.log("This Camera is " + this.cam.name);
          this.cam.name = "FirstPersonCam";
          const pt = new THREE.Vector3();

          this.cam.position.z = 0;
          this.cam.position.y = 10;
          const direction = this.cam.getWorldDirection(pt);
          this.cam.lookAt(direction);
        } else if (this.cam.name === "FirstPersonCam") {
          console.log("This Camera is " + this.cam.name);
          this.cam.name = "CameraTop";
          this.cam.position.z = 400;
          this.cam.position.y = 1500;
          this.cam.lookAt(0, 0, 0);
        }
      }
      console.log("Render Cam: " + this.cam.name);
      renderer.render(this.scene, this.cam);
    });
  }

  getCameraByName(name: string) {
    let camWanted = new THREE.PerspectiveCamera(0, aspect, 0, 0);
    this.camMap.forEach((value: THREE.PerspectiveCamera, key: string) => {
      if (key === name) {
        camWanted = value;
      }
    });
    return camWanted;
  }

  getCameraMap() {
    return this.camMap;
  }
}
