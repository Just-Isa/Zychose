package de.hsrm.mi.team3.swtp.services;

import de.hsrm.mi.team3.swtp.domain.Room;
import de.hsrm.mi.team3.swtp.domain.VehicleBot;
import de.hsrm.mi.team3.swtp.domain.VehicleType;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

/**
 * VehicleBotService is the interface used by python scripts saved to rooms. Only python scripts
 * should use this.
 */
@Service
public interface VehicleBotService {

  Logger logger = LoggerFactory.getLogger(VehicleBotService.class);

  public void setRoom(Room room);

  public void createBotWithRoute(List<Character> route);

  public void createBotWithType(VehicleType vehicleType);

  public void createBotWithRouteAndType(List<Character> route, VehicleType vehicleType);

  public void createBot();

  public void driveBot();

  public void sendBot(VehicleBot bot);
}
