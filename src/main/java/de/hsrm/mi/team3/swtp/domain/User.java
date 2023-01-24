package de.hsrm.mi.team3.swtp.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/*
 * The users who can be signed in.
 */
@Setter
@Getter
@NoArgsConstructor
public class User {

  private String sessionID;

  private int currentRoomNumber;

  private String userName;

  private long loginTime;

  private Vehicle vehicle;

  public User(String sessionID, int currentRoomNumber, String userName, long loginTime) {
    this.sessionID = sessionID;
    this.currentRoomNumber = currentRoomNumber;
    this.userName = userName;
    this.loginTime = loginTime;
    vehicle = null;
  }

  @Override
  public String toString() {
    return ("User [sessionID="
        + sessionID
        + ", currentRoomNumber="
        + currentRoomNumber
        + ", userName="
        + userName
        + ", loginTime ="
        + loginTime
        + "]");
  }
}
