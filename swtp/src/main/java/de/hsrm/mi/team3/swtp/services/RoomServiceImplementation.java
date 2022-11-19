package de.hsrm.mi.team3.swtp.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import de.hsrm.mi.team3.swtp.domain.Room;
import de.hsrm.mi.team3.swtp.domain.User;

@Service
public class RoomServiceImplementation implements RoomService {

    Logger logger = LoggerFactory.getLogger(RoomServiceImplementation.class);
    
    @Autowired RoomBoxServiceImplementation roomBoxService;

    @Override
    public void addNewUserToRoom(Room room, User user) {
        room.addUserToList(user);
        for (User users : this.getRoomByRoomNumber(room.getRoomNumber()).getUserList()) {
            logger.info("User = {}, SessionID = {}", users.getUserName(), users.getSessionID());
        }
    }

    @Override
    public Room getRoomByRoomNumber(int roomNumber) {
        return roomBoxService.getRoomsFromRoomBox().get(roomNumber);
    }
}
