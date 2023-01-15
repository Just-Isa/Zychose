package de.hsrm.mi.team3.swtp.domain;

import java.util.EnumMap;
import java.util.Map;

public class Roadmap {

  private Tile[][] tileMap;

  public Roadmap(String mapstring) {
    // split String and convert into Tiles
  }

  public Roadmap(Roadmap existingMap) {
    // copy maps
  }

  public Map<VehicleNeighbour, Tile> getNeighbours(int x, int y, int rotation) {
    Map<VehicleNeighbour, Tile> neighbours = new EnumMap<>(VehicleNeighbour.class);
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
    this.tileMap[x][y] = new Tile(tilename, rotation, x, y, blocked);
  }

  public void setTile(Tile existingTile) {
    this.tileMap[existingTile.getTilePosition()[0]][existingTile.getTilePosition()[1]] =
        existingTile;
  }

  public Tile getTile(int x, int y) {
    if (this.tileMap[x][y] != null) {
      return this.tileMap[x][y];
    } else {
      return null;
    }
  }
}
