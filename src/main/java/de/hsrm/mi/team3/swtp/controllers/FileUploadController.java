package de.hsrm.mi.team3.swtp.controllers;

import org.python.util.PythonInterpreter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import de.hsrm.mi.team3.swtp.domain.Room;
import de.hsrm.mi.team3.swtp.domain.messaging.BackendOperation;
import de.hsrm.mi.team3.swtp.domain.messaging.BackendRoomMessage;
import de.hsrm.mi.team3.swtp.services.BackendInfoService;
import de.hsrm.mi.team3.swtp.services.RoomBoxService;
import de.hsrm.mi.team3.swtp.services.RoomService;

@RestController
public class FileUploadController {

    @Autowired
    private RoomBoxService roomBoxService;

    @Autowired
    private RoomService roomService;

    @Autowired
    private BackendInfoService backservice;

    Logger logger = LoggerFactory.getLogger(FileUploadController.class);

    @PostMapping("/api/upload/{roomNumber}")
    public void uploadJythonFile(@RequestParam("file") MultipartFile file, @PathVariable("roomNumber") int roomNumber) {
        logger.info(
                "FILE RECEIVED: "
                        + file.getOriginalFilename()
                        + " | "
                        + file.getSize());

        Room room = this.roomBoxService.getSpecificRoom(roomNumber);

        this.roomService.saveScriptToRoom(file, room);

        logger.info("ROOM: {}", room.getJythonScript());
        logger.info("UPLOAD ROOMNUMBER: " + roomNumber);

        backservice.sendRoom(
                "room/" + roomNumber,
                BackendOperation.UPDATE,
                BackendRoomMessage.from(room.getRoomName(), room.getRoomNumber(), room.getUserList(),
                        new String(room.getJythonScript().getBytes())));

        // just for testing-purposes, to show that you can execute the received file
        try (PythonInterpreter pyInt = new PythonInterpreter()) {
            pyInt.exec(room.getJythonScript());
        }

    }

}
