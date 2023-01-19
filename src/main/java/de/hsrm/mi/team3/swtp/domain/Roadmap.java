package de.hsrm.mi.team3.swtp.domain;

import java.util.EnumMap;
import java.util.Map;
import org.json.JSONArray;
import org.json.JSONObject;

/**
 * RoadMap wird aus dem roomMap String erstellt und mit Tiles gefuellt, damit nicht bei jeder
 * Bewegung eines Fahrzeugs der String neu analysiert werden muss
 */
public class Roadmap {

  final int SIZE = 100;
  private Tile[][] tileMap = new Tile[SIZE][SIZE];

  public Roadmap(String mapstring) {
    JSONArray jsonArray = new JSONArray(mapstring);
    for (int i = 0; i < jsonArray.length(); i++) {
      JSONObject obj = jsonArray.getJSONObject(i);
      int x = Integer.parseInt(obj.getString("posX"));
      int y = Integer.parseInt(obj.getString("posY"));
      this.tileMap[x][y] =
          new Tile(
              obj.getString("streetType"),
              Integer.parseInt(obj.getString("rotation")),
              x,
              y,
              false);
    }
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
    if (x < 0 || y < 0) {
      return null;
    }
    if (this.tileMap[x][y] != null) {
      return this.tileMap[x][y];
    }
    return null;
  }
}
