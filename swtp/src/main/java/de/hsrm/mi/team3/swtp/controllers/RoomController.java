package de.hsrm.mi.team3.swtp.controllers;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;

import de.hsrm.mi.team3.swtp.domain.Room;
import de.hsrm.mi.team3.swtp.domain.User;
import de.hsrm.mi.team3.swtp.domain.messaging.BackendMouseMessage;
import de.hsrm.mi.team3.swtp.domain.messaging.BackendOperation;
import de.hsrm.mi.team3.swtp.services.BackendInfoService;
import de.hsrm.mi.team3.swtp.services.RoomBoxServiceImplementation;
import de.hsrm.mi.team3.swtp.services.RoomServiceImplementation;

@Controller
public class RoomController {
    
    @Autowired RoomBoxServiceImplementation roomBoxService;
    @Autowired RoomServiceImplementation roomService;
    @Autowired BackendInfoService backservice; 
    Logger logger = LoggerFactory.getLogger(RoomController.class);    

    /*
     * Dont know if we do need it, but creates a room if none in RoomBox
     */
    public void init(ModelMap m) {
        // in this case it makes a new room and leaves that room as the only one
        if (roomBoxService.getRoomsFromRoomBox().size() < 1) {

            Room room = roomBoxService.addRoom();
    
            logger.info("room = {}", room.getRoomNumber());            
        }
    }

    /*
     * was for testing, but can be used late for updating a room, or something like that.
     */
    @MessageMapping("/topic/room")
    public void sendroom(@Payload String test, ModelMap m){
        logger.info("----------------------"+ test+ "-------------------------");
    }    

    /**
     * 
     * @param mouse Mouse that is sent to all subscribers
     */
    @MessageMapping("/topic/mouse")
    public void sendMouseToClients(@Payload BackendMouseMessage mouse){
        backservice.sendMouse("mouse", mouse);
    }

    /*
     * Gets a newUser from the client, adds him to room and sends the room to the client 
     */
    @MessageMapping("/topic/user")
    public void getUser(@Payload User newUser){
        //to do's check if user in Room or roombox
        
        logger.info("User: (" +newUser.getSessionID()+", "+ newUser.getUserName()+ ", "+ newUser.getCurrentRoomNumber()+")");
        Room room;
        
        if (roomBoxService.getRoomsFromRoomBox().size() < 1) {
            room = roomBoxService.addRoom();
        }
        else{
            room = roomBoxService.getSpecificRoom(1);
        }
        if(newUser.getUserName() == null){
            newUser.setUserName("Raus aus meinem Kopf");
        }
        newUser.setCurrentRoomNumber(room.getRoomNumber());
        roomService.addNewUserToRoom(room, newUser);
        
        //sends room to Client
        backservice.sendRoom("room", BackendOperation.CREATE, room);
    }
    
}
