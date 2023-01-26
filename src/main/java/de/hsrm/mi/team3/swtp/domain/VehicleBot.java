package de.hsrm.mi.team3.swtp.domain;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Deque;
import java.util.List;
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
  private Deque<Character> scriptRoute = new ArrayDeque<>();
  private List<Character> route;
  private Random randomGenerator = new Random();

  public VehicleBot(Room room) {
    String id = Integer.toString(room.getVehicleBots().size() + 1);
    this.id = "bot-" + id;
    this.room = room;
    this.route = new ArrayList<>();
    this.currentPos = new int[] { 0, 0 };
    this.currentRotation = 0;
    // choose random Model from VehicleType Enum
    int randomNumber = randomGenerator.nextInt(VehicleType.values().length);
    this.vehicleType = VehicleType.values()[randomNumber];
    // setCurrentStreetBlock();
  }

  /**
   * Moves VehicleBot to StreetBlock right in front of it. Has to be called after
   * rotation change
   */
  public void moveToNextBlock() {
    refreshNeighbours();
    StreetBlock destination = this.neighbours.get(VehicleNeighbour.VEHICLETOP);
    if (destination == null || this.currentStreetBlock.getBlockType().contains("dead-end")) {
      turn(this.currentRotation > 180 ? this.currentRotation - 180 : this.currentRotation + 180);
    } else if (!destination.isBlocked() && !isStreetblockInvalid(destination.getBlockType())) {
      this.currentPos[0] = destination.getBlockPosition()[1] + 1;
      this.currentPos[1] = destination.getBlockPosition()[0] + 1;
      this.currentStreetBlock = destination;
    } else if (!isStreetblockInvalid(destination.getBlockType())) {
      int rotation = this.room.getVehicleBotRotation(this.getCurrentPos()[0], this.getCurrentPos()[1]);
      if (rotation == -1) {
        destination.isBlocked(false);
        moveToNextBlock();
      } else if (rotation != this.currentRotation) {
        moveToNextBlock();
      }
    } // else delete Bot?
  }

  /**
   * @param rotation direction to which VehicleBot should turn
   */
  public void turn(int rotation) {
    this.setCurrentRotation(rotation);
    moveToNextBlock();
  }

  /**
   * @param exits Integer Array with directions of all valid exits of current
   *              StreetBlock
   */
  public void turnRandom(int[] exits) {
    int randomNumber = randomGenerator.nextInt(exits.length - 1);
    int ownExit = this.currentRotation > 90 ? this.currentRotation - 180 : this.currentRotation + 180;
    while (randomNumber == ownExit) {
      randomNumber = randomGenerator.nextInt(exits.length - 1);
    }
    turn(this.getCurrentStreetBlock().getExits()[randomNumber]);
  }

  /**
   * Is called on T- or Crossraods if VehicleBot got a set route. Follows
   * direction of first list
   * element
   */
  public void followScript() {
    char direction = this.route.get(0);
    switch (direction) {
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
    this.route.remove(0);
  }

  public boolean isStreetblockInvalid(String blockName) {
    return (this.vehicleType.equals(VehicleType.BICYCLE) && blockName.startsWith("road", 0));
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

  public void setVehicleModel(VehicleType model) {
    this.vehicleType = model;
  }

  public void refreshNeighbours() {
    this.neighbours = this.room.getNeighbours(
        this.currentPos[0] - 1, this.currentPos[1] - 1, this.currentRotation);
  }

  public void removeFixRoute() {
    this.fixRoute = false;
    this.scriptRoute.clear();
  }

  public boolean hasFixRoute() {
    return this.fixRoute;
  }

  public void setCurrentStreetBlock() {
    this.currentStreetBlock = this.room.getStreetBlock(this.currentPos[0] - 1, this.currentPos[1] - 1);
    logger.info("botPos: " + this.currentPos);
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

  public Map<VehicleNeighbour, StreetBlock> getNeighbours() {
    refreshNeighbours();
    return this.neighbours;
  }
}
