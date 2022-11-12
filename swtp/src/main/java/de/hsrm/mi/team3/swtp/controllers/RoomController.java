package de.hsrm.mi.team3.swtp.controllers;


import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttributes;

import de.hsrm.mi.team3.swtp.domain.Room;
import de.hsrm.mi.team3.swtp.domain.User;
import de.hsrm.mi.team3.swtp.services.RoomBoxServiceImplementation;
import de.hsrm.mi.team3.swtp.services.RoomServiceImplementation;


@Controller
@SessionAttributes(names = {"user", "room"})
@RequestMapping("room")
public class RoomController {

    @Autowired RoomBoxServiceImplementation roomBoxService;
    @Autowired RoomServiceImplementation roomService;

    Logger logger = LoggerFactory.getLogger(RoomController.class);    

    @ModelAttribute("user")
    public void init(ModelMap m, HttpSession session) {
        // in this case it makes a new room and leaves that room as the only one
        if (roomBoxService.getRoomsFromRoomBox().size() < 1) {

            Room room = roomBoxService.addRoom();
            User user = new User(session.getId(), room.getRoomNumber(), "Seit-wann-bist-du-po?");
            roomService.addNewUserToRoom(room, user);
    
            logger.info("user = {}", user.getSessionID());
            logger.info("room = {}", room.getRoomNumber());
            
            m.addAttribute("user", user).addAttribute("room", room);    
        } else {      
            User user = new User(session.getId(), 1, "Raus-Aus-Meinem-Kopf-2");
            Room room = roomBoxService.getSpecificRoom(1);
            roomService.addNewUserToRoom(room, user);

            m.put("user", user);
            m.put("room", room);       

            logger.info("users = {}", room.getUserList());
            logger.info("rooms = {}", roomBoxService.getRoomsFromRoomBox());
        }
    }

    @GetMapping()
    public String showRoom(ModelMap m) {
        return "roomview";
    }
}
