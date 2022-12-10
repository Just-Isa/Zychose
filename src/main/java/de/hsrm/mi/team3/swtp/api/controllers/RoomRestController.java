package de.hsrm.mi.team3.swtp.api.controllers;

import de.hsrm.mi.team3.swtp.api.dtos.GetRoomResponseDTO;
import de.hsrm.mi.team3.swtp.domain.Room;
import de.hsrm.mi.team3.swtp.domain.User;
import de.hsrm.mi.team3.swtp.services.RoomBoxServiceImplementation;
import de.hsrm.mi.team3.swtp.services.RoomServiceImplementation;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class RoomRestController {

  Logger logger = LoggerFactory.getLogger(RoomRestController.class);

  @Autowired
  private RoomBoxServiceImplementation roomBoxService;
  @Autowired
  private RoomServiceImplementation roomService;

  /**
   * Retrieve the Room List saved in the RoomBox Singleton.
   *
   * @return Room List of the RoomBox Singleton.
   */
  @GetMapping(value = "/roomlist", produces = MediaType.APPLICATION_JSON_VALUE)
  public List<GetRoomResponseDTO> getRoomBoxSingleton() {
    List<GetRoomResponseDTO> roomDTOList = new ArrayList<GetRoomResponseDTO>();
    for (Room room : roomBoxService.getRoomBoxSingelton().getRooms().values()) {
      roomDTOList.add(GetRoomResponseDTO.from(room));
    }
    return roomDTOList;
  }

  /**
   * Changes the Room a User is in to another.
   *
   * @param roomNumber Room number of room that the User is supposed to be swapped
   *                   into
   * @param sessionId  SessionID of User that will be moved
   */
  @PostMapping(value = "/room/{number}")
  public void changeRoomOfUser(
      @PathVariable("number") String number, @RequestBody String sessionId) {
    String sId = sessionId.split(":")[1].replace("\"", "").replace("}", "");

    Room room = roomBoxService.getSpecificRoom(Integer.parseInt(number));
    Optional<User> userOpt = roomBoxService.getUserBySessionID(sId);
    if (userOpt.isPresent()) {
      Room oldRoom = roomBoxService.getRoomsFromRoomBox().get(userOpt.get().getCurrentRoomNumber());

      roomService.removeUserFromRoom(oldRoom, userOpt.get());
      roomService.addNewUserToRoom(room, userOpt.get());
      logger.info("ROOM = {}", room.getUserList());
    } else {
      roomService.addNewUserToRoom(room, new User(sId, 0, sId));
    }
  }

  /**
   * Changes the Room a User is in to another.
   *
   * @param roomNumber Room number of room that the User is supposed to be swapped
   *                   into
   * @param sessionId  SessionID of User that will be moved
   */
  @PostMapping(value = "/room/remove")
  public void removeUserFromRoom(@RequestBody String sessionId) {
    String sId = sessionId.split(":")[1].replace("\"", "").replace("}", "");
    Optional<User> userOpt = roomBoxService.getUserBySessionID(sId);
    if (userOpt.isPresent()) {
      Room oldRoom = roomBoxService.getRoomsFromRoomBox().get(userOpt.get().getCurrentRoomNumber());
      roomService.removeUserFromRoom(oldRoom, userOpt.get());
    }
  }
}
