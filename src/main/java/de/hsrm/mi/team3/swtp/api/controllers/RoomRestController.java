package de.hsrm.mi.team3.swtp.api.controllers;

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

import de.hsrm.mi.team3.swtp.api.dtos.GetRoomResponseDTO;
import de.hsrm.mi.team3.swtp.domain.Room;
import de.hsrm.mi.team3.swtp.domain.User;
import de.hsrm.mi.team3.swtp.services.RoomBoxServiceImplementation;
import de.hsrm.mi.team3.swtp.services.RoomServiceImplementation;

@RestController
@RequestMapping("/api")
public class RoomRestController {

    Logger logger = LoggerFactory.getLogger(RoomRestController.class);

    @Autowired
    private RoomBoxServiceImplementation roomBoxService;
    @Autowired
    private RoomServiceImplementation roomService;

    @GetMapping(value = "/roomlist", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<GetRoomResponseDTO> getRoomBoxSingleton() {
        List<GetRoomResponseDTO> roomDTOList = new ArrayList<GetRoomResponseDTO>();
        for (Room room : roomBoxService.getRoomBoxSingelton().getRooms().values()) {
            roomDTOList.add(GetRoomResponseDTO.from(room));
        }
        logger.info("Returning roombox! = {}", roomDTOList);
        return roomDTOList;
    }

    @PostMapping(value = "/rooms/{number}")
    public void changeRoomOfUser(@PathVariable("number") int number, @RequestBody String sessionId) {
        String sId = sessionId.split(":")[1].replace("\"", "").replace("}", "");
        Room room = roomBoxService.getSpecificRoom(number);
        User userOpt = roomService.getUserBySessionID(sId);
        Room oldRoom = roomBoxService.getRoomsFromRoomBox().get(userOpt.getCurrentRoomNumber());
        roomService.addNewUserToRoom(room, userOpt);
        roomService.removeUserFromRoom(oldRoom, userOpt);

        logger.info("ROOM = {}", room.getUserList());
    }
}
