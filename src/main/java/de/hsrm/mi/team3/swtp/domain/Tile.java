package de.hsrm.mi.team3.swtp.domain;

public class Tile {

  private String type;
  private int rotation;
  private int[] position;
  private boolean blocked;

  public Tile(String tileType, int rotation, int posX, int posY, boolean blocked) {
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

  public void isBlocked(boolean hasVehicle) {
    this.blocked = hasVehicle;
  }

  public boolean isBlocked() {
    return this.blocked;
  }
}
