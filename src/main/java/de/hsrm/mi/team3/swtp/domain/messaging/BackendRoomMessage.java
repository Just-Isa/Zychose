package de.hsrm.mi.team3.swtp.domain.messaging;

import de.hsrm.mi.team3.swtp.domain.Room;

public record BackendRoomMessage(BackendOperation operation, Room room) {}
