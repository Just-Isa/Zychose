import * as THREE from "three";
import { CarCamera } from "./CarCamera";
import type { ICar } from "./ICar";
import { useCamera } from "./useCamera";
import { useInputs } from "./useInputs";


const { keysPressed } = useInputs();
const { camState, updateCamera, initCarCamera } = useCamera();

export class ControllableCar implements ICar {
  direction = new THREE.Vector3();
  destination = new THREE.Vector3();
  speed: number;
  maxspeed: number;
  handling: number;
  slowing: number;
  brake:number;
  acceleration: number;
  car: THREE.Group;
  constructor(car: THREE.Group) {
    this.speed = 0;
    this.car = car;
    this.maxspeed = 1.5;
    this.acceleration = 0.02;
    this.handling = 0.035;
    this.slowing = -0.023;
    this.brake = 0.05;

    initCarCamera(this.car);
  }

  /**
   * handles car with inputs.
   */
  handelCar() {
    if (!keysPressed.get("ArrowUp") && !keysPressed.get("ArrowDown")) {
      this.carRunOut();
    }

    if (keysPressed.get("ArrowUp")) {
      if(this.speed < 0){
        this.calcSpeed(this.brake);
      }else{
        this.calcSpeed(this.acceleration);
      }
    }
    if (keysPressed.get("ArrowDown")) {
      if(this.speed > 0){
        this.calcSpeed(-this.brake);
      }else{
        this.calcSpeed(-this.acceleration);
      }
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
    updateCamera(this.speed);
  }
  /**
   * moves car
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
    // math.round() because js can't count corretly
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
    this.car.rotation.y += hand;
  }

  /**
   * lets car slow down when user doesnt move car
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
