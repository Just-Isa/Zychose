package de.hsrm.mi.team3.swtp.domain;

import lombok.Getter;
import lombok.Setter;

/**
 * Tile repraesentiert das einzelne Strassenstueck Es beinhaltet alle Informationen, die fuer die
 * Bot Fahrzeuge relevant sind Tiles landen in der RoadMap
 */
@Getter
@Setter
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

  /*
   * blocked und isBlocked geben an,
   * ob sich ein anderes Fahrzeug auf dem Feld befindet
   */

  public void setExits() {
    String[] input = this.type.split("-");
    if (input.length <= 1) {
      return;
    }
    switch (input[1]) {
      case "cross":
        this.exits = new int[] {0, 90, 180, 270};
        break;
      case "straight":
        this.exits = new int[] {90, 270};
        break;
      case "curve":
        this.exits = new int[] {270, 0};
        break;
      case "t":
        this.exits = new int[] {180, 270, 0};
        break;
      case "dead":
        this.exits = new int[] {270};
        break;
      case "finish":
        this.exits = new int[] {0, 180};
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
    return (this.type.contains("-t") || this.type.contains("-cross"));
  }
}
