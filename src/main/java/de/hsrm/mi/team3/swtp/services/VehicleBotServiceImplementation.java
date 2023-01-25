package de.hsrm.mi.team3.swtp.services;

import de.hsrm.mi.team3.swtp.domain.Room;
import de.hsrm.mi.team3.swtp.domain.VehicleBot;
import de.hsrm.mi.team3.swtp.domain.VehicleType;
import de.hsrm.mi.team3.swtp.domain.messaging.BackendOperation;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * This class should only be used by python scripts to create and interact with the VehicleBot
 * class.
 */
@Service
public class VehicleBotServiceImplementation implements VehicleBotService {

  @Autowired BackendInfoServiceImpl backendInfoService;

  private Room room;

  /**
   * method to get current room from jython to VehicleBotService-instance. method is only called
   * from python-script.
   *
   * @param room
   */
  @Override
  public void setRoom(Room room) {
    this.room = room;
  }

  /** method to create a new VehicleBot. method is only called from python script. */
  @Override
  public void createBot() {
    String id = Integer.toString(room.getVehicleBots().size() + 1);
    VehicleBot bot = new VehicleBot(room, id);

    this.room.setVehicleBot(bot);
  }

  /**
   * method to create a new VehicleBot with specific details. method is only called from pyton
   * script
   *
   * @param rotation
   * @param position
   * @param type
   * @param route
   */
  @Override
  public void createSpecificBot(
      int rotation, int posX, int posY, VehicleType type, List<Character> route) {
    String id = Integer.toString(room.getVehicleBots().size() + 1);
    VehicleBot bot = new VehicleBot(room, id);

    bot.setCurrentRotation(rotation);
    bot.setCurrentPos(posX, posY);
    bot.setVehicleModel(type);
    bot.setRoute(route);

    this.room.setVehicleBot(bot);
  }

  /** method to let VehicleBots drive. method is only called from python script */
  @Override
  public void driveBot() {
    for (VehicleBot bot : room.getVehicleBots()) {
      bot.followScript();
      sendBot(bot);
    }
  }

  @Override
  public void sendBot(VehicleBot bot) {
    backendInfoService.sendVehicle(
        "vehicle/" + this.room.getRoomNumber(), "bot1", BackendOperation.UPDATE, bot);
    // TODO botID senden
  }
}
