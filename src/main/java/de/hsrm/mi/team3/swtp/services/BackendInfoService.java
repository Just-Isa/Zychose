package de.hsrm.mi.team3.swtp.services;

import de.hsrm.mi.team3.swtp.domain.Room;
import de.hsrm.mi.team3.swtp.domain.User;
import de.hsrm.mi.team3.swtp.domain.Vehicle;
import de.hsrm.mi.team3.swtp.domain.messaging.BackendMouseMessage;
import de.hsrm.mi.team3.swtp.domain.messaging.BackendOperation;
import org.springframework.stereotype.Service;

@Service
public interface BackendInfoService {
  public void sendRoom(String topicname, BackendOperation operation, Room room);

  public void sendUser(String topicname, BackendOperation operation, User user);

  public void sendMouse(String topicname, BackendMouseMessage mouse);

  public void sendVehicle(String topicname, BackendOperation operation, Vehicle vehicle);
}
