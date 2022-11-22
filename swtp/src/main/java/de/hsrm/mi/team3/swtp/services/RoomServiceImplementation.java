package de.hsrm.mi.team3.swtp.services;

import java.util.List;

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
    }

    @Override
    public List<User> getUserList(Room room) {
        return room.getUserList();
    }
}
