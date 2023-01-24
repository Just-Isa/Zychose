package de.hsrm.mi.team3.swtp.domain;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Deque;
import java.util.List;
import java.util.Map;
import java.util.Random;

public class VehicleBot {

  private VehicleBehaviour behaviour = VehicleBehaviour.DEFENSIVE;
  private int[] currentPos;
  private int currentRotation;
  private Map<VehicleNeighbour, StreetBlock> neighbours;
  private Room room = null;

  private StreetBlock currentStreetBlock;
  private VehicleType vehicleType;
  private boolean fixRoute;
  // TODO passt python liste auch in deque??
  private Deque<Character> scriptRoute = new ArrayDeque<>();
  private List<Character> route;
  private Random randomGenerator = new Random();

  public VehicleBot(Room room) {
    this.room = room;
    this.route = new ArrayList<>();
    this.currentPos = new int[] {0, 0};
    this.currentRotation = 0;
    // choose random Model from VehicleType Enum
    int randomNumber = randomGenerator.nextInt(VehicleType.values().length);
    this.vehicleType = VehicleType.values()[randomNumber];
    setCurrentStreetBlock();
  }

  public void moveToNextBlock() {
    refreshNeighbours();
    StreetBlock destination = this.neighbours.get(VehicleNeighbour.VEHICLETOP);
    if (destination == null || this.currentStreetBlock.getBlockType().equals("road-dead-end")) {
      turn(this.currentRotation > 180 ? this.currentRotation - 180 : this.currentRotation + 180);
    } else if (!destination.isBlocked()) {
      this.currentStreetBlock.isBlocked(false);
      this.currentPos[0] = destination.getBlockPosition()[1] + 1;
      this.currentPos[1] = destination.getBlockPosition()[0] + 1;
      destination.isBlocked(true);
      this.currentStreetBlock = destination;
      // TODO aktualisiere Pos in Vehicle Liste in Room
    }
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
    // TODO verhindern dass auto 180 Grad dreht
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

  public void drive() {
    String blockName = this.currentStreetBlock.getBlockType();
    if (blockName.equals("road-t") || blockName.equals("road-cross")) {
      if (hasFixRoute()) {
        followScript();
      } else {
        turnRandom(this.currentStreetBlock.getExits());
      }
    } else if (blockName.equals("road-curve")) {
      if (this.currentStreetBlock.getExits()[0] == this.currentRotation) {
        turn(this.currentStreetBlock.getExits()[1]);
      } else {
        turn(this.currentStreetBlock.getExits()[0]);
      }
    }
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

  public void setCurrentStreetBlock() {
    this.currentStreetBlock =
        this.room.getStreetBlock(this.currentPos[0] - 1, this.currentPos[1] - 1);
  }

  public StreetBlock getCurrentStreetBlock() {
    return this.currentStreetBlock;
  }

  public boolean hasFixRoute() {
    return this.fixRoute;
  }
}
