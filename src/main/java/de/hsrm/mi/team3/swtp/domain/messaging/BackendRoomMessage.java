package de.hsrm.mi.team3.swtp.domain.messaging;

import de.hsrm.mi.team3.swtp.domain.User;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

public record BackendRoomMessage(String roomName, int roomNumber, List<User> userList, MultipartFile jythonScript) {

  /**
   * @param room
   * @return
   */
  public static BackendRoomMessage from(String roomName, int roomNumber, List<User> userList,
      MultipartFile jythonScript) {
    return new BackendRoomMessage(roomName, roomNumber, userList, jythonScript);
  }
}
