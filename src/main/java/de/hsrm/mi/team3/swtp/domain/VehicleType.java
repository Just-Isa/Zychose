package de.hsrm.mi.team3.swtp.domain;

public enum VehicleType {
  SPORTS_CAR("sport"),
  TRUCK("pickup"),
  SUV("suv"),
  SEDAN("sedan"),
  VAN("van"),
  BICYCLE("bike"),
  JEEP("jeep"),
  LIMO("limo"),
  MINI("mini"),
  MUSCLE("muscle");

  private String type;

  private VehicleType(String type) {
    this.type = type;
  }

  public String getType() {
    return this.type;
  }
}
