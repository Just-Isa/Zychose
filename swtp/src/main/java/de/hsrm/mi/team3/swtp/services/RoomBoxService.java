package de.hsrm.mi.team3.swtp.services;


import java.util.Map;

import org.springframework.stereotype.Service;

import de.hsrm.mi.team3.swtp.domain.Room;

@Service
public interface RoomBoxService {
    public int nextRoomNumber();
    public Room addRoom();
    public Map<Integer, Room> getRoomsFromRoomBox();
}
