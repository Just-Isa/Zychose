package de.hsrm.mi.team3.swtp.api.dtos;

public record GetSwapUserDTO(String userName, String sessionID) {
  public static GetSwapUserDTO from(String userName, String sessionID) {
    return new GetSwapUserDTO(userName, sessionID);
  }

  @Override
  public String toString() {
    return ("{\"userName\":\"" + this.userName + "\",\"sessionID\":\"" + this.sessionID + "\"}");
  }
}
