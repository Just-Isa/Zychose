package de.hsrm.mi.team3.swtp.domain;

public enum VehicleType {
  SPORTS_CAR("SPORTS_CAR"),
  TRUCK("TRUCK"),
  SUV("SUV"),
  SEDAN("SEDAN"),
  VAN("VAN"),
  BICYCLE("BICYCLE");

  private String type;

  private VehicleType(String type) {
    this.type = type;
  }

  public String getType() {
    return this.type;
  }
}
