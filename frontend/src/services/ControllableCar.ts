import * as THREE from "three";
import type { ICar } from "./ICar";
import { useInputs } from "./useInputs";

const { keysPressed } = useInputs();

export class ControllableCar implements ICar {
  direction = new THREE.Vector3();
  destination = new THREE.Vector3();
  speed: number;
  maxspeed: number;
  handling: number;
  slowing: number;
  acceleration: number;
  car: THREE.Group;
  camera: THREE.Camera;

  constructor(car: THREE.Group, camera: THREE.Camera) {
    this.speed = 0;
    this.car = car;
    this.camera = camera;
    this.camera.position;
    this.maxspeed = 2;
    this.acceleration = 0.1;
    this.handling = 0.15;
    this.slowing = -0.15;
  }
  /**
   * handles car with inputs.
   */
  handelCar() {
    if (!keysPressed.get("ArrowUp") && !keysPressed.get("ArrowDown")) {
      this.carRunOut();
    }

    if (keysPressed.get("ArrowUp")) {
      this.calcSpeed(this.acceleration);
    }
    if (keysPressed.get("ArrowDown")) {
      this.calcSpeed(-this.acceleration);
    }

    if (this.speed != 0) {
      if (keysPressed.get("ArrowLeft")) {
        this.rotate(this.handling);
      }
      if (keysPressed.get("ArrowRight")) {
        this.rotate(-this.handling);
      }
    }
    this.move();
  }
  /**
   * moves Car
   */
  private move() {
    this.car.getWorldDirection(this.direction);
    this.destination.add(this.direction.multiplyScalar(this.speed));
    // if(this.speed>=0){
    //   this.camera.lookAt(this.destination.clone())
    // }
    // else{
    //   this.camera.lookAt(this.destination.clone().multiplyScalar(-1))

    // }

    // this.camera.position.lerpVectors(this.car.position.clone().set(this.car.position.x, this.car.position.y+30 ,this.car.position.z), this.destination.clone().set(this.destination.x, this.destination.y+30 ,this.destination.z),0.5);

    this.car.position.lerpVectors(this.car.position, this.destination, 0.5);
  }

  /**
   *
   * calculates speed
   * @param acc
   */
  private calcSpeed(acc: number) {
    // math.round because js can count corretly
    const curspeed = Math.round((this.speed + acc) * 100) / 100;
    if (Math.abs(curspeed) >= this.maxspeed) {
      if (acc < 0) {
        this.speed = -this.maxspeed;
      } else {
        this.speed = this.maxspeed;
      }
    } else {
      this.speed = curspeed;
    }
  }
  /**
   * rotates car
   * @param hand
   */
  private rotate(hand: number) {
    this.car.rotation.y += hand; //+ 0.1/Math.round(Math.abs(this.speed))
  }

  /**
   * lets car run out after user doesnt move car
   */
  private carRunOut() {
    if (this.speed > 0) {
      const curSpeed = Math.round((this.speed + this.slowing) * 100) / 100;

      if (curSpeed < 0) {
        this.speed = 0;
      } else {
        this.speed = curSpeed;
      }
    } else if (this.speed < 0) {
      const curSpeed = Math.round((this.speed - this.slowing) * 100) / 100;

      if (curSpeed > 0) {
        this.speed = 0;
      } else {
        this.speed = curSpeed;
      }
    }
  }
}
