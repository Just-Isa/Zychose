package de.hsrm.mi.team3.swtp.services;

import java.util.Map;
import java.util.Optional;

import org.springframework.stereotype.Service;

import de.hsrm.mi.team3.swtp.domain.Room;
import de.hsrm.mi.team3.swtp.domain.RoomBox;
import de.hsrm.mi.team3.swtp.domain.User;

@Service
public interface RoomBoxService {
    public int nextRoomNumber();

    public Room addRoom();

    public Map<Integer, Room> getRoomsFromRoomBox();

    public RoomBox getRoomBoxSingelton();

    public Room getSpecificRoom(int roomNumber);

    public void clearRoombox();

    public Optional<User> getUserBySessionID(String sessionID);
}
