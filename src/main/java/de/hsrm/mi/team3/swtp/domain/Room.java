package de.hsrm.mi.team3.swtp.domain;

import java.io.StringWriter;
import java.util.ArrayList;
import java.util.List;

import org.python.core.PyException;
import org.python.core.PyObject;
import org.python.util.PythonInterpreter;
import org.python.util.jython;
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

  public Room(int roomNumber) {
    this.roomName = "default-name";
    this.roomNumber = roomNumber;
    this.userList = new ArrayList<User>();
    this.jythonScript = "";
    this.roomMap = "";
  }

  public Room(String roomName, int roomNumber) {
    this.roomName = roomName;
    this.roomNumber = roomNumber;
    this.userList = new ArrayList<User>();
    this.jythonScript = "";
    this.roomMap = "";
  }

  /**
   * executes the uploaded python script
   */
  public void executeJython() {
    try (PythonInterpreter pyInterp = new PythonInterpreter()) {
      StringWriter output = new StringWriter();
      pyInterp.setOut(output);
      if (!jythonScript.isBlank()) {
        // macht den Raum im python-Skript abrufbar unter dem Variablennamen
        // "currentRoom"
        pyInterp.set("currentRoom", this);
        pyInterp.exec(jythonScript);
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

  public Roadmap getRoomMap() {
    return this.roadMap;
  }

  public String getRoomMapString() {
    return this.roomMap;
  }

  public void setUserList(List<User> userList) {
    this.userList = userList;
  }
}
