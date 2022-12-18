package de.hsrm.mi.team3.swtp.domain.messaging;

import de.hsrm.mi.team3.swtp.domain.User;
import java.util.List;

public record BackendRoomMessage(
    String roomName, int roomNumber, List<User> userList, String jythonScript) {

  /**
   * @param room
   * @return
   */
  public static BackendRoomMessage from(
      String roomName, int roomNumber, List<User> userList, String jythonScript) {
    return new BackendRoomMessage(roomName, roomNumber, userList, jythonScript);
  }
}
