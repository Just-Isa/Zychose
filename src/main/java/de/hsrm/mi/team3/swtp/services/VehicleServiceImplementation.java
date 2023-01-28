package de.hsrm.mi.team3.swtp.services;

import de.hsrm.mi.team3.swtp.domain.Room;
import de.hsrm.mi.team3.swtp.domain.Vehicle;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VehicleServiceImplementation implements VehicleService {

  Logger logger = LoggerFactory.getLogger(VehicleService.class);

  static final float DISTANCE = 8;
  @Autowired RoomService roomService;

  /**
   * rotates the given vehicle to the left
   *
   * @param vehicle
   */
  @Override
  public void rotateLeft(Vehicle vehicle) {
    if (vehicle.getCurrentSpeed() == 0) {
      return;
    }
    if (vehicle.getCurrentSpeed() > 0) {
      vehicle.setRotationY(vehicle.getRotationY() + Vehicle.HANDLING);
    } else {
      vehicle.setRotationY(vehicle.getRotationY() - Vehicle.HANDLING);
    }
  }

  /**
   * rotates the given vehicle to the right
   *
   * @param vehicle
   */
  @Override
  public void rotateRight(Vehicle vehicle) {
    if (vehicle.getCurrentSpeed() == 0) {
      return;
    }
    if (vehicle.getCurrentSpeed() > 0) {
      vehicle.setRotationY(vehicle.getRotationY() - Vehicle.HANDLING);
    } else {
      vehicle.setRotationY(vehicle.getRotationY() + Vehicle.HANDLING);
    }
  }

  /**
   * moves the vehicle forwards
   *
   * @param vehicle
   */
  @Override
  public void moveForward(Vehicle vehicle, Room room) {
    if (vehicle.getCurrentSpeed() < 0) {
      calculateSpeed(vehicle, Vehicle.BRAKE_SPEED);
    } else {
      calculateSpeed(vehicle, Vehicle.ACCELERATION);
    }
    move(vehicle, room);
  }

  /**
   * moves the vehicle backwards
   *
   * @param vehicle
   */
  @Override
  public void moveBackward(Vehicle vehicle, Room room) {
    if (vehicle.getCurrentSpeed() > 0) {
      calculateSpeed(vehicle, -Vehicle.BRAKE_SPEED);
    } else {
      calculateSpeed(vehicle, -Vehicle.ACCELERATION);
    }
    move(vehicle, room);
  }

  /**
   * lets the vehicle roll out with the speed it still has
   *
   * @param vehicle
   */
  @Override
  public void carRunOutSpeed(Vehicle vehicle, Room room) {
    if (vehicle.getCurrentSpeed() > 0) {
      double newSpeed = Math.round(this.accelerate(vehicle, Vehicle.RUN_OUT_SPEED) * 1000) / 1000.0;
      if (newSpeed < 0.00001) {
        vehicle.setCurrentSpeed(0);
      } else {
        vehicle.setCurrentSpeed(newSpeed);
      }
    } else if (vehicle.getCurrentSpeed() < 0) {
      double newSpeed =
          Math.round(this.accelerate(vehicle, -Vehicle.RUN_OUT_SPEED) * 1000) / 1000.0;
      if (newSpeed > -0.00001) {
        vehicle.setCurrentSpeed(0);
      } else {
        vehicle.setCurrentSpeed(newSpeed);
      }
    }
    move(vehicle, room);
  }

  /**
   * calculates and sets the new position of the car
   *
   * @param vehicle
   */
  private void move(Vehicle vehicle, Room room) {
    double[] moveTo = {0, 0, 0};
    moveTo[0] =
        (DISTANCE * vehicle.getCurrentSpeed() * Math.sin(vehicle.getRotationY()))
            + vehicle.getPosX();
    moveTo[2] =
        (DISTANCE * vehicle.getCurrentSpeed() * Math.cos(vehicle.getRotationY()))
            + vehicle.getPosZ();

    checkCollosion(vehicle, moveTo, room);

    vehicle.setPosX(moveTo[0]);
    vehicle.setPosZ(moveTo[2]);
  }

  /**
   * calculates the speed of the vehicle
   *
   * @param vehicle
   * @param acceleration
   */
  private void calculateSpeed(Vehicle vehicle, double acceleration) {
    double newSpeed = accelerate(vehicle, acceleration);

    if (Math.abs(newSpeed) >= Vehicle.MAX_SPEED) {
      if (acceleration < 0) {
        vehicle.setCurrentSpeed(-Vehicle.MAX_SPEED);
      } else {
        vehicle.setCurrentSpeed(Vehicle.MAX_SPEED);
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
   * @return new speed of vehicle (double)
   */
  private double accelerate(Vehicle vehicle, double acceleration) {
    return vehicle.getCurrentSpeed() + acceleration;
  }

  /**
   * checks if the vehicle collides with something
   *
   * @param vehicle
   * @param moveTo
   * @param room
   */
  private void checkCollosion(Vehicle vehicle, double[] moveTo, Room room) {
    checkPlayerVehicleCollosion(vehicle, moveTo, room);
    // TODO: check other collisions
  }

  /**
   * checks if the vehicle collides with another Player vehicle
   *
   * @param vehicle
   * @param moveTo
   * @param room
   */
  private void checkPlayerVehicleCollosion(Vehicle vehicle, double[] moveTo, Room room) {
    List<Vehicle> vehicles = roomService.getVehicleList(room);
    for (Vehicle v : vehicles) {
      if (v != vehicle) {
        double distance =
            Math.sqrt(Math.pow(moveTo[0] - v.getPosX(), 2) + Math.pow(moveTo[2] - v.getPosZ(), 2));
        if (distance < (vehicle.COLLISION_WIDTH + v.COLLISION_WIDTH)) {

          double moveOtherX =
              ((DISTANCE * 2) * vehicle.getCurrentSpeed() * Math.sin(vehicle.getRotationY()))
                  + v.getPosX();
          double moveOtherZ =
              ((DISTANCE * 2) * vehicle.getCurrentSpeed() * Math.cos(vehicle.getRotationY()))
                  + v.getPosZ();
          v.setPosX(moveOtherX);
          v.setPosZ(moveOtherZ);

          vehicle.setCurrentSpeed(0);
        }
      }
    }
  }
}
