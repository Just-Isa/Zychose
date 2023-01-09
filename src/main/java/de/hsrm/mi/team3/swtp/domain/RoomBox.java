package de.hsrm.mi.team3.swtp.domain;

import java.util.HashMap;
import java.util.Map;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Scope;

/*
 * The RoomBox class handles all rooms. The class itself exists only once.
 * Rooms can be added and are handled in HashMaps.
 */
public class RoomBox {

  private Map<Integer, Room> rooms;

  public RoomBox() {
    this.rooms = new HashMap<>();
  }

  public Map<Integer, Room> getRooms() {
    return this.rooms;
  }

  public void addRoom(int number, Room room) {
    this.rooms.put(number, room);
  }

  public void removeRoom(Room room) {
    this.rooms.remove(room.getRoomNumber());
  }

  @Bean
  @Scope("singleton")
  public RoomBox roomBoxSingleton() {
    return new RoomBox();
  }
}
