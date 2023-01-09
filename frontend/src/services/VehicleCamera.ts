import * as THREE from "three";
import { useCamera } from "./useCamera";

const { camState } = useCamera();

export class VehicleCameraContext {
  private states = [new FirstPersonState(), new ThirdPersonState()];
  private curstateCount = 0;
  /**
   * fullfills the updateMethode from the current cameraState
   * @param speed
   * @param vehicle
   */
  request(speed: number, vehicle: THREE.Group) {
    this.states[this.curstateCount].update(speed, vehicle);
  }
  /**
   * switches the camera state
   */
  switchCameraState() {
    this.curstateCount = (this.curstateCount + 1) % 2;
  }
}

abstract class CameraState {
  protected _currentCameraPos = new THREE.Vector3();
  protected _currentCameraLookAt = new THREE.Vector3();
  protected _camera: THREE.PerspectiveCamera = camState.cam;

  /**
   * Fixes camera to vehicle by updating camera position with an offset and a lookAt direction.
   * @param speed
   */
  public abstract update(updatespeed: number, vehicle: THREE.Group): void;

  /**
   * calculates lookAt or offset relative to car position
   * @param speed
   * @param vector
   * @returns
   */
  protected calcVectorsOfVehiclePos(
    vector: THREE.Vector3,
    speed: number,
    vehicle: THREE.Group
  ) {
    if (speed < 0) {
      vector.set(vector.x, vector.y, -vector.z);
    }
    vector.applyQuaternion(vehicle.quaternion);
    vector.add(vehicle.position);
    return vector;
  }
}

class FirstPersonState extends CameraState {
  /**
   * Fixes camera to vehicle by updating camera position with an offset and a lookAt direction.
   * @param speed
   */
  public update(speed: number, vehicle: THREE.Group): void {
    const idealOffset = super.calcVectorsOfVehiclePos(
      new THREE.Vector3(0, 4, -1), //vector for camera offset in realtion to vehicle
      speed,
      vehicle
    );
    const idealLookat = super.calcVectorsOfVehiclePos(
      new THREE.Vector3(0, 3, 15), //vector for camera lookat in realtion to vehicle
      speed,
      vehicle
    );

    this._currentCameraPos.copy(idealOffset);
    this._currentCameraLookAt.copy(idealLookat);

    this._camera.position.copy(this._currentCameraPos);
    this._camera.lookAt(this._currentCameraLookAt);
  }
}

class ThirdPersonState extends CameraState {
  /**
   * Fixes camera to vehicle by updating camera position with an offset and a lookAt direction.
   * @param speed
   */
  public update(speed: number, vehicle: THREE.Group): void {
    const lerpDuration = 0.5;
    const idealOffset = super.calcVectorsOfVehiclePos(
      new THREE.Vector3(0, 17, -30), //vector for camera offset in realtion to vehicle
      speed,
      vehicle
    );
    const idealLookat = super.calcVectorsOfVehiclePos(
      new THREE.Vector3(0, 10, 20), //vector for camera lookat in realtion to vehicle
      speed,
      vehicle
    );

    this._currentCameraPos.lerp(idealOffset, lerpDuration);
    this._currentCameraLookAt.lerp(idealLookat, lerpDuration);

    this._camera.position.copy(this._currentCameraPos);
    this._camera.lookAt(this._currentCameraLookAt);
  }
}
