package de.hsrm.mi.team3.swtp.domain;

/**
 * Tile repraesentiert das einzelne Strassenstueck Es beinhaltet alle Informationen, die fuer die
 * Bot Fahrzeuge relevant sind Tiles landen in der RoadMap
 */
public class StreetBlock {

  private String type;
  private int rotation;
  private int[] position;
  private boolean blocked;

  public StreetBlock(String tileType, int rotation, int posX, int posY, boolean blocked) {
    this.type = tileType;
    this.rotation = rotation;
    this.position[0] = posX;
    this.position[1] = posY;
    this.blocked = blocked;
  }

  public String getTileType() {
    return this.type;
  }

  public int getTileRotation() {
    return this.rotation;
  }

  public int[] getTilePosition() {
    return this.position;
  }

  /*
   * blocked und isBlocked geben an,
   * ob sich ein anderes Fahrzeug auf dem Feld befindet
   */
  public void isBlocked(boolean hasVehicle) {
    this.blocked = hasVehicle;
  }

  public boolean isBlocked() {
    return this.blocked;
  }
}
