package de.hsrm.mi.team3.swtp.services;

import de.hsrm.mi.team3.swtp.domain.Room;
import de.hsrm.mi.team3.swtp.domain.RoomBox;
import de.hsrm.mi.team3.swtp.domain.User;
import java.util.Map;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Service;

/** implementation of RoomBoxService */
@Service
public class RoomBoxServiceImplementation implements RoomBoxService {

  Logger logger = LoggerFactory.getLogger(RoomBoxServiceImplementation.class);
  ApplicationContext applicationContext = new ClassPathXmlApplicationContext("scopes.xml");

  /**
   * determines next room number
   *
   * @return next valid room number
   */
  public int nextRoomNumber() {
    RoomBox roomBox = getRoomBoxSingelton();
    return roomBox.getRooms().size() + 1;
  }

  /**
   * checks if room already exists or creates new room
   *
   * @return existing or new room
   */
  public Room addRoom() {
    RoomBox roomBox = getRoomBoxSingelton();
    int newRoomNumber = this.nextRoomNumber();
    logger.info("-------" + newRoomNumber + "---------");
    roomBox.addRoom(newRoomNumber, new Room(newRoomNumber));
    return this.getRoomsFromRoomBox().get(newRoomNumber);
  }

  /**
   * checks if room number is already taken
   *
   * @param roomNumber requested room number
   * @return true or false
   */
  public boolean roomExistsByNumber(int roomNumber) {
    RoomBox roomBox = getRoomBoxSingelton();
    Room room = roomBox.getRooms().get(roomNumber);
    if (room != null) {
      return true;
    }
    return false;
  }

  /**
   * get map with all existing romms
   *
   * @return map with all existing romms
   */
  @Override
  public Map<Integer, Room> getRoomsFromRoomBox() {
    RoomBox roomBox = getRoomBoxSingelton();
    return roomBox.getRooms();
  }

  /**
   * get room by roomnumber
   *
   * @param roomNumber requested room number
   * @return requested room according to roomnumber
   */
  public Room getSpecificRoom(int roomNumber) {
    return this.getRoomsFromRoomBox().get(roomNumber);
  }

  /** clears the roombox */
  public void clearRoombox() {
    RoomBox roomBox = getRoomBoxSingelton();
    roomBox.getRooms().clear();
  }

  /**
   * get RoomBox Singelton instance
   *
   * @return RoomBox Singelton
   */
  public RoomBox getRoomBoxSingelton() {
    return (RoomBox) applicationContext.getBean("roomBoxSingleton");
  }

  /**
   * @param sessionID SessionID of wanted User
   * @return Either the User with the given SessionID or null if not present
   */
  public Optional<User> getUserBySessionID(String sessionID) {
    Optional<User> userOpt = Optional.empty();
    for (Room room : this.getRoomsFromRoomBox().values()) {
      for (User user : room.getUserList()) {
        if (user.getSessionID().contains(sessionID)) {
          userOpt = Optional.of(user);
        }
      }
    }
    return userOpt;
  }
}
