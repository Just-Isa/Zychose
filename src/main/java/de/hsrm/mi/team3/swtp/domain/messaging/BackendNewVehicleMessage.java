package de.hsrm.mi.team3.swtp.domain.messaging;

public record BackendNewVehicleMessage(
    String userSessionId, String vehicleType, String posX, String posZ) {}
