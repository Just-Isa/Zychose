import * as THREE from "three";
import { useInputs } from "./useInputs";

const { keysPressed } = useInputs();

export class Car {
  direction = new THREE.Vector3();
  destination = new THREE.Vector3();
  speed: number;
  maxspeed: number;
  handling: number;
  slowing: number;
  car: THREE.Group;
  acceleration: number;
  camera: THREE.Camera;

  constructor(car: THREE.Group, camera: THREE.Camera) {
    this.speed = 0;
    this.car = car;
    this.camera = camera;
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
