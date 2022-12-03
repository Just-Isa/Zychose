package de.hsrm.mi.team3.swtp.services;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import de.hsrm.mi.team3.swtp.domain.Room;
import de.hsrm.mi.team3.swtp.domain.User;

@Service
public class RoomServiceImplementation implements RoomService {

    Logger logger = LoggerFactory.getLogger(RoomServiceImplementation.class);

    @Autowired
    RoomBoxServiceImplementation roomBoxService;

    /**
     * This method adds a new user to a room,
     * and changed the users currentRoomNumber respectively.
     * 
     * @param room
     * @param user
     */
    @Override
    public void addNewUserToRoom(Room room, User user) {
        room.addUserToList(user);
        user.setCurrentRoomNumber(room.getRoomNumber());
    }

    public void removeUserFromRoom(Room room, User user) {
        room.removeUserFromList(user);
    }

    /**
     * This method provides a certain room by number.
     * 
     * @param roomNumber
     * @return Room
     */
    @Override
    public List<User> getUserList(Room room) {
        return room.getUserList();
    }

    /**
     * 
     * @param sessionID SessionID of wanted User
     * @return Either the User with the given SessionID or null if not present
     */
    public Optional<User> getUserBySessionID(String sessionID) {
        Optional<User> userOpt = Optional.empty();
        for (Room room : this.roomBoxService.getRoomsFromRoomBox().values()) {
            for (User user : room.getUserList()) {
                if (user.getSessionID().contains(sessionID)) {
                    userOpt = Optional.ofNullable(user);
                }
            }
        }
        return userOpt;
    }
}
