package de.hsrm.mi.team3.swtp.domain;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

public class VehicleBot {

  private VehicleBehaviour behaviour = VehicleBehaviour.DEFENSIVE;
  private int[] currentPos;
  private int currentRotation;
  private Map<VehicleNeighbour, StreetBlock> neighbours;
  private Room room = null;
  private List<Character> route;

  /*
   * TODO EINEN geeigneten Konstruktor überlegen
   *
   * public VehicleBot(int[] positon, int rotation, VehicleBehaviour behaviour,
   * Room room) {
   * this.currentPos = positon;
   * this.currentRotation = rotation;
   * this.behaviour = behaviour;
   * this.room = room;
   * }
   */

  /*
   * public VehicleBot(int[] positon, int rotation, Room room) {
   * this.currentPos = positon;
   * this.currentRotation = rotation;
   * this.room = room;
   * }
   */

  public VehicleBot(Room room) {
    this.room = room;
    this.route = new ArrayList<>();
    this.currentPos = new int[] {0, 0};
    this.currentRotation = 0;
  }

  public void moveToNextTile() {
    refreshNeighbours();
    StreetBlock destination = this.neighbours.get(VehicleNeighbour.VEHICLETOP);
    if (destination == null) {
      // kein Anschlussteil vorhanden -> U-Wende?
    } else if (destination.isBlocked()) {
      // TODO warten
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

  public List<Character> getRoute() {
    return route;
  }

  public void setRoute(List<Character> route) {
    this.route = route;
  }

  public int[] getCurrentPos() {
    return currentPos;
  }

  public void setCurrentPos(int[] currentPos) {
    this.currentPos = currentPos;
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
    this.neighbours =
        this.room
            .getRoomMap()
            .getNeighbours(this.currentPos[0], this.currentPos[1], this.currentRotation);
  }

  @Override
  public String toString() {
    return "VehicleBot [behaviour="
        + behaviour
        + ", currentPos="
        + Arrays.toString(currentPos)
        + ", currentRotation="
        + currentRotation
        + ", room="
        + room
        + ", route="
        + route
        + "]";
  }
}
