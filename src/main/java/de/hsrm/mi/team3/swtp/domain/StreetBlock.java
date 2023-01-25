package de.hsrm.mi.team3.swtp.domain;

/**
 * Tile repraesentiert das einzelne Strassenstueck Es beinhaltet alle Informationen, die fuer die
 * Bot Fahrzeuge relevant sind Tiles landen in der RoadMap
 */
public class StreetBlock {

  private String type;
  private int rotation;
  private int[] position = {0, 0};
  private boolean blocked;
  private int[] exits;

  public StreetBlock(String blockType, int rotation, int posX, int posY, boolean blocked) {
    this.type = blockType;
    this.rotation = rotation;
    this.position[0] = posX;
    this.position[1] = posY;
    this.blocked = blocked;
    setExits();
  }

  public String getBlockType() {
    return this.type;
  }

  public int getBlockRotation() {
    return this.rotation;
  }

  public int[] getBlockPosition() {
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

  public int[] getExits() {
    return this.exits;
  }

  public void setExits() {
    // TODO switch hardcoded directions for data in config
    switch (this.type) {
      case "road-cross":
        this.exits = new int[] {0, 90, 180, 270};
        break;
      case "road-straight":
        this.exits = new int[] {90, 270};
        break;
      case "road-curve":
        this.exits = new int[] {270, 0};
        break;
      case "road-t":
        this.exits = new int[] {180, 270, 0};
        break;
      case "road-dead-end":
        this.exits = new int[] {270};
        break;
      default:
        this.exits = new int[] {};
    }
    if (this.rotation > 0 && this.exits.length > 0 && this.exits.length < 4) {
      for (int i = 0; i < exits.length; i++) {
        int newRotation = this.exits[i] + this.rotation;
        this.exits[i] = newRotation > 270 ? (newRotation - 360) : newRotation;
      }
    }
  }

  public boolean isCrossroad() {
    return (this.type.equals("road-t") || this.type.equals("road-cross"));
  }
}
