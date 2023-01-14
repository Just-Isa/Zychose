package de.hsrm.mi.team3.swtp.domain.messaging;

import java.util.List;

import de.hsrm.mi.team3.swtp.domain.VehicleCommands;

public record BackenVehicleCommandMessage(List<VehicleCommands> commands, String userSessionId) {
}
