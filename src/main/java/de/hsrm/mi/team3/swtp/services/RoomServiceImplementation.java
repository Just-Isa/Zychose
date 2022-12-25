package de.hsrm.mi.team3.swtp.services;

import de.hsrm.mi.team3.swtp.domain.Room;
import de.hsrm.mi.team3.swtp.domain.User;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
