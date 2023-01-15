package de.hsrm.mi.team3.swtp.domain;

import java.util.ArrayList;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;

/*
 * Room class that is used within the RoomBox.
 * This class has two different constructors.
 */
public class Room {

	private String roomName;
	private int roomNumber;
	private List<User> userList;
	private String jythonScript;
	private String roomMap = "streetType: straight-road,rotation:90,posX:1,posY:1},{streetType:straight-road,rotation:90,posX:1,posY:2}";
	private Tile[][] tileMap;

	public Room(int roomNumber) {
		this.roomName = "default-name";
		this.roomNumber = roomNumber;
		this.userList = new ArrayList<User>();
		this.jythonScript = "";
	}

	public Room(String roomName, int roomNumber) {
		this.roomName = roomName;
		this.roomNumber = roomNumber;
		this.userList = new ArrayList<User>();
		this.jythonScript = "";
	}

	private void analyseMap() {
		// verwandelt String in Tiles und speichert sie in tileMap
	}

	public String getRoomName() {
		return roomName;
	}

	public void setRoomName(String roomName) {
		this.roomName = roomName;
	}

	public List<User> getUserList() {
		return userList;
	}

	public void addUserToList(User user) {
		this.userList.add(user);
	}

	public void removeUserFromList(User user) {
		this.userList.remove(user);
	}

	public int getRoomNumber() {
		return roomNumber;
	}

	public void setRoomNumber(int roomNumber) {
		this.roomNumber = roomNumber;
	}

	public String getJythonScript() {
		return jythonScript;
	}

	public void setJythonScript(String jythonScript) {
		this.jythonScript = jythonScript;
	}

	public void setRoomMap(String map) {
		this.roomMap = map;
	}

	public String getRoomMap() {
		return this.roomMap;
	}

	public Map<VehicleNeighbour, Tile> getNeighbours(int currentX, int currentY, int rotation) {
		Map<VehicleNeighbour, Tile> neighbours = new EnumMap<>(VehicleNeighbour.class);
		int x = currentX, y = currentY;
		analyseMap();
		if (rotation == 90) {
			// assumed einfache Drehung nach Bildschirm-rechts
			neighbours.put(VehicleNeighbour.VEHICLELEFT, tileMap[x][y - 1]);
			neighbours.put(VehicleNeighbour.VEHICLETOPLEFT, tileMap[x + 1][y - 1]);
			neighbours.put(VehicleNeighbour.VEHICLETOP, tileMap[x + 1][y]);
			neighbours.put(VehicleNeighbour.VEHICLETOPRIGHT, tileMap[x + 1][y + 1]);
			neighbours.put(VehicleNeighbour.VEHICLERIGHT, tileMap[x][y + 1]);
		} else if (rotation == 180) {
			// assumed Drehung nach Bildschirm-unten
			neighbours.put(VehicleNeighbour.VEHICLELEFT, tileMap[x + 1][y]);
			neighbours.put(VehicleNeighbour.VEHICLETOPLEFT, tileMap[x + 1][y + 1]);
			neighbours.put(VehicleNeighbour.VEHICLETOP, tileMap[x][y + 1]);
			neighbours.put(VehicleNeighbour.VEHICLETOPRIGHT, tileMap[x - 1][y + 1]);
			neighbours.put(VehicleNeighbour.VEHICLERIGHT, tileMap[x - 1][y]);

		} else if (rotation == 270) {
			// assumed Drehung nach Bildschirm-links
			neighbours.put(VehicleNeighbour.VEHICLELEFT, tileMap[x][y + 1]);
			neighbours.put(VehicleNeighbour.VEHICLETOPLEFT, tileMap[x - 1][y + 1]);
			neighbours.put(VehicleNeighbour.VEHICLETOP, tileMap[x - 1][y]);
			neighbours.put(VehicleNeighbour.VEHICLETOPRIGHT, tileMap[x - 1][y - 1]);
			neighbours.put(VehicleNeighbour.VEHICLERIGHT, tileMap[x][y - 1]);

		} else {
			// keine Drehung Ausrichtung nach Bildschirm-oben
			neighbours.put(VehicleNeighbour.VEHICLELEFT, tileMap[x - 1][y]);
			neighbours.put(VehicleNeighbour.VEHICLETOPLEFT, tileMap[x - 1][y - 1]);
			neighbours.put(VehicleNeighbour.VEHICLETOP, tileMap[x][y - 1]);
			neighbours.put(VehicleNeighbour.VEHICLETOPRIGHT, tileMap[x + 1][y - 1]);
			neighbours.put(VehicleNeighbour.VEHICLERIGHT, tileMap[x + 1][y]);
		}

		return neighbours;
	}
}
