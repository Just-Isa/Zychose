package de.hsrm.mi.team3.swtp.services;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Service;

import de.hsrm.mi.team3.swtp.domain.Room;
import de.hsrm.mi.team3.swtp.domain.RoomBox;

@Service
public class RoomBoxServiceImplementation implements RoomBoxService {
    
    Logger logger = LoggerFactory.getLogger(RoomBoxServiceImplementation.class);   
    ApplicationContext applicationContext = new ClassPathXmlApplicationContext("scopes.xml");

    public int nextRoomNumber() {
        RoomBox roomBox = getRoomBoxSingelton();
        return roomBox.getRooms().size() + 1;
    }

    public Room addRoom() {
        RoomBox roomBox = getRoomBoxSingelton();

        int newRoomNumber = this.nextRoomNumber();
        logger.info("-------"+newRoomNumber+"---------");
        Room existentRoom = this.getRoomsFromRoomBox().get(newRoomNumber);
        if (existentRoom != null) {
            return existentRoom;
        }
        roomBox.addRoom(newRoomNumber, new Room(newRoomNumber));
        for (Room logRoom: roomBox.getRooms().values()) {
            logger.info("ROOM = {}", logRoom.getRoomName());
        }
        return this.getRoomsFromRoomBox().get(newRoomNumber);
    }

    public boolean roomExistsByNumber(int roomNumber) {
        RoomBox roomBox = getRoomBoxSingelton();
        Room room = roomBox.getRooms().get(roomNumber);
        if (room != null) {
            return true;
        }
        return false;
    }

    @Override
    public Map<Integer, Room> getRoomsFromRoomBox() {
        RoomBox roomBox = getRoomBoxSingelton();
        return roomBox.getRooms();       
    }

    public Room getSpecificRoom(int roomNumber) {
        return this.getRoomsFromRoomBox().get(roomNumber);
    }

    public RoomBox getRoomBoxSingelton(){
        return (RoomBox) applicationContext.getBean("roomBoxSingleton");
    }

}
