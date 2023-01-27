package de.hsrm.mi.team3.swtp.services;

import de.hsrm.mi.team3.swtp.domain.Room;
import de.hsrm.mi.team3.swtp.domain.VehicleBot;
import de.hsrm.mi.team3.swtp.domain.VehicleType;
import de.hsrm.mi.team3.swtp.domain.messaging.BackendOperation;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * This class should only be used by python scripts to create and interact with
 * the VehicleBot
 * class.
 */
@Service
public class VehicleBotServiceImplementation implements VehicleBotService {

  @Autowired
  BackendInfoServiceImpl backendInfoService;

  private Room room;

  /**
   * method to get current room from jython to VehicleBotService-instance. method
   * is only called
   * from python-script.
   *
   * @param room
   */
  @Override
  public void setRoom(Room room) {
    this.room = room;
  }

  /**
   * method to create a new VehicleBot. method is only called from python script.
   */
  @Override
  public void createBot() {
    VehicleBot bot = new VehicleBot(room);

    int[] pos = this.getFreeStreetBlock();
    if (pos != null) {
      bot.setCurrentPos(pos[0], pos[1]);
    }

    this.room.setVehicleBot(bot);
  }

  /**
   * method to create a new VehicleBot with specific details. method is only
   * called from pyton
   * script
   *
   * @param rotation
   * @param position
   * @param type
   * @param route
   */
  @Override
  public void createBotWithRoute(List<Character> route) {
    VehicleBot bot = new VehicleBot(room);

    int[] pos = this.getFreeStreetBlock();
    if (pos != null) {
      bot.setCurrentPos(pos[0], pos[1]);
    }
    bot.setRoute(route);

    this.room.setVehicleBot(bot);
  }

  public void createBotWithType(VehicleType vehicleType) {
    VehicleBot bot = new VehicleBot(room);

    int[] pos = this.getFreeStreetBlock();
    if (pos != null) {
      bot.setCurrentPos(pos[0], pos[1]);
    }
    bot.setVehicleModel(vehicleType);

    this.room.setVehicleBot(bot);
  }

  public void createBotWithRouteAndType(List<Character> route, VehicleType vehicleType) {
    VehicleBot bot = new VehicleBot(room);

    int[] pos = this.getFreeStreetBlock();
    if (pos != null) {
      bot.setCurrentPos(pos[0], pos[1]);
    }
    bot.setRoute(route);
    bot.setVehicleModel(vehicleType);

    this.room.setVehicleBot(bot);
  }

  /**
   * Main method to let VehicleBots drive. send the updated bot to the frontend
   * with each change in
   * position. method is only called from python script
   */
  @Override
  public void driveBot() {
    // TODO checken, ob wirklich in jeder Iteration geprüft wird. Prüfen, ob das
    // doch im JythonScript gehalten werden sollte
    boolean running = !room.getUserList().isEmpty();
    int runde = 0;
    while (running) {
      logger.info("driveBot Runde " + runde);
      for (VehicleBot bot : room.getVehicleBots()) {
        // this.drive(bot);
        sendBot(bot);
        try {
          Thread.sleep(5000);
        } catch (InterruptedException e) {
          e.printStackTrace();
        }
      }
      running = !room.getUserList().isEmpty();
      runde++;
    }
    room.setJythonRunning(false);
    logger.info("driveBot beendet");
  }

  /** Checks and reacts to current StreetBlock-Type */
  private void drive(VehicleBot bot) {
    if (bot.getCurrentStreetBlock() != null) {
      String blockName = bot.getCurrentStreetBlock().getBlockType();
      if (!bot.isStreetblockInvalid(blockName)) {
        if (blockName.contains("-t") || blockName.contains("-cross")) {
          if (bot.hasFixRoute()) {
            bot.followScript();
          } else {
            bot.turnRandom(bot.getCurrentStreetBlock().getExits());
          }
        } else if (blockName.contains("-curve")) {
          if (bot.getCurrentStreetBlock().getExits()[0] == bot.getCurrentRotation()) {
            bot.turn(bot.getCurrentStreetBlock().getExits()[1]);
          } else {
            bot.turn(bot.getCurrentStreetBlock().getExits()[0]);
          }
        } else {
          bot.moveToNextBlock();
        }
      }
      this.room.updateVehicleBots(bot, bot.getCurrentPos()[0], bot.getCurrentPos()[1]);
    }
  }

  @Override
  public void sendBot(VehicleBot bot) {
    backendInfoService.sendVehicle(
        "vehicle/" + this.room.getRoomNumber(), bot.getId(), BackendOperation.UPDATE, bot);
  }

  /**
   * method iterates through StreetBlockMap of room and return the first free
   * Streetblock
   * coordinates
   *
   * @return
   */
  private int[] getFreeStreetBlock() {
    if (this.room.getRoadMap().getStreetBlockMap().length > 0) {
      for (int i = 0; i < this.room.getRoadMap().getStreetBlockMap().length; i++) {
        for (int j = 0; j < this.room.getRoadMap().getStreetBlockMap().length; j++)
          if (this.room.getRoadMap().getStreetBlock(i, j) != null
              && !this.room.getRoadMap().getStreetBlock(i, j).isBlocked()) {
            return new int[] {
                i + 1, j + 1
            }; // +1 damit die richtigen Koordinaten ins frontend kommen
          }
      }
    }
    return new int[] {};
  }
}
