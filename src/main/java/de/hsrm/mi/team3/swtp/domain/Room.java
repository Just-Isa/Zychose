package de.hsrm.mi.team3.swtp.domain;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

/*
 * Room class that is used within the RoomBox.
 * This class has two different constructors.
 */
public class Room {

  private String roomName;
  private int roomNumber;
  private List<User> userList;
  private File jythonScript;

  public Room(int roomNumber) {
    this.roomName = "default-name";
    this.roomNumber = roomNumber;
    this.userList = new ArrayList<User>();
  }

  public Room(String roomName, int roomNumber) {
    this.roomName = roomName;
    this.roomNumber = roomNumber;
    this.userList = new ArrayList<User>();
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

  public File getJythonScript() {
    return jythonScript;
  }

  public void setJythonScript(File jythonScript) {
    this.jythonScript = jythonScript;
  }
}
