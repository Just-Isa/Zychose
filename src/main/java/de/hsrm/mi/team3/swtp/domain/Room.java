package de.hsrm.mi.team3.swtp.domain;

import java.io.StringWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.python.core.PyException;
import org.python.util.PythonInterpreter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/*
 * Room class that is used within the RoomBox.
 * This class has two different constructors.
 *
 * Room enthaelt zusaetzlich zum roomMap String auch eine Instanz der RoadMap (Tile Array),
 * um globale Sicht der Fahrzeuge zu verhindern
 */

public class Room {

  Logger logger = LoggerFactory.getLogger(Room.class);

  private String roomName;
  private int roomNumber;
  private List<User> userList;
  private String jythonScript;
  private Roadmap roadMap;
  private String roomMap;
  private List<VehicleBot> vehicleBots;

  public Room(int roomNumber) {
    this.roomName = "default-name";
    this.roomNumber = roomNumber;
    this.userList = new ArrayList<>();
    this.jythonScript = "";
    this.roomMap = "";
    this.vehicleBots = new ArrayList<>();
  }

  public Room(String roomName, int roomNumber) {
    this.roomName = roomName;
    this.roomNumber = roomNumber;
    this.userList = new ArrayList<>();
    this.jythonScript = "";
    this.roomMap = "";
    this.vehicleBots = new ArrayList<>();
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

  public String getRoomName() {
    return roomName;
  }

  public void setRoomName(String roomName) {
    this.roomName = roomName;
  }

  public List<User> getUserList() {
    return userList;
  }

  public void setUserList(List<User> userList) {
    this.userList = userList;
  }

  public void addUserToList(User user) {
    this.userList.add(user);
  }

  public void removeUserFromList(User user) {
    this.userList.remove(user);
  }

  public int getRoomNumber() {
    return roomNumber;
  }

  public void setRoomNumber(int roomNumber) {
    this.roomNumber = roomNumber;
  }

  public String getJythonScript() {
    return jythonScript;
  }

  public void setJythonScript(String jythonScript) {
    this.jythonScript = jythonScript;
    // TODO executeJython muss hier noch raus
    this.executeJython();
  }

  public void setRoomMap(String map) {
    // setzt vorerst beide Werte, spaeter anpassen
    this.roadMap = new Roadmap(map);
    this.roomMap = map;
  }

  public Roadmap getRoadMap() {
    return this.roadMap;
  }

  public String getRoomMap() {
    return this.roomMap;
  }

  public List<VehicleBot> getVehicleBots() {
    return vehicleBots;
  }

  public void setVehicleBots(List<VehicleBot> vehicleBots) {
    this.vehicleBots = vehicleBots;
  }

  public void updateVehicleBots(VehicleBot bot, int x, int y) {
    for (VehicleBot botvehicle : this.vehicleBots) {
      if (botvehicle.equals(bot)) {
        this.roadMap
            .getStreetBlock(botvehicle.getCurrentPos()[0], botvehicle.getCurrentPos()[1])
            .isBlocked(false);
        botvehicle.setCurrentPos(x, y);
        this.roadMap.getStreetBlock(x, y).isBlocked(true);
      }
    }
  }

  public StreetBlock getStreetBlock(int x, int y) {
    return this.roadMap.getStreetBlock(x, y);
  }

  public Map<VehicleNeighbour, StreetBlock> getNeighbours(int x, int y, int rotation) {
    return this.roadMap.getNeighbours(x, y, rotation);
  }
}
