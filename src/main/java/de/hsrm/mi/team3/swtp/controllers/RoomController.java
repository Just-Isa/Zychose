package de.hsrm.mi.team3.swtp.controllers;

import de.hsrm.mi.team3.swtp.domain.User;
import de.hsrm.mi.team3.swtp.domain.messaging.BackendMouseMessage;
import de.hsrm.mi.team3.swtp.services.BackendInfoService;
import de.hsrm.mi.team3.swtp.services.RoomBoxServiceImplementation;
import de.hsrm.mi.team3.swtp.services.RoomServiceImplementation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Controller;

@Controller
public class RoomController {

  @Autowired RoomBoxServiceImplementation roomBoxService;
  @Autowired RoomServiceImplementation roomService;
  @Autowired BackendInfoService backservice;
  Logger logger = LoggerFactory.getLogger(RoomController.class);

  /**
   * Further along, this method can be used for updating a room.
   *
   * @param test test payload
   */
  @MessageMapping("/topic/room")
  public void sendroom(@Payload String test) {
    logger.info("----------------------" + test + "-------------------------");
  }

  /**
   * This mapping send the mouse to all other subscribers.
   *
   * @param mouse Mouse that is being updated
   * @param roomNumber Roomnumber of room that is to be updated
   */
  @MessageMapping("/topic/mouse/{roomNumber}")
  public void sendMouseToClients(
      @Payload BackendMouseMessage mouse, @DestinationVariable int roomNumber) {
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
    logger.info(
        "User: ("
            + user.getSessionID()
            + ", "
            + user.getUserName()
            + ", "
            + user.getCurrentRoomNumber()
            + ")");

    if (roomBoxService.getRoomsFromRoomBox().size() <= 4) {
      while (roomBoxService.getRoomsFromRoomBox().size() <= 4) {
        roomBoxService.addRoom();
        logger.info("RoomBox: {}", roomBoxService.getRoomsFromRoomBox());
      }
    }

    if (user.getUserName() == null) {
      user.setUserName("Raus aus meinem Kopf");
    }
  }
}
