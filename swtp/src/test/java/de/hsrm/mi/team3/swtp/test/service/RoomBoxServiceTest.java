package de.hsrm.mi.team3.swtp.test.service;


import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;

import de.hsrm.mi.team3.swtp.domain.Room;
import de.hsrm.mi.team3.swtp.domain.User;
import de.hsrm.mi.team3.swtp.services.RoomBoxService;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
class RoomBoxServiceTest{

    @Autowired RoomBoxService roomBoxService;


    private final String SESSIONID = "session-id-test-1";
    private final int USERROOMNUMBER = 1;
    private final String USERNAME = "User-One";

    private final String SESSIONIDTWO = "session-id-test-2";
    private final int USERROOMNUMBERTWO = 1;
    private final String USERNAMETWO= "User-Twoe";

    private final int ROOMBOXSIZEBEFOREADDITION = 0;
    private final int ROOMBOXSIZEAFTERADDITION = 1;
    
    private final int NEXTROOMNUMBERBEFOREADDITION = 1;
    private final int NEXTROOMNUMBERAFTERADDITION = 2;

    User userOne = null;
    User userTwo = null;


    @BeforeEach
    public void benutzerprofil_init() {
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
    public void addRoomToRoomBox() {
        assertThat(roomBoxService.getRoomsFromRoomBox().size()).isEqualTo(ROOMBOXSIZEBEFOREADDITION);
        roomBoxService.addRoom();
        assertThat(roomBoxService.getRoomsFromRoomBox().size()).isEqualTo(ROOMBOXSIZEAFTERADDITION);
    }

    @Test
    @DisplayName("RoomBoxService: nextRoomNumber")
    public void getNextRoomNumber() {
        assertThat(roomBoxService.nextRoomNumber()).isEqualTo(NEXTROOMNUMBERBEFOREADDITION);
        roomBoxService.addRoom();
        assertThat(roomBoxService.nextRoomNumber()).isEqualTo(NEXTROOMNUMBERAFTERADDITION);
    }
}
