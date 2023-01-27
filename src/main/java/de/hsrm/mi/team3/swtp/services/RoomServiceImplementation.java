package de.hsrm.mi.team3.swtp.services;

import de.hsrm.mi.team3.swtp.domain.Room;
import de.hsrm.mi.team3.swtp.domain.User;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class RoomServiceImplementation implements RoomService {

  Logger logger = LoggerFactory.getLogger(RoomServiceImplementation.class);

  @Autowired
  RoomBoxServiceImplementation roomBoxService;

  /**
   * This method adds a new user to a room, and changed the users
   * currentRoomNumber respectively.
   *
   * @param room
   * @param user
   */
  @Override
  public void addNewUserToRoom(Room room, User user) {
    room.addUserToList(user);
    user.setCurrentRoomNumber(room.getRoomNumber());
  }

  /**
   * This method removes a user from a room.
   *
   * @param room
   * @param user
   */
  public void removeUserFromRoom(Room room, User user) {
    room.removeUserFromList(user);
  }

  /**
   * This method provides a certain room by number.
   *
   * @param room Room of of which the userlist is required
   * @return Room
   */
  @Override
  public List<User> getUserList(Room room) {
    return room.getUserList();
  }

  @Override
  public void saveScriptToRoom(MultipartFile file, Room room) {
    try {
      room.setJythonScript(new String(file.getBytes()));
    } catch (IOException e) {
      logger.error("[RoomServiceImplementation][SaveScriptToRoom]: {}", e.getMessage());
    }
  }

  /**
   * This method provides a certain user by ID and a roomnumber.
   *
   * @param roomNumber
   * @param sessionID
   * @return User
   */
  @Override
  public Optional<User> getUserByID(int roomNumber, String sessionID) {
    Room room = roomBoxService.getSpecificRoom(roomNumber);
    return room.getUserList().stream().filter(u -> u.getSessionID().equals(sessionID)).findFirst();
  }

  /**
   * Updates Room with new Variables
   *
   * @param room         Room that is to be updated
   * @param jythonScript new jythonScript for room
   * @param roomMap      new roomMap for room
   * @param roomName     new roomName for room
   * @param roomNumber   new roomNumber for room
   * @param userList     new userList for room
   */
  public void updateRoom(
      Room room,
      String jythonScript,
      String roomMap,
      String roomName,
      int roomNumber,
      List<User> userList) {
    room.setJythonScript(jythonScript);
    room.setRoomMap(roomMap);
    room.setRoomName(roomName);
    room.setRoomNumber(roomNumber);
    room.setUserList(userList);
  }
}
