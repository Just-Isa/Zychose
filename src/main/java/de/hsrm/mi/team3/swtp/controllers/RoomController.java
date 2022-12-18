package de.hsrm.mi.team3.swtp.controllers;

import de.hsrm.mi.team3.swtp.domain.Room;
import de.hsrm.mi.team3.swtp.domain.User;
import de.hsrm.mi.team3.swtp.domain.messaging.BackendMouseMessage;
import de.hsrm.mi.team3.swtp.domain.messaging.BackendOperation;
import de.hsrm.mi.team3.swtp.domain.messaging.BackendRoomMessage;
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
import org.springframework.ui.ModelMap;

@Controller
public class RoomController {

  @Autowired RoomBoxServiceImplementation roomBoxService;
  @Autowired RoomServiceImplementation roomService;
  @Autowired BackendInfoService backservice;
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
   * Used to differentiate and update specific rooms.
   *
   * @param operation Operation that is used
   * @param roomNumber Room on which the changes occured
   */
  @MessageMapping("/topic/room/{roomNumber}")
  public void roomTopic(@Payload BackendOperation operation, @DestinationVariable int roomNumber) {
    // saves the jython script to the room
    // this.roomService.saveScriptToRoom(test);
    switch (operation) {
      case CREATE:
        break;
      case DELETE:
        break;
      case UPDATE:
        Room room = this.roomBoxService.getSpecificRoom(roomNumber);

        backservice.sendRoom(
            "room/" + roomNumber,
            BackendOperation.UPDATE,
            BackendRoomMessage.from(
                room.getRoomName(),
                room.getRoomNumber(),
                room.getUserList(),
                room.getJythonScript()));

        break;
    }
  }

  /**
   * This mapping send the mouse to all other subscribers.
   *
   * @param mouse
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
      }
    }

    if (user.getUserName() == null) {
      user.setUserName("Raus aus meinem Kopf");
    }
  }
}
