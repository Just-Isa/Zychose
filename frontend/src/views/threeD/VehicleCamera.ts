import * as THREE from "three";
import config from "../../../../swtp.config.json";

export class VehicleCameraContext {
  private states: CameraState[];
  private currentStateCount = 0;
  constructor(camera: THREE.PerspectiveCamera) {
    this.states = [new FirstPersonState(camera), new ThirdPersonState(camera)];
  }

  /**
   * fullfills the updateMethode of the current cameraState
   * @param speed
   * @param vehicle
   */
  request(speed: number, vehicleType: string, vehicle: THREE.Group) {
    this.states[this.currentStateCount].update(speed, vehicleType, vehicle);
  }
  /**
   * switches the camera state
   */
  switchCameraState() {
    this.currentStateCount = (this.currentStateCount + 1) % 2;
  }
}

abstract class CameraState {
  protected _currentCameraPos = new THREE.Vector3();
  protected _currentCameraLookAt = new THREE.Vector3();
  protected _camera: THREE.PerspectiveCamera;

  constructor(camera: THREE.PerspectiveCamera) {
    this._camera = camera;
  }

  /**
   * Fixes camera to vehicle by updating camera position with an offset and a lookAt direction.
   * @param vehicleSpeed
   */
  public abstract update(
    vehicleSpeed: number,
    vehicleType: string,
    vehicle: THREE.Group
  ): void;

  /**
   * calculates lookAt or offset relative to vehicle position
   * @param vehicleSpeed
   * @param vector
   * @returns vector
   */
  protected calcVectorsOfVehiclePos(
    vector: THREE.Vector3,
    vehicleSpeed: number,
    vehicle: THREE.Group
  ) {
    if (vehicleSpeed < 0) {
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
   * @param vehicleSpeed
   */
  public update(
    vehicleSpeed: number,
    vehicleType: string,
    vehicle: THREE.Group
  ): void {
    const offset = config.allVehicleTypes.find((v) => v.name === vehicleType)
      ?.firstPersonCameraOffset as number[];

    const lookAt = config.allVehicleTypes.find((v) => v.name === vehicleType)
      ?.firstPersonCameraLookat as number[];

    const idealOffset = super.calcVectorsOfVehiclePos(
      new THREE.Vector3(offset[0], offset[1], offset[2]), //vector for camera offset in relation to vehicle
      vehicleSpeed,
      vehicle
    );
    const idealLookat = super.calcVectorsOfVehiclePos(
      new THREE.Vector3(lookAt[0], lookAt[1], lookAt[2]), //vector for camera lookat in relation to vehicle
      vehicleSpeed,
      vehicle
    );

    this._currentCameraPos.copy(idealOffset);
    this._currentCameraLookAt.copy(idealLookat);

    this._camera.position.copy(this._currentCameraPos);
    this._camera.lookAt(this._currentCameraLookAt);
  }
}

class ThirdPersonState extends CameraState {
  _prevVehicleSpeed = 0;
  /**
   * Fixes camera to vehicle by updating camera position with an offset and a lookAt direction.
   * @param vehicleSpeed
   */
  public update(
    vehicleSpeed: number,
    vehicleType: string,
    vehicle: THREE.Group
  ): void {
    const offset = config.allVehicleTypes.find((v) => v.name === vehicleType)
      ?.thirdPersonCameraOffset as number[];
    const idealOffset = super.calcVectorsOfVehiclePos(
      new THREE.Vector3(offset[0], offset[1], offset[2]), //vector for camera offset in relation to vehicle
      vehicleSpeed,
      vehicle
    );
    const lookAt = config.allVehicleTypes.find((v) => v.name === vehicleType)
      ?.thridPersonCameraLookat as number[];

    const idealLookat = super.calcVectorsOfVehiclePos(
      new THREE.Vector3(lookAt[0], lookAt[1], lookAt[2]), //vector for camera lookat in relation to vehicle
      vehicleSpeed,
      vehicle
    );

    let lerpDuration = 0.1;
    if (
      (this._prevVehicleSpeed < 0 && vehicleSpeed > 0) ||
      (this._prevVehicleSpeed > 0 && vehicleSpeed < 0) ||
      vehicleSpeed === 0
    ) {
      lerpDuration = 1;
    }
    this._currentCameraPos.lerp(idealOffset, lerpDuration);
    this._currentCameraLookAt.lerp(idealLookat, lerpDuration);

    this._camera.position.copy(this._currentCameraPos);
    this._camera.lookAt(this._currentCameraLookAt);
    this._prevVehicleSpeed = vehicleSpeed;
  }
}
