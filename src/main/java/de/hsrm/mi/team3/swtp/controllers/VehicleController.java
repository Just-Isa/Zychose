package de.hsrm.mi.team3.swtp.controllers;

import de.hsrm.mi.team3.swtp.domain.Vehicle;
import de.hsrm.mi.team3.swtp.domain.VehicleCommands;
import de.hsrm.mi.team3.swtp.domain.messaging.BackenVehicleCommandMessage;
import de.hsrm.mi.team3.swtp.domain.messaging.BackendOperation;
import de.hsrm.mi.team3.swtp.services.BackendInfoService;
import de.hsrm.mi.team3.swtp.services.RoomBoxService;
import de.hsrm.mi.team3.swtp.services.RoomService;
import de.hsrm.mi.team3.swtp.services.VehicleService;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Controller;

@Controller
public class VehicleController {
  Logger logger = LoggerFactory.getLogger(VehicleController.class);

  @Autowired
  VehicleService vehicleService;

  @Autowired
  BackendInfoService bInfoService;

  @Autowired
  RoomBoxService roomBoxService;

  @Autowired
  RoomService roomService;

  /**
   * Receives a command from client to execute vehicleservice Methods
   *
   * @param commands
   * @param roomNumber
   */
  @MessageMapping("topic/3d/commands/{roomNumber}")
  public void getCars(
      @Payload BackenVehicleCommandMessage commandVehicleMessage,
      @DestinationVariable int roomNumber) {

    List<VehicleCommands> commands = commandVehicleMessage.commands();
    Vehicle vehicle = roomService.getUserByID(roomNumber, commandVehicleMessage.userSessionId()).getVehicle();
    if (vehicle == null) {
      roomService
          .getUserByID(roomNumber, commandVehicleMessage.userSessionId())
          .setVehicle(new Vehicle());
      vehicle = roomService.getUserByID(roomNumber, commandVehicleMessage.userSessionId()).getVehicle();
    }
    if (!commands.contains(VehicleCommands.FORWARD)
        && !commands.contains(VehicleCommands.BACKWARD)) {
      vehicleService.carRunOutSpeed(vehicle);
    }
    if (commands.contains(VehicleCommands.FORWARD)) {
      vehicleService.moveForward(vehicle);
    }
    if (commands.contains(VehicleCommands.BACKWARD)) {
      vehicleService.moveBackward(vehicle);
    }
    if (commands.contains(VehicleCommands.LEFT)) {
      vehicleService.rotateLeft(vehicle);
    }
    if (commands.contains(VehicleCommands.RIGHT)) {
      vehicleService.rotateRight(vehicle);
    }
    logger.info(commandVehicleMessage.userSessionId() + " - " + vehicle.toString());
    bInfoService.sendVehicle(
        "vehicle/" + roomNumber,
        commandVehicleMessage.userSessionId(),
        BackendOperation.UPDATE,
        vehicle);
  }
}
