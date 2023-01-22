package de.hsrm.mi.team3.swtp.domain;

import java.util.Arrays;
import java.util.Map;
import java.util.Random;

public class VehicleBot {

  private VehicleBehaviour behaviour = VehicleBehaviour.DEFENSIVE;
  private int[] currentPos = {0, 0};
  private int currentRotation = 0;
  private Map<VehicleNeighbour, StreetBlock> neighbours;
  private Room room;
  private VehicleType vehicleType;
  private boolean fixRoute;
  private char[] scriptRoute;

  public VehicleBot(Room room) {
    this.room = room;
    // choose random Model from VehicleType Enum
    int randomNumber = new Random().nextInt(VehicleType.values().length);
    this.vehicleType = VehicleType.values()[randomNumber];
  }

  public void moveToNextBlock() {
    refreshNeighbours();
    StreetBlock destination = this.neighbours.get(VehicleNeighbour.VEHICLETOP);
    if (destination == null) {
      // TODO kein Anschlussteil vorhanden -> U-Wende?
    } else if (!destination.isBlocked()) {
      this.room
          .getRoadMap()
          .getStreetBlock(this.getCurrentX() - 1, this.getCurrentY() - 1)
          .isBlocked(false);
      this.currentPos[0] = destination.getTilePosition()[1] + 1;
      this.currentPos[1] = destination.getTilePosition()[0] + 1;
      destination.isBlocked(true);
    }
    // warten bis Kachel frei
  }

  /**
   * @param rotation ist die Rotationsstufe, auf die sich das Fahrzeug drehen soll
   */
  public void turn(int rotation) {
    if (!this.hasFixRoute()) {
      // TODO Fahrzeug entscheidet zufaellig ob es abbiegt
      this.setCurrentRotation(rotation);
      moveToNextBlock();
    } else {
      // TODO follow fixRoute
    }
  }

  public int getCurrentX() {
    return this.currentPos[0];
  }

  public void setCurrentX(int x) {
    this.currentPos[0] = x;
  }

  public int getCurrentY() {
    return this.currentPos[1];
  }

  public void setCurrentY(int y) {
    this.currentPos[1] = y;
  }

  public int getCurrentRotation() {
    return this.currentRotation;
  }

  public void setCurrentRotation(int rotation) {
    this.currentRotation = rotation;
  }

  public VehicleBehaviour getBehaviour() {
    return this.behaviour;
  }

  public void setBehaviour(VehicleBehaviour behave) {
    this.behaviour = behave;
  }

  public VehicleType getVehicleModel() {
    return this.vehicleType;
  }

  public void setVehicleModel(VehicleType model) {
    this.vehicleType = model;
  }

  public void refreshNeighbours() {
    this.neighbours =
        this.room
            .getRoadMap()
            .getNeighbours(this.currentPos[0] - 1, this.currentPos[1] - 1, this.currentRotation);
  }

  public void setFixRoute(char[] route) {
    this.fixRoute = true;
    this.scriptRoute = Arrays.copyOf(route, route.length);
  }

  public void removeFixRoute() {
    this.fixRoute = false;
    this.scriptRoute = new char[] {};
  }

  public boolean hasFixRoute() {
    return this.fixRoute;
  }
}
