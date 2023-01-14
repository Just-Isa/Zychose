package de.hsrm.mi.team3.swtp.services;

import de.hsrm.mi.team3.swtp.domain.Room;
import de.hsrm.mi.team3.swtp.domain.User;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public interface RoomService {
  public void addNewUserToRoom(Room room, User user);

  public void removeUserFromRoom(Room room, User user);

  public List<User> getUserList(Room room);

  public void saveScriptToRoom(MultipartFile file, Room room);

  public User getUserByID(int roomNumber, String sessionID);
}
