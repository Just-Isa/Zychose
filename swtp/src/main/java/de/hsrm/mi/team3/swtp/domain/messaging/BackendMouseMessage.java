package de.hsrm.mi.team3.swtp.domain.messaging;

public record BackendMouseMessage(
        String sessionID,
        int roomNumber,
        int x,
        int y) {

    /**
     * Parameter für Mouse Message.
     * 
     * @param sid
     * @param roomNumber
     * @param x
     * @param y
     * @return BackendMouseMessage
     */
    public static BackendMouseMessage from(String sid, int roomNumber, int x, int y) {
        BackendMouseMessage dto = new BackendMouseMessage(
                sid,
                roomNumber,
                x,
                y);
        return dto;
    }
}
