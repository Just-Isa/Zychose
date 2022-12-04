package de.hsrm.mi.team3.swtp.test.service;

import static org.assertj.core.api.Assertions.assertThat;

import de.hsrm.mi.team3.swtp.domain.Room;
import de.hsrm.mi.team3.swtp.domain.User;
import de.hsrm.mi.team3.swtp.services.RoomService;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
class RoomServiceTest {

  @Autowired RoomService roomService;

  private final String ROOMNAME = "RoomName";
  private final int ROOMNUMBER = 1;

  private final String SESSIONID = "session-id-test-1";
  private final int USERROOMNUMBER = 1;
  private final String USERNAME = "User-One";

  private final String SESSIONIDTWO = "session-id-test-2";
  private final int USERROOMNUMBERTWO = 1;
  private final String USERNAMETWO = "User-Two";

  private final int USERLISTSIZEBEFOREADDITION = 0;
  private final int USERLISTSIZEMIDADDITON = 1;
  private final int USERLISTSIZEAFTERADDITION = 2;

  User userOne = null;
  User userTwo = null;

  Room roomOne = null;

  @BeforeEach
  public void benutzerprofil_init() {
    assertThat(roomService).isNotNull();
    userOne = new User();
    userOne.setSessionID(SESSIONID);
    userOne.setUserName(USERNAME);
    userOne.setCurrentRoomNumber(USERROOMNUMBER);

    userTwo = new User();
    userTwo.setSessionID(SESSIONIDTWO);
    userTwo.setUserName(USERNAMETWO);
    userTwo.setCurrentRoomNumber(USERROOMNUMBERTWO);

    roomOne = new Room(ROOMNAME, ROOMNUMBER);
  }

  @Test
  @DisplayName("Room: User present in Room after adding")
  public void roomAddUser() {
    assertThat(roomService.getUserList(roomOne).size()).isEqualTo(USERLISTSIZEBEFOREADDITION);
    roomService.addNewUserToRoom(roomOne, userOne);
    assertThat(roomService.getUserList(roomOne)).containsExactlyElementsOf(List.of(userOne));

    assertThat(roomService.getUserList(roomOne).size()).isEqualTo(USERLISTSIZEMIDADDITON);
    roomService.addNewUserToRoom(roomOne, userTwo);
    assertThat(roomService.getUserList(roomOne))
        .containsExactlyElementsOf(List.of(userOne, userTwo));

    assertThat(roomService.getUserList(roomOne).size()).isEqualTo(USERLISTSIZEAFTERADDITION);
    assertThat(roomService.getUserList(roomOne))
        .containsExactlyElementsOf(List.of(userOne, userTwo));
  }
}
