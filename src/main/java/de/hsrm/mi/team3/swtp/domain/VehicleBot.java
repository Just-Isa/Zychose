package de.hsrm.mi.team3.swtp.domain;

import java.util.Map;

public class VehicleBot {

  private VehicleBehaviour behaviour = VehicleBehaviour.DEFENSIVE;
  private int[] currentPos = { 0, 0 };
  private int currentRotation = 0;
  private Map<VehicleNeighbour, Tile> neighbours;
  private Room room;

  public VehicleBot(int[] positon, int rotation, VehicleBehaviour behaviour, Room room) {
    this.currentPos = positon;
    this.currentRotation = rotation;
    this.behaviour = behaviour;
    this.room = room;
  }

  public VehicleBot(int[] positon, int rotation, Room room) {
    this.currentPos = positon;
    this.currentRotation = rotation;
    this.room = room;
  }

  public void moveToNextTile() {
    refreshNeighbours();
    Tile destination = this.neighbours.get(VehicleNeighbour.VEHICLETOP);
    if (destination == null) {
      // kein Anschlussteil vorhanden -> U-Wende?
    } else if (destination.isBlocked()) {
      // warten
    } else {
      this.currentPos[0] = destination.getTilePosition()[0];
      this.currentPos[1] = destination.getTilePosition()[1];
    }
  }

  /**
   * @param rotation ist die Rotationsstufe, auf die sich das Fahrzeug drehen soll
   */
  public void turn(int rotation) {
    this.setCurrentRotation(rotation);
    moveToNextTile();
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

  public void refreshNeighbours() {
    this.neighbours = this.room
        .getRoomMap()
        .getNeighbours(this.currentPos[0], this.currentPos[1], this.currentRotation);
  }
}
