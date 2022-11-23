package de.hsrm.mi.team3.swtp.domain;

import java.util.HashMap;
import java.util.Map;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Scope;

public class RoomBox {

    private Map<Integer, Room> rooms;

    public RoomBox() {
        this.rooms = new HashMap<Integer, Room>();
    }

    
    public Map<Integer, Room> getRooms() {
        return this.rooms;
    }

    public void addRoom(int number, Room room) {
        this.rooms.put(number, room);
    }

    @Bean
    @Scope("singleton")
    public RoomBox roomBoxSingleton() {
        return new RoomBox();
    }
}
