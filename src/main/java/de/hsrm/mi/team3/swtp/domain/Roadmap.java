package de.hsrm.mi.team3.swtp.domain;

import java.util.EnumMap;
import java.util.Map;

/**
 * RoadMap wird aus dem roomMap String erstellt und mit Tiles gefuellt, damit nicht bei jeder
 * Bewegung eines Fahrzeugs der String neu analysiert werden muss
 */
public class Roadmap {

  private StreetBlock[][] tileMap;

  public Roadmap(String mapstring) {
    // TODO split String and convert into Tiles
  }

  public Roadmap(Roadmap existingMap) {
    // TODO copy maps?
  }

  /**
   * @param x Koordinate von der die Nachbarn geholt werden sollen
   * @param y Koordinate von der die Nachbarn geholt werden sollen
   * @param rotation Richtung in welche nach Nachbarn gesucht werden soll
   * @return EnumMap mit den Nachbar Tiles
   */
  public Map<VehicleNeighbour, StreetBlock> getNeighbours(int x, int y, int rotation) {
    Map<VehicleNeighbour, StreetBlock> neighbours = new EnumMap<>(VehicleNeighbour.class);
    if (rotation == 90) {
      // Drehung nach Bildschirm-rechts
      neighbours.put(VehicleNeighbour.VEHICLELEFT, getTile(x, y - 1));
      neighbours.put(VehicleNeighbour.VEHICLETOPLEFT, getTile(x + 1, y - 1));
      neighbours.put(VehicleNeighbour.VEHICLETOP, getTile(x + 1, y));
      neighbours.put(VehicleNeighbour.VEHICLETOPRIGHT, getTile(x + 1, y + 1));
      neighbours.put(VehicleNeighbour.VEHICLERIGHT, getTile(x, y + 1));
    } else if (rotation == 180) {
      // Drehung nach Bildschirm-unten
      neighbours.put(VehicleNeighbour.VEHICLELEFT, getTile(x + 1, y));
      neighbours.put(VehicleNeighbour.VEHICLETOPLEFT, getTile(x + 1, y + 1));
      neighbours.put(VehicleNeighbour.VEHICLETOP, getTile(x, y + 1));
      neighbours.put(VehicleNeighbour.VEHICLETOPRIGHT, getTile(x - 1, y + 1));
      neighbours.put(VehicleNeighbour.VEHICLERIGHT, getTile(x - 1, y));

    } else if (rotation == 270) {
      // Drehung nach Bildschirm-links
      neighbours.put(VehicleNeighbour.VEHICLELEFT, getTile(x, y + 1));
      neighbours.put(VehicleNeighbour.VEHICLETOPLEFT, getTile(x - 1, y + 1));
      neighbours.put(VehicleNeighbour.VEHICLETOP, getTile(x - 1, y));
      neighbours.put(VehicleNeighbour.VEHICLETOPRIGHT, getTile(x - 1, y - 1));
      neighbours.put(VehicleNeighbour.VEHICLERIGHT, getTile(x, y - 1));

    } else {
      // keine Drehung Ausrichtung nach Bildschirm-oben
      neighbours.put(VehicleNeighbour.VEHICLELEFT, getTile(x - 1, y));
      neighbours.put(VehicleNeighbour.VEHICLETOPLEFT, getTile(x - 1, y - 1));
      neighbours.put(VehicleNeighbour.VEHICLETOP, getTile(x, y - 1));
      neighbours.put(VehicleNeighbour.VEHICLETOPRIGHT, getTile(x + 1, y - 1));
      neighbours.put(VehicleNeighbour.VEHICLERIGHT, getTile(x + 1, y));
    }

    return neighbours;
  }

  public void setTile(String tilename, int rotation, int x, int y, boolean blocked) {
    this.tileMap[x][y] = new StreetBlock(tilename, rotation, x, y, blocked);
  }

  public void setTile(StreetBlock existingTile) {
    this.tileMap[existingTile.getTilePosition()[0]][existingTile.getTilePosition()[1]] =
        existingTile;
  }

  public StreetBlock getTile(int x, int y) {
    if (this.tileMap[x][y] != null) {
      return this.tileMap[x][y];
    } else {
      return null;
    }
  }
}
