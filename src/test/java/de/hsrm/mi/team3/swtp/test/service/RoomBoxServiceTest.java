package de.hsrm.mi.team3.swtp.test.service;

import static org.assertj.core.api.Assertions.assertThat;

import de.hsrm.mi.team3.swtp.domain.Room;
import de.hsrm.mi.team3.swtp.domain.User;
import de.hsrm.mi.team3.swtp.services.RoomBoxService;
import de.hsrm.mi.team3.swtp.services.RoomService;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
class RoomBoxServiceTest {

  @Autowired
  RoomBoxService roomBoxService;
  @Autowired
  RoomService roomService;

  private final String SESSIONID = "session-id-test-1";
  private final int USERROOMNUMBER = 1;
  private final String USERNAME = "User-One";

  private final String SESSIONIDTWO = "session-id-test-2";
  private final int USERROOMNUMBERTWO = 1;
  private final String USERNAMETWO = "User-Two";

  private final String NOTPRESENTSESSIONID = "not-present";

  private final int ROOMBOXSIZEBEFOREADDITION = 0;
  private final int ROOMBOXSIZEAFTERADDITION = 1;

  private final int NEXTROOMNUMBERBEFOREADDITION = 1;
  private final int NEXTROOMNUMBERAFTERADDITION = 2;

  private final int ROOMNUMBERAFTERFIRSTADDITION = 1;
  private final int ROOMNUMBERAFTERSECONDADDITION = 2;

  User userOne = null;
  User userTwo = null;

  @BeforeEach
  public void benutzerprofil_init() {
    roomBoxService.clearRoombox();
    assertThat(roomBoxService).isNotNull();
    userOne = new User();
    userOne.setSessionID(SESSIONID);
    userOne.setUserName(USERNAME);
    userOne.setCurrentRoomNumber(USERROOMNUMBER);

    userTwo = new User();
    userTwo.setSessionID(SESSIONIDTWO);
    userTwo.setUserName(USERNAMETWO);
    userTwo.setCurrentRoomNumber(USERROOMNUMBERTWO);
  }

  @Test
  @DisplayName("RoomBoxService: AddRoom")
  void addRoomToRoomBox() {
    assertThat(roomBoxService.getRoomsFromRoomBox()).hasSize(ROOMBOXSIZEBEFOREADDITION);
    roomBoxService.addRoom();
    assertThat(roomBoxService.getRoomsFromRoomBox()).hasSize(ROOMBOXSIZEAFTERADDITION);
  }

  @Test
  @DisplayName("RoomBoxService: nextRoomNumber")
  void getNextRoomNumber() {
    assertThat(roomBoxService.nextRoomNumber()).isEqualTo(NEXTROOMNUMBERBEFOREADDITION);
    roomBoxService.addRoom();
    assertThat(roomBoxService.nextRoomNumber()).isEqualTo(NEXTROOMNUMBERAFTERADDITION);
  }

  @Test
  @DisplayName("RoomBoxService: getSpecificRoom")
  void getSpecificRoom() {
    Room room = roomBoxService.addRoom();
    assertThat(roomBoxService.getSpecificRoom(ROOMNUMBERAFTERFIRSTADDITION)).isEqualTo(room);
  }

  @Test
  @DisplayName("RoomBoxService: getRoomsFromRoomBox")
  void getRoomsFromRoomBox() {
    Room roomOne = roomBoxService.addRoom();
    Room roomTwo = roomBoxService.addRoom();
    Map<Integer, Room> rooms = new HashMap<Integer, Room>();
    rooms.put(ROOMNUMBERAFTERFIRSTADDITION, roomOne);
    rooms.put(ROOMNUMBERAFTERSECONDADDITION, roomTwo);
    assertThat(roomBoxService.getRoomsFromRoomBox()).isEqualTo(rooms);
  }

  @Test
  @DisplayName("Room: Get user by sessionID if room is not known and null if user with given sessionID is not present")
  void getUserFromRoomBox() {
    Room roomOne = roomBoxService.addRoom();
    roomOne.addUserToList(userOne);
    roomService.addNewUserToRoom(roomOne, userOne);

    Optional<User> getUserBySessionIdPresent = roomBoxService.getUserBySessionID(SESSIONID);
    assertThat(getUserBySessionIdPresent.isPresent()).isTrue();
    assertThat(getUserBySessionIdPresent.get()).isEqualTo(userOne);

    Optional<User> getUserBySessionIdNotPresent = roomBoxService.getUserBySessionID(NOTPRESENTSESSIONID);
    assertThat(getUserBySessionIdNotPresent.isEmpty()).isTrue();
  }
}
