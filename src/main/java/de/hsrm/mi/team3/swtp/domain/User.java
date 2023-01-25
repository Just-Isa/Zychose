package de.hsrm.mi.team3.swtp.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

/*
 * The users who can be signed in.
 */
@Setter
@Getter
@NoArgsConstructor
@RequiredArgsConstructor
public class User {

  @NonNull private String sessionID;

  @NonNull private Integer currentRoomNumber;

  @NonNull private String userName;

  @NonNull private Long loginTime;

  // TODO new Vehicle() loeschen
  private Vehicle vehicle = new Vehicle();

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

  public void setVehicle(Vehicle vehicle) {
    this.vehicle = vehicle;
  }
}
