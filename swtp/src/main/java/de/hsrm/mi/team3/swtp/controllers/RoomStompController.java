package de.hsrm.mi.team3.swtp.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import de.hsrm.mi.team3.swtp.domain.Room;
import de.hsrm.mi.team3.swtp.domain.User;
import de.hsrm.mi.team3.swtp.domain.messaging.BackendOperation;
import de.hsrm.mi.team3.swtp.services.BackendInfoService;
import de.hsrm.mi.team3.swtp.services.RoomBoxServiceImplementation;
import de.hsrm.mi.team3.swtp.services.RoomServiceImplementation;

@Controller
public class RoomStompController {
    
    @Autowired RoomBoxServiceImplementation roomBoxService;
    @Autowired RoomServiceImplementation roomService;
    @Autowired BackendInfoService backservice; 
    Logger logger = LoggerFactory.getLogger(RoomStompController.class);    


    @MessageMapping("/topic/room")
    public void sendroom(@Payload String test){
        logger.info("----------------------"+ test+ "-------------------------");
       
    }
}
