package de.hsrm.mi.team3.swtp.services;

import de.hsrm.mi.team3.swtp.domain.Vehicle;
import org.springframework.stereotype.Service;

@Service
public class VehicleServiceImplementation implements VehicleService {
  final float DISTANCE = 8;

  /**
   * rotates the given vehicle to the left
   *
   * @param vehicle
   */
  @Override
  public void rotateLeft(Vehicle vehicle) {
    if (vehicle.getCurrentSpeed() != 0) {
      vehicle.setRotationY(vehicle.getRotationY() + vehicle.getHandling());
    }
  }

  /**
   * rotates the given vehicle to the right
   *
   * @param vehicle
   */
  @Override
  public void rotateRight(Vehicle vehicle) {
    if (vehicle.getCurrentSpeed() != 0) {
      vehicle.setRotationY(vehicle.getRotationY() - vehicle.getHandling());
    }
  }

  /**
   * moves the vehicle forwards
   *
   * @param vehicle
   */
  @Override
  public void moveForward(Vehicle vehicle) {
    if (vehicle.getCurrentSpeed() < 0) {
      calculateSpeed(vehicle, vehicle.getBrakeSpeed());
    } else {
      calculateSpeed(vehicle, vehicle.getAcceleration());
    }
    move(vehicle);
  }

  /**
   * moves the vehicle backwards
   *
   * @param vehicle
   */
  @Override
  public void moveBackward(Vehicle vehicle) {
    if (vehicle.getCurrentSpeed() > 0) {
      calculateSpeed(vehicle, -vehicle.getBrakeSpeed());
    } else {
      calculateSpeed(vehicle, -vehicle.getAcceleration());
    }
    move(vehicle);
  }

  /**
   * lets the vehicle roll out with the speed it still has
   *
   * @param vehicle
   */
  @Override
  public void carRunOutSpeed(Vehicle vehicle) {
    if (vehicle.getCurrentSpeed() > 0) {
      double newSpeed = this.accelerate(vehicle, vehicle.getRunOutSpeed());
      if (newSpeed < 0) {
        vehicle.setCurrentSpeed(0);
      } else {
        vehicle.setCurrentSpeed(newSpeed);
      }
    } else if (vehicle.getCurrentSpeed() < 0) {
      double newSpeed = -this.accelerate(vehicle, vehicle.getRunOutSpeed());
      if (newSpeed > 0) {
        vehicle.setCurrentSpeed(0);
      } else {
        vehicle.setCurrentSpeed(newSpeed);
      }
    }
    move(vehicle);
  }

  /**
   * calculates and sets the new position of the car
   *
   * @param vehicle
   */
  private void move(Vehicle vehicle) {
    vehicle.setPosX(
        (DISTANCE * vehicle.getCurrentSpeed() * Math.sin(vehicle.getRotationY()))
            + vehicle.getPosX());
    vehicle.setPosZ(
        (DISTANCE * vehicle.getCurrentSpeed() * Math.cos(vehicle.getRotationY()))
            + vehicle.getPosZ());
  }

  /**
   * calculates the speed of the vehicle
   *
   * @param vehicle
   * @param acceleration
   */
  private void calculateSpeed(Vehicle vehicle, double acceleration) {
    double newSpeed = accelerate(vehicle, acceleration);

    if (Math.abs(newSpeed) >= vehicle.getMaxSpeed()) {
      if (acceleration < 0) {
        vehicle.setCurrentSpeed(-vehicle.getMaxSpeed());
      } else {
        vehicle.setCurrentSpeed(vehicle.getMaxSpeed());
      }
    } else {
      vehicle.setCurrentSpeed(newSpeed);
    }
  }

  /**
   * calculates the acceleration of the vehicle
   *
   * @param vehicle
   * @param acceleration
   * @return
   */
  private double accelerate(Vehicle vehicle, double acceleration) {
    return vehicle.getCurrentSpeed() + acceleration;
  }
}
