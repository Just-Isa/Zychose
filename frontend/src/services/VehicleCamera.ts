import { speed } from "jquery";
import * as THREE from "three";
import type { ControllableVehicle } from "./ControllableVehicle";
import { useCamera } from "./useCamera";

const { camState } = useCamera();

export class VehicleCamera {

  private _currentCameraPos = new THREE.Vector3();
  private _currentCameraLookAt = new THREE.Vector3();

  private _camera: THREE.PerspectiveCamera;
  private _isFirstPerson: boolean;

  constructor(
    isFirstPerson: boolean
  ) {
    this._camera = camState.cam;
    this._isFirstPerson = isFirstPerson;
  }
  /**
   * Calculates offset for camera
   * @param speed
   * @returns
   */
  private calcIdealOffset(speed:number, vehicle:THREE.Group) {
    const firstPersonOffset = new THREE.Vector3(0, 4, -1); //sets offset for firstPerson
    const thirdPersonOffset = new THREE.Vector3(0, 17, -30); //sets offset for thirdPerson

    return (this._isFirstPerson ? this.calcVectorsOnCarPos(firstPersonOffset, speed, vehicle) : this.calcVectorsOnCarPos(thirdPersonOffset, speed, vehicle));
  
  }
  /**
   * Calculates Lookat for camera
   * @param speed
   * @returns
   */
  private calculateIdealLookat(speed:number, vehicle:THREE.Group) {
    const firstPersonLookat = new THREE.Vector3(0, 3, 15); //sets lookat for firstPerson
    const thirdPersonLookat = new THREE.Vector3(0, 10, 20); //sets lookat for thirdPerson
    return (this._isFirstPerson ? this.calcVectorsOnCarPos(firstPersonLookat, speed, vehicle) : this.calcVectorsOnCarPos(thirdPersonLookat, speed, vehicle));
  }
  /**
   * calculates lookAt or offset relative to car position
   * @param speed
   * @param vector
   * @returns
   */
  private calcVectorsOnCarPos(vector: THREE.Vector3, speed:number, vehicle:THREE.Group) {
    if (speed < 0) {
      vector.set(vector.x, vector.y, -vector.z);
    }
    vector.applyQuaternion(vehicle.quaternion);
    vector.add(vehicle.position);
    return vector;
  }
  /**
   * Fixes camera to vehicle by updating camera position with an offset and a lookAt direction.
   * @param speed
   */
  update(speed:number, vehicle:THREE.Group) {
    
    const lerpDuration = 0.5
    const idealOffset = this.calcIdealOffset(speed, vehicle);
    const idealLookat = this.calculateIdealLookat(speed, vehicle);

    if (!this._isFirstPerson) {
      this._currentCameraPos.lerp(idealOffset, lerpDuration);
      this._currentCameraLookAt.lerp(idealLookat, lerpDuration);
    } else {
      this._currentCameraPos.copy(idealOffset);
      this._currentCameraLookAt.copy(idealLookat);
    }
    this._camera.position.copy(this._currentCameraPos);
    this._camera.lookAt(this._currentCameraLookAt);

  }
  /**
   * Boolean shows which camera is active in order to switch it.
   */
  switchPerspective() {
    this._isFirstPerson = !this._isFirstPerson;
  }
}
