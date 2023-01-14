package de.hsrm.mi.team3.swtp.domain;

/*
 * The users who can be signed in.
 */
public class User {

  private String sessionID;

  private int currentRoomNumber;

  private String userName;

  private Vehicle vehicle = null;

  public User(String sessionID, int currentRoomNumber, String userName) {
    this.sessionID = sessionID;
    this.currentRoomNumber = currentRoomNumber;
    this.userName = userName;
  }

  public User() {
    this.sessionID = "";
    this.currentRoomNumber = 0;
    this.userName = "";
  }

  public String getSessionID() {
    return sessionID;
  }

  public void setSessionID(String sessionID) {
    this.sessionID = sessionID;
  }

  public int getCurrentRoomNumber() {
    return currentRoomNumber;
  }

  public void setCurrentRoomNumber(int currentRoomNumber) {
    this.currentRoomNumber = currentRoomNumber;
  }

  public String getUserName() {
    return userName;
  }

  public void setUserName(String userName) {
    this.userName = userName;
  }

  public Vehicle getVehicle() {
    return vehicle;
  }

  public void setVehicle(Vehicle vehicle) {
    this.vehicle = vehicle;
  }

  @Override
  public String toString() {
    return "User [sessionID="
        + sessionID
        + ", currentRoomNumber="
        + currentRoomNumber
        + ", userName="
        + userName
        + "]";
  }
}
