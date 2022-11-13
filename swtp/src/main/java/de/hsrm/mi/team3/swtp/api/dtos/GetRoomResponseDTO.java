package de.hsrm.mi.team3.swtp.api.dtos;

import java.util.List;

import de.hsrm.mi.team3.swtp.domain.Room;
import de.hsrm.mi.team3.swtp.domain.User;

public record GetRoomResponseDTO (
    String roomName,
    int roomNumber,
    List<User> userList
) {
    public static GetRoomResponseDTO from(Room r) {
        GetRoomResponseDTO dto = new GetRoomResponseDTO(
            r.getRoomName(),
            r.getRoomNumber(),
            r.getUserList());
        return dto;
    }
}
