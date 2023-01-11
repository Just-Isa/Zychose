package de.hsrm.mi.team3.swtp.domain;

public enum VehicleCommands {
  FORWARD("FORWARD"),
  BACKWARD("BACKWARD"),
  LEFT("LEFT"),
  RIGHT("RIGHT");

  private String command;

  private VehicleCommands(String command) {
    this.command = command;
  }

  public String getCommand() {
    return this.command;
  }
}
