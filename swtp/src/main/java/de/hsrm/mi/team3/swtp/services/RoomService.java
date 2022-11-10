package de.hsrm.mi.team3.swtp.services;

import org.springframework.stereotype.Service;

import de.hsrm.mi.team3.swtp.domain.Room;
import de.hsrm.mi.team3.swtp.domain.User;

@Service
public interface RoomService {
    public Room getRoomByRoomNumber(int roomNumber);
    public void addNewUserToRoom(Room room, User user);
}
