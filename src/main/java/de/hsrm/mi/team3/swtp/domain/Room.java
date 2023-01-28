package de.hsrm.mi.team3.swtp.domain;

import java.io.StringWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import lombok.Getter;
import lombok.Setter;
import org.python.core.PyException;
import org.python.util.PythonInterpreter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/*
 * Room class that is used within the RoomBox.
 * This class has two different constructors.
 * Room holds RoadMap instance to prevent VehicleBots from having direct access to the map.
 */

@Getter
@Setter
public class Room {

  Logger logger = LoggerFactory.getLogger(Room.class);

  private String roomName;
  private int roomNumber;
  private List<User> userList;
  private String jythonScript;
  private Roadmap roadMap;
  private String roomMap;
  private List<VehicleBot> vehicleBots;
  private boolean jythonRunning;

  public Room(int roomNumber) {
    this.roomName = "default-name";
    this.roomNumber = roomNumber;
    this.userList = new ArrayList<>();
    this.jythonScript = "";
    this.roomMap = "";
    this.vehicleBots = new ArrayList<>();
    this.jythonRunning = false;
  }

  public Room(String roomName, int roomNumber) {
    this.roomName = roomName;
    this.roomNumber = roomNumber;
    this.userList = new ArrayList<>();
    this.jythonScript = "";
    this.roomMap = "";
    this.vehicleBots = new ArrayList<>();
    this.jythonRunning = false;
  }

  /** executes the uploaded python script */
  public void executeJython() {
    try (PythonInterpreter pyInterp = new PythonInterpreter()) {
      StringWriter output = new StringWriter();
      if (!jythonScript.isBlank()) {
        pyInterp.setOut(output);
        // macht den Raum im python-Skript abrufbar unter dem Variablennamen
        // "currentRoom"
        pyInterp.set("room", this);
        pyInterp.exec(jythonScript);
      } else {
        logger.error("leeres Skript");
      }
      logger.info("jython Output: " + output.toString());
    } catch (PyException e) {
      logger.error("ERROR jythonScript", e);
    }
  }

  public void addUserToList(User user) {
    this.userList.add(user);
  }

  public void removeUserFromList(User user) {
    this.userList.remove(user);
  }

  public void setRoomMap(String map) {
    this.roadMap = new Roadmap(map);
    this.roomMap = map;
  }

  public void setVehicleBot(VehicleBot vehicleBot) {
    this.vehicleBots.add(vehicleBot);
  }

  /*
   * public void updateVehicleBots(VehicleBot bot, int x, int y) {
   * // TODO prüfen ob x und y die gleichen positionen sind wie das in der liste
   * for (VehicleBot botvehicle : this.vehicleBots) {
   * if (botvehicle.getId().equals(bot.getId())) {
   * getStreetBlock(botvehicle.getCurrentPos()[0], botvehicle.getCurrentPos()[1])
   * .isBlocked(false);
   * botvehicle.setCurrentPos(x, y);
   * getStreetBlock(x, y).isBlocked(true);
   * }
   * }
   * }
   */

  public StreetBlock getStreetBlock(int x, int y) {
    return this.roadMap.getStreetBlock(x, y);
  }

  public Map<VehicleNeighbour, StreetBlock> getNeighbours(int x, int y, int rotation) {
    return this.roadMap.getNeighbours(x, y, rotation);
  }

  public int getVehicleBotRotation(int x, int y) {
    for (VehicleBot bot : this.vehicleBots) {
      if (bot.getCurrentPos()[0] == x && bot.getCurrentPos()[1] == y) {
        return bot.getCurrentRotation();
      }
    }
    return -1;
  }

  /*
   * public boolean isJythonRunning() {
   * return jythonRunning;
   * }
   *
   * public void setJythonRunning(boolean jythonRunning) {
   * this.jythonRunning = jythonRunning;
   * }
   */
}
