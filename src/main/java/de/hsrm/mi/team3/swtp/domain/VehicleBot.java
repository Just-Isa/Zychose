package de.hsrm.mi.team3.swtp.domain;

import java.util.ArrayDeque;
import java.util.Deque;
import java.util.Map;
import java.util.Random;

public class VehicleBot {

  private VehicleBehaviour behaviour = VehicleBehaviour.DEFENSIVE;
  private int[] currentPos = {0, 0};
  private int currentRotation = 0;
  private StreetBlock currentStreetBlock;
  private Map<VehicleNeighbour, StreetBlock> neighbours;
  private Room room;
  private VehicleType vehicleType;
  private boolean fixRoute;
  private Deque<Character> scriptRoute = new ArrayDeque<>();
  private Random randomGenerator = new Random();

  public VehicleBot(Room room) {
    this.room = room;
    // choose random Model from VehicleType Enum
    int randomNumber = randomGenerator.nextInt(VehicleType.values().length);
    this.vehicleType = VehicleType.values()[randomNumber];
    setCurrentStreetBlock();
  }

  public void moveToNextBlock() {
    refreshNeighbours();
    StreetBlock destination = this.neighbours.get(VehicleNeighbour.VEHICLETOP);
    if (destination == null) {
      // TODO kein Anschlussteil vorhanden -> U-Wende?
    } else if (!destination.isBlocked()) {
      this.currentStreetBlock.isBlocked(false);
      this.currentPos[0] = destination.getTilePosition()[1] + 1;
      this.currentPos[1] = destination.getTilePosition()[0] + 1;
      destination.isBlocked(true);
      this.currentStreetBlock = destination;
    }
    // warten bis Kachel frei
  }

  /**
   * @param rotation ist die Rotationsstufe, auf die sich das Fahrzeug drehen soll
   */
  public void turn(int rotation) {
    this.setCurrentRotation(rotation);
    moveToNextBlock();
  }

  private void turnRandom(int[] exits) {
    int randomNumber = randomGenerator.nextInt(exits.length - 1);
    turn(this.getCurrentStreetBlock().getExits()[randomNumber]);
  }

  private void followScript() {
    switch (this.scriptRoute.peek()) {
      case 's':
        moveToNextBlock();
        break;

      case 'l':
        turn(this.currentRotation < 90 ? 270 : this.currentRotation - 90);
        break;

      case 'r':
        turn(this.currentRotation > 270 ? 0 : this.currentRotation + 90);
        break;

      default:
        this.fixRoute = false;
    }
    this.scriptRoute.pop();
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
    for (int i = 0; i < route.length; i++) {
      this.scriptRoute.push(route[i]);
    }
  }

  public void removeFixRoute() {
    this.fixRoute = false;
    this.scriptRoute.clear();
  }

  public boolean hasFixRoute() {
    return this.fixRoute;
  }

  public void setCurrentStreetBlock() {
    this.currentStreetBlock =
        this.room.getRoadMap().getStreetBlock(this.currentPos[0] - 1, this.currentPos[1] - 1);
  }

  public StreetBlock getCurrentStreetBlock() {
    return this.currentStreetBlock;
  }
}
