package de.hsrm.mi.team3.swtp.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import de.hsrm.mi.team3.swtp.domain.Room;
import de.hsrm.mi.team3.swtp.domain.User;

@Service
public class RoomServiceImplementation implements RoomService {

    @Autowired RoomBoxServiceImplementation roomBoxService;

    @Override
    public void addNewUserToRoom(Room room, User user) {
        room.addUserToList(user);
    }

    @Override
    public Room getRoomByRoomNumber(int roomNumber) {
        return roomBoxService.getRoomsFromRoomBox().get(roomNumber);
    }
}
