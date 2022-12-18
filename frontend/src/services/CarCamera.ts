import * as THREE from "three";

export class CarCamera {
  car: THREE.Group;
  camera: THREE.PerspectiveCamera;
  curCameraPos = new THREE.Vector3();
  curCameraLookAt = new THREE.Vector3();
  isFirstPerson: boolean;

  constructor(
    car: THREE.Group,
    camera: THREE.PerspectiveCamera,
    isFirstPerson: boolean
  ) {
    this.car = car;
    this.camera = camera;
    this.isFirstPerson = isFirstPerson;
  }
  /**
   * Calculates offset for camera
   * @param speed
   * @returns
   */
  private calcIdealOffset(speed: number) {
    const firstPerson = new THREE.Vector3(0, 4, -1);
    const thirdPerson = new THREE.Vector3(0, 17, -30);

    if (this.isFirstPerson) {
      return this.calcVectors(speed, firstPerson);
    }
    return this.calcVectors(speed, thirdPerson);
  }
  /**
   * Calculates Lookat for camera
   * @param speed
   * @returns
   */
  private calculateIdealLookat(speed: number) {
    const firstPerson = new THREE.Vector3(0, 3, 15);
    const thirdPerson = new THREE.Vector3(0, 10, 20);

    if (this.isFirstPerson) {
      return this.calcVectors(speed, firstPerson);
    }
    return this.calcVectors(speed, thirdPerson);
  }
  /**
   * Formular for lookAt or offset
   * @param speed
   * @param vector
   * @returns
   */
  private calcVectors(speed: number, vector: THREE.Vector3) {
    if (speed < 0) {
      vector.set(vector.x, vector.y, -vector.z);
    }
    vector.applyQuaternion(this.car.quaternion);
    vector.add(this.car.position);
    return vector;
  }
  /**
   * Updates camera when car moves
   * @param speed
   */
  updateCamera(speed: number) {
    const idealOffset = this.calcIdealOffset(speed);
    const idealLookat = this.calculateIdealLookat(speed);
    if (!this.isFirstPerson) {
      this.curCameraPos.lerp(idealOffset, 0.5);
      this.curCameraLookAt.lerp(idealLookat, 0.5);
    } else {
      this.curCameraPos.copy(idealOffset);
      this.curCameraLookAt.copy(idealLookat);
    }
    this.camera.position.copy(this.curCameraPos);
    this.camera.lookAt(this.curCameraLookAt);
  }
  /**
   * Boolean shows which camera is active in order to switch it.
   */
  switchPerspective() {
    this.isFirstPerson = !this.isFirstPerson;
  }
}
