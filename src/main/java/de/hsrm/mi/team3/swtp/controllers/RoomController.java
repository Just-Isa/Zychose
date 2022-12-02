package de.hsrm.mi.team3.swtp.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;

import de.hsrm.mi.team3.swtp.domain.Room;
import de.hsrm.mi.team3.swtp.domain.User;
import de.hsrm.mi.team3.swtp.domain.messaging.BackendMouseMessage;
import de.hsrm.mi.team3.swtp.domain.messaging.BackendOperation;
import de.hsrm.mi.team3.swtp.domain.messaging.BackendUserMessage;
import de.hsrm.mi.team3.swtp.services.BackendInfoService;
import de.hsrm.mi.team3.swtp.services.RoomBoxServiceImplementation;
import de.hsrm.mi.team3.swtp.services.RoomServiceImplementation;

@Controller
public class RoomController {

    @Autowired
    RoomBoxServiceImplementation roomBoxService;
    @Autowired
    RoomServiceImplementation roomService;
    @Autowired
    BackendInfoService backservice;
    Logger logger = LoggerFactory.getLogger(RoomController.class);

    /*
     * This method creates a new room, if there is no room in the RoomBox.
     */
    public void init(ModelMap m) {
        // In this case it creates a new room and leaves that room as the only one.
        if (roomBoxService.getRoomsFromRoomBox().size() < 1) {

            Room room = roomBoxService.addRoom();

            logger.info("room = {}", room.getRoomNumber());
        }
    }

    /**
     * Further along, this method can be used for updating a room.
     * 
     * @param test
     * @param m
     */
    @MessageMapping("/topic/room")
    public void sendroom(@Payload String test, ModelMap m) {
        logger.info("----------------------" + test + "-------------------------");
    }

    /**
     * This mapping send the mouse to all other subscribers.
     * 
     * @param mouse
     */
    @MessageMapping("/topic/mouse/{roomNumber}")
    public void sendMouseToClients(@Payload BackendMouseMessage mouse, @DestinationVariable int roomNumber) {
        backservice.sendMouse("mouse/" + roomNumber, mouse);
    }

    /*
     * Gets a newUser from the client, adds this user to the room and sends the room
     * to the client.
     * 
     * @param newUser
     */
    @MessageMapping("/topic/user")
    public void getUser(@Payload User user) {
        logger.info("User: (" + user.getSessionID() + ", " + user.getUserName() + ", "
                + user.getCurrentRoomNumber() + ")");
        Room room;

        if (roomBoxService.getRoomsFromRoomBox().size() <= 5) {
            while (roomBoxService.getRoomsFromRoomBox().size() <= 5) {
                roomBoxService.addRoom();
            }
        }
        room = roomBoxService.getSpecificRoom(1);

        if (user.getUserName() == null) {
            user.setUserName("Raus aus meinem Kopf");
        }
        roomService.addNewUserToRoom(room, user);
        backservice.sendRoom("room", BackendOperation.CREATE, room);
    }

}
