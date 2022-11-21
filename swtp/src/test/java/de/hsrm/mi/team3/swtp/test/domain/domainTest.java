package de.hsrm.mi.team3.swtp.test.domain;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.platform.commons.annotation.Testable;

import de.hsrm.mi.team3.swtp.domain.Room;
import de.hsrm.mi.team3.swtp.domain.User;

@Testable
public class domainTest {
    private final String ROOMNAME = "RoomName";
    private final int ROOMNUMBER = 1;

    private final String SESSIONID = "session-id-test-1";
    private final int USERROOMNUMBER = 1;
    private final String USERNAME = "User-One";

    private final String SESSIONIDTWO = "session-id-test-2";
    private final int USERROOMNUMBERTWO = 1;
    private final String USERNAMETWO= "User-Twoe";

    private final int USERLISTSIZEBEFOREADDITION = 0;
    private final int USERLISTSIZEAFTERADDITION = 2;

    User userOne = null;
    User userTwo = null;
    

    Room roomOne = null;


    @BeforeEach
    public void benutzerprofil_init() {
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
    @DisplayName("User: toString()")
    public void user_toString() {
        String toStr = userOne.toString();
        String toStrTwo = userTwo.toString();
        
        assertThat(toStr).contains(SESSIONID);
        assertThat(toStr).contains(USERNAME);
        assertThat(toStr).contains(Integer.toString(USERROOMNUMBER));
        
        assertThat(toStrTwo).contains(SESSIONIDTWO);
        assertThat(toStrTwo).contains(USERNAMETWO);
        assertThat(toStrTwo).contains(Integer.toString(USERROOMNUMBERTWO));
    }

    @Test
    @DisplayName("Room: User present in Room")
    public void room_user_present() {
        assertThat(roomOne.getUserList().size()).isEqualTo(USERLISTSIZEBEFOREADDITION);
        
        roomOne.addUserToList(userOne);
        roomOne.addUserToList(userTwo);

        assertThat(roomOne.getUserList().size()).isEqualTo(USERLISTSIZEAFTERADDITION);
        assertThat(roomOne.getUserList()).containsExactlyElementsOf(List.of(userOne, userTwo));
    }
}
