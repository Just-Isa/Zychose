package de.hsrm.mi.team3.swtp.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;

import de.hsrm.mi.team3.swtp.domain.Vehicle;
import de.hsrm.mi.team3.swtp.domain.VehicleCommands;
import de.hsrm.mi.team3.swtp.domain.messaging.BackendOperation;
import de.hsrm.mi.team3.swtp.services.BackendInfoService;
import de.hsrm.mi.team3.swtp.services.VehicleService;

@Controller
public class VehicleController {
    Logger logger = LoggerFactory.getLogger(VehicleController.class);
    Vehicle vehicleDummy = new Vehicle();

    @Autowired
    VehicleService vehicleService;

    @Autowired
    BackendInfoService bInfoService;

    @ModelAttribute
    public void initVehicle(Model m) {
        m.addAttribute("vehicle", new Vehicle());
    }

    /**
     * 
     * Receives a command from client to execute vehicleservice Methods
     * 
     * @param commands
     */
    @MessageMapping("topic/3d/commands")
    public void getCars(@Payload String commands) {
        if (!commands.contains(VehicleCommands.FORWARD.getCommand())
                && !commands.contains(VehicleCommands.BACKWARD.getCommand())) {
            vehicleService.carRunOutSpeed(vehicleDummy);
        }
        if (commands.contains(VehicleCommands.FORWARD.getCommand())) {
            vehicleService.moveForward(vehicleDummy);
        }
        if (commands.contains(VehicleCommands.BACKWARD.getCommand())) {
            vehicleService.moveBackward(vehicleDummy);
        }
        if (commands.contains(VehicleCommands.LEFT.getCommand())) {
            vehicleService.rotateLeft(vehicleDummy);

        }
        if (commands.contains(VehicleCommands.RIGHT.getCommand())) {
            vehicleService.rotateRight(vehicleDummy);
        }
        bInfoService.sendVehicle("vehicle/", BackendOperation.UPDATE, vehicleDummy);
    }
}
