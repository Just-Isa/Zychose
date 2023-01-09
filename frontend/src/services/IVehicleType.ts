export interface IVehicleType {
  name: string;
  iconPath: string;
}

/**
 * @param name name of the vehicle
 * @param iconPath path for linking the picture/icon
 */
export class VehicleType implements IVehicleType {
  name = "";
  iconPath = "";

  constructor(name: string, iconPath: string) {
    this.name = name;
    this.iconPath = iconPath;
  }
}
