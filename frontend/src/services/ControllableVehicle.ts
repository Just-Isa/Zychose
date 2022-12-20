import * as THREE from "three";
import type { IUpdatable } from "./IUpdatable";
import { useKeyInput } from "./useKeyInput";
import { VehicleCamera } from "./VehicleCamera";

const { keysPressed, switchCamera } = useKeyInput();
export class ControllableVehicle implements IUpdatable{
  private _direction = new THREE.Vector3();
  private _destination = new THREE.Vector3();
  private _currentSpeed = 0;
  private _runOutSpeed = -0.008;
  private _maxSpeed: number;
  private _handling: number;
  private _acceleration: number;
  private _brakeSpeed: number
  private _threeObjectVehicle: THREE.Group;
  private _vehicleCamera: VehicleCamera;
  constructor(threeObjectVehicle: THREE.Group, maxspeed: number, acceleration: number, handling: number,brakeSpeed: number) {
    this._threeObjectVehicle = threeObjectVehicle;
    this._maxSpeed = maxspeed;
    this._acceleration = acceleration;
    this._handling = handling;
    this._brakeSpeed = brakeSpeed;
    this._vehicleCamera = new VehicleCamera(true)
    this._vehicleCamera.update(this._currentSpeed, this._threeObjectVehicle) // camera should start on the vehicle position.
  }

  update(): void {
    this.handleCar();
    if(this._currentSpeed != 0){ // camera and car should only Move when speed is not 0
      this.move();
      this._vehicleCamera.update(this._currentSpeed, this._threeObjectVehicle);
    }
  }

  /**
   * handles car with inputs.
   */
  handleCar():void {
    //car should rolles out when it doesnt get an input to accelerate or brake
    if (!keysPressed.get("ArrowUp") && !keysPressed.get("ArrowDown")) {
      this.carRunOut();
    }
    //car accelerates forward
    if (keysPressed.get("ArrowUp")) {
      if (this._currentSpeed < 0) {
        this.calculateSpeed(this._brakeSpeed); //or brakes the speed, when it drives backwords
      } else {
        this.calculateSpeed(this._acceleration);
      }
    }
    //car accelerates backword
    if (keysPressed.get("ArrowDown")) {
      if (this._currentSpeed > 0) {
        this.calculateSpeed(-this._brakeSpeed);//or brakes the speed, when it drives forword
      } else {
        this.calculateSpeed(-this._acceleration);
      }
    }
    //car can streer to the left or right, when the car moves
    if (this._currentSpeed != 0) {
      if (keysPressed.get("ArrowLeft")) {
        this.rotate(this._handling);
      }
      if (keysPressed.get("ArrowRight")) {
        this.rotate(-this._handling);
      }
    }
    switchCamera(this._vehicleCamera);
  }

  /**
   * moves the position of the car.
   */
  private move() {
    const lerpDuration = 0.5; //duration for the lerp
    
    this._threeObjectVehicle.getWorldDirection(this._direction);
    this._destination.add(this._direction.multiplyScalar(this._currentSpeed));
    this._threeObjectVehicle.position.lerpVectors(this._threeObjectVehicle.position, this._destination, lerpDuration);   
  
  }

  /**
   *
   * calculates speed and caps the speed at maxSpeed
   * @param acc
   */
  private calculateSpeed(acc: number) {
    const newSpeed = this.accelerate(acc)
    if (Math.abs(newSpeed) >= this._maxSpeed) {
      if (acc < 0) {
        this._currentSpeed = -this._maxSpeed;
      } else {
        this._currentSpeed = this._maxSpeed;
      }
    } else {
      this._currentSpeed = newSpeed;
    }
  }

  /**
   * Math calculation for the speed
   * @param acc 
   * @returns 
   */
  private accelerate(acc:number){
    return this._currentSpeed + acc // there can be wierd decimal places because maschines can't count :(
  }
  /**
   * rotates car
   * @param hand
   */
  private rotate(handling: number) {
    this._threeObjectVehicle.rotation.y += handling;
  }

  /**
   * lets car run out of speed.
   */
  private carRunOut() {
    if (this._currentSpeed > 0) {
      const newSpeed = this.accelerate(this._runOutSpeed);

      if (newSpeed < 0) {
        this._currentSpeed = 0;
      } else {
        this._currentSpeed = newSpeed;
      }
    } else if (this._currentSpeed < 0) {
      const curSpeed = this.accelerate(-this._runOutSpeed);

      if (curSpeed > 0) {
        this._currentSpeed = 0;
      } else {
        this._currentSpeed = curSpeed;
      }
    }
  }
}
