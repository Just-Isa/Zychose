package de.hsrm.mi.team3.swtp.domain.messaging;

public record BackendMouseMessage (
    String sessionID,
    int roomNumber,
    int x,
    int y
) {
    public static BackendMouseMessage from(String sid, int roomNumber, int x, int y) {
        BackendMouseMessage dto = new BackendMouseMessage(
            sid,
            roomNumber,
            x,
            y);
        return dto;
    }
}


