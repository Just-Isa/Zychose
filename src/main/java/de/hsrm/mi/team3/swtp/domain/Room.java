package de.hsrm.mi.team3.swtp.domain;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/*
 * Room class that is used within the RoomBox.
 * This class has two different constructors.
 *
 * Room enthaelt zusaetzlich zum roomMap String auch eine Instanz der RoadMap (Tile Array),
 * um globale Sicht der Fahrzeuge zu verhindern
 */
public class Room {

  private String roomName;
  private int roomNumber;
  private List<User> userList;
  private String jythonScript;
  private Roadmap roadMap;
  private String roomMap;

  public Room(int roomNumber) {
    this.roomName = "default-name";
    this.roomNumber = roomNumber;
    this.userList = new ArrayList<>();
    this.jythonScript = "";
    this.roomMap = "";
  }

  public Room(String roomName, int roomNumber) {
    this.roomName = roomName;
    this.roomNumber = roomNumber;
    this.userList = new ArrayList<>();
    this.jythonScript = "";
    this.roomMap = "";
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

  public StreetBlock getStreetBlock(int x, int y) {
    return this.roadMap.getStreetBlock(x, y);
  }

  public void setUserList(List<User> userList) {
    this.userList = userList;
  }

  public Map<VehicleNeighbour, StreetBlock> getNeighbours(int x, int y, int rotation) {
    return this.roadMap.getNeighbours(x, y, rotation);
  }
}
