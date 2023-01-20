package de.hsrm.mi.team3.swtp.domain.messaging;

import de.hsrm.mi.team3.swtp.domain.Vehicle;

/*
 * record for sending and receiving Vehicles
 */
public record BackendVehicleMessage(
    double postitionX,
    double postitionY,
    double postitionZ,
    double rotationX,
    double rotationY,
    double rotationZ,
    double speed) {

  public static BackendVehicleMessage from(Vehicle vehicle) {
    return new BackendVehicleMessage(
        vehicle.getPosVector()[0],
        vehicle.getPosVector()[1],
        vehicle.getPosVector()[2],
        vehicle.getRotationX(),
        vehicle.getRotationY(),
        vehicle.getRotationZ(),
        vehicle.getCurrentSpeed());
  }
}
