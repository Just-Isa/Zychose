package de.hsrm.mi.team3.swtp.domain;

import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

/*
 * Room class that is used within the RoomBox.
 * This class has two different constructors.
 */

@Getter
@Setter
public class Room {

  private String roomName;
  private int roomNumber;
  private List<User> userList;
  private String jythonScript;
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

  public void addUserToList(User user) {
    this.userList.add(user);
  }

  public void removeUserFromList(User user) {
    this.userList.remove(user);
  }
}
