import type { MessageOperator } from "./MessageOperators";

export interface IVehicle {
  postitionX: number;
  postitionY: number;
  postitionZ: number;
  rotationX: number;
  rotationY: number;
  rotationZ: number;
  speed: number;
}
export class Vehicle implements IVehicle {
  postitionX: number;
  postitionY: number;
  postitionZ: number;
  rotationX: number;
  rotationY: number;
  rotationZ: number;
  speed: number;
  constructor(
    postitionX: number,
    postitionY: number,
    postitionZ: number,
    rotationX: number,
    rotationY: number,
    rotationZ: number,
    speed: number
  ) {
    this.postitionX = postitionX;
    this.postitionY = postitionY;
    this.postitionZ = postitionZ;
    this.rotationX = rotationX;
    this.rotationY = rotationY;
    this.rotationZ = rotationZ;
    this.speed = speed;
  }
}
export interface IVehicleMessage {
  operator: MessageOperator;
  userSessionId: string;
  postitionX: number;
  postitionY: number;
  postitionZ: number;
  rotationX: number;
  rotationY: number;
  rotationZ: number;
  speed: number;
}
