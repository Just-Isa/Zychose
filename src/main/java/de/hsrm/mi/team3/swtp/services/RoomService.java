package de.hsrm.mi.team3.swtp.services;

import java.util.List;

import org.springframework.stereotype.Service;

import de.hsrm.mi.team3.swtp.domain.Room;
import de.hsrm.mi.team3.swtp.domain.User;

@Service
public interface RoomService {
    public void addNewUserToRoom(Room room, User user);

    public void removeUserFromRoom(Room room, User user);

    public List<User> getUserList(Room room);
}
