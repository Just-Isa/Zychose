package de.hsrm.mi.team3.swtp.domain;

import java.util.Arrays;
import java.util.Map;
import java.util.Random;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class VehicleBot {

  Logger logger = LoggerFactory.getLogger(VehicleBot.class);

  private String id;
  private VehicleBehaviour behaviour;
  private int[] currentPos;
  private int currentRotation;
  private Map<VehicleNeighbour, StreetBlock> neighbours;
  private Room room = null;

  private StreetBlock currentStreetBlock;
  private VehicleType vehicleType;
  private boolean fixRoute;
  private String[] routeList;
  private Random randomGenerator = new Random();
  private int lastRouteIndex;

  public VehicleBot(Room room) {
    String idNumber = Integer.toString(room.getVehicleBots().size() + 1);
    this.id = "bot-" + idNumber;
    this.room = room;
    this.currentPos = new int[] {0, 0};
    this.currentRotation = 0;
    // choose random Model from VehicleType Enum
    int randomNumber = randomGenerator.nextInt(VehicleType.values().length);
    this.vehicleType = VehicleType.values()[randomNumber];
    this.lastRouteIndex = 0;
  }

  /**
   * Moves VehicleBot to StreetBlock right in front of it. Has to be called after rotation change
   */
  public void moveToNextBlock() {
    refreshNeighbours();
    StreetBlock destination = this.neighbours.get(VehicleNeighbour.VEHICLETOP);
    if (destination == null
        || (this.currentStreetBlock.getBlockType().contains("dead-end")
            && this.currentRotation != this.currentStreetBlock.getExits()[0])
        || isStreetblockInvalid(destination.getBlockType())) {
      turn(this.currentRotation >= 180 ? this.currentRotation - 180 : this.currentRotation + 180);
    } else if (!destination.isBlocked() && !isStreetblockInvalid(destination.getBlockType())) {
      changeBlock(destination);
    } else if (!isStreetblockInvalid(destination.getBlockType())) {
      int rotation =
          this.room.getVehicleBotRotation(
              destination.getBlockPosition()[0], destination.getBlockPosition()[1]);
      if (rotation == -1) {
        destination.isBlocked(false);
        changeBlock(destination);
      } else if (rotation != this.currentRotation) {
        changeBlock(destination);
      }
    }
  }

  /**
   * changes position and streetblock of VehicleBot
   *
   * @param destination
   */
  private void changeBlock(StreetBlock destination) {
    this.currentPos[0] = destination.getBlockPosition()[1] + 1;
    this.currentPos[1] = destination.getBlockPosition()[0] + 1;
    this.currentStreetBlock.isBlocked(false);
    this.currentStreetBlock = destination;
    this.currentStreetBlock.isBlocked(true);
  }

  /**
   * changes rotation of VehicleBot and calls moveToNextBlock()
   *
   * @param rotation direction to which VehicleBot should turn
   */
  public void turn(int rotation) {
    this.setCurrentRotation(rotation);
    moveToNextBlock();
  }

  /**
   * changes VehicleBot rotation at random at an intersection
   *
   * @param exits Integer Array with directions of all valid exits of current StreetBlock
   */
  public void turnRandom(int[] exits) {
    int randomNumber = randomGenerator.nextInt(exits.length - 1);
    int ownExit =
        this.currentRotation > 90 ? this.currentRotation - 180 : this.currentRotation + 180;
    while (randomNumber == ownExit) {
      randomNumber = randomGenerator.nextInt(exits.length - 1);
    }
    turn(this.getCurrentStreetBlock().getExits()[randomNumber]);
  }

  /** Is called on T- or Crossraods if VehicleBot got a fixed route. Loops over routeList */
  public void followScript() {
    String direction = this.routeList[lastRouteIndex];
    switch (direction) {
      case "s":
        moveToNextBlock();
        break;

      case "l":
        turn(this.currentRotation > 270 ? 0 : this.currentRotation + 90);
        break;

      case "r":
        turn(this.currentRotation < 90 ? 270 : this.currentRotation - 90);
        break;

      default:
        this.fixRoute = false;
    }
    lastRouteIndex = (lastRouteIndex < this.routeList.length - 1) ? (lastRouteIndex + 1) : 0;
  }

  /**
   * checks if VehicleBot can drive on StreetBlock with blockName
   *
   * @param blockName
   * @return true if VehicleBot with type "bicycle" want to drive on a road (which is invalid)
   */
  public boolean isStreetblockInvalid(String blockName) {
    return (this.vehicleType.equals(VehicleType.BICYCLE) && blockName.startsWith("road", 0));
  }

  public String[] getRoute() {
    return routeList;
  }

  public void setRoute(String[] route) {
    this.routeList = route;
    this.fixRoute = true;
  }

  public int[] getCurrentPos() {
    return currentPos;
  }

  public void setCurrentPos(int x, int y) {
    this.currentPos[0] = x;
    this.currentPos[1] = y;
    setCurrentStreetBlock();
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

  public void setVehicleType(VehicleType type) {
    this.vehicleType = type;
  }

  /** asks VehicleBots room to return VehicleBots Neighbours */
  public void refreshNeighbours() {
    this.neighbours =
        this.room.getNeighbours(
            this.currentPos[0] - 1, this.currentPos[1] - 1, this.currentRotation);
  }

  public boolean hasFixRoute() {
    return this.fixRoute;
  }

  public void setCurrentStreetBlock() {
    this.currentStreetBlock =
        this.room.getStreetBlock(this.currentPos[0] - 1, this.currentPos[1] - 1);
  }

  public StreetBlock getCurrentStreetBlock() {
    return this.currentStreetBlock;
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  @Override
  public String toString() {
    return "VehicleBot [id="
        + id
        + ", behaviour="
        + behaviour
        + ", currentPos="
        + Arrays.toString(currentPos)
        + ", currentRotation="
        + currentRotation
        + ", room="
        + room
        + ", currentStreetBlock="
        + currentStreetBlock
        + ", vehicleType="
        + vehicleType
        + ", fixRoute="
        + fixRoute
        + ", routeList="
        + Arrays.toString(routeList)
        + "]";
  }

  public Map<VehicleNeighbour, StreetBlock> getNeighbours() {
    refreshNeighbours();
    return this.neighbours;
  }
}
