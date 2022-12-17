export interface ICar {
  direction: THREE.Vector3;
  destination: THREE.Vector3;
  speed: number;
  maxspeed: number;
  handling: number;
  slowing: number;
  acceleration: number;
  car: THREE.Group;

  handelCar(): void;
}
