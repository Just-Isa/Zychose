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
    VehicleBot bot = new VehicleBot(room);

    int[] pos;
    if (bot.getVehicleModel() == VehicleType.BICYCLE) {
      pos = getFreeSidewalk();
    } else {
      pos = getFreeStreetBlock();
    }

    bot.setCurrentPos(pos[0], pos[1]);
    bot.setCurrentRotation(bot.getCurrentStreetBlock().getExits()[0]);
    this.room.setVehicleBot(bot);
  }

  /**
   * method to create a new VehicleBot with specific details. method is only called from pyton
   * script
   *
   * @param route
   */
  @Override
  public void createBotWithRoute(List<Character> route) {
    VehicleBot bot = new VehicleBot(room);

    int[] pos;
    if (bot.getVehicleModel() == VehicleType.BICYCLE) {
      pos = getFreeSidewalk();
    } else {
      pos = getFreeStreetBlock();
    }
    bot.setCurrentPos(pos[0], pos[1]);
    bot.setRoute(route);
    bot.setCurrentRotation(bot.getCurrentStreetBlock().getExits()[0]);

    this.room.setVehicleBot(bot);
  }

  /**
   * @param vehicleType
   */
  public void createBotWithType(String vehicleType) {
    // TODO VehicleTypes als String einlesen + richtige Methode zum Startpunkt
    // finden nutzen
    VehicleBot bot = new VehicleBot(room);
    for (VehicleType vt : VehicleType.values()) {
      if (vt.getType().equals(vehicleType)) {
        bot.setVehicleModel(vt);
      }
    }
    int[] pos;
    if (bot.getVehicleModel() == VehicleType.BICYCLE) {
      pos = getFreeSidewalk();
    } else {
      pos = getFreeStreetBlock();
    }
    bot.setCurrentPos(pos[0], pos[1]);

    bot.setCurrentRotation(bot.getCurrentStreetBlock().getExits()[0]);

    this.room.setVehicleBot(bot);
  }

  /**
   * @param route
   * @param vehicleType
   */
  public void createBotWithRouteAndType(List<Character> route, String vehicleType) {
    VehicleBot bot = new VehicleBot(room);

    for (VehicleType vt : VehicleType.values()) {
      if (vt.getType().equals(vehicleType)) {
        bot.setVehicleModel(vt);
      }
    }
    int[] pos;
    if (bot.getVehicleModel() == VehicleType.BICYCLE) {
      pos = getFreeSidewalk();
    } else {
      pos = getFreeStreetBlock();
    }
    bot.setCurrentPos(pos[0], pos[1]);
    bot.setRoute(route);
    bot.setCurrentRotation(bot.getCurrentStreetBlock().getExits()[0]);

    this.room.setVehicleBot(bot);
  }

  /**
   * Main method to let VehicleBots drive. send the updated bot to the frontend with each change in
   * position. method is only called from python script
   */
  @Override
  public void driveBot() {
    boolean running = !room.getUserList().isEmpty();
    int runde = 0;
    while (running) {
      logger.info("driveBot Runde " + runde);
      for (VehicleBot bot : room.getVehicleBots()) {
        this.drive(bot);
        sendBot(bot);
      }
      try {
        Thread.sleep(750);
      } catch (InterruptedException e) {
        e.printStackTrace();
      }
      running = !room.getUserList().isEmpty();
      runde++;
    }
    room.setJythonRunning(false);
    room.getVehicleBots().clear();
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
          int ownEntrence =
              bot.getCurrentRotation() > 90
                  ? bot.getCurrentRotation() - 180
                  : bot.getCurrentRotation() + 180;
          if (bot.getCurrentStreetBlock().getExits()[0] == ownEntrence) {
            bot.turn(bot.getCurrentStreetBlock().getExits()[1]);
          } else {
            bot.turn(bot.getCurrentStreetBlock().getExits()[0]);
          }
        } else {
          bot.moveToNextBlock();
        }
      }
    }
  }

  /**
   * @param bot
   */
  @Override
  public void sendBot(VehicleBot bot) {
    backendInfoService.sendVehicle(
        "vehicle/" + this.room.getRoomNumber(), bot.getId(), BackendOperation.UPDATE, bot);
  }

  /**
   * method iterates through StreetBlockMap of room and return the first free Streetblock
   * coordinates
   *
   * @return
   */
  private int[] getFreeStreetBlock() {
    if (this.room.getRoadMap().getStreetBlockMap().length > 0) {
      for (int i = 0; i < this.room.getRoadMap().getStreetBlockMap().length; i++) {
        for (int j = 0; j < this.room.getRoadMap().getStreetBlockMap().length; j++)
          if (this.room.getRoadMap().getStreetBlock(i, j) != null
              && !this.room.getRoadMap().getStreetBlock(i, j).isBlocked()
              && this.room
                  .getRoadMap()
                  .getStreetBlock(i, j)
                  .getBlockType()
                  .contains("road-straight")
              && this.room.getRoadMap().getStreetBlock(i, j).getBlockRotation() == 0) {
            this.room.getRoadMap().getStreetBlock(i, j).isBlocked(true);
            return new int[] {
              i + 1, j + 1
            }; // +1 damit die richtigen Koordinaten ins frontend kommen
          }
      }
    }
    return new int[] {};
  }

  /**
   * @return
   */
  private int[] getFreeSidewalk() {
    if (this.room.getRoadMap().getStreetBlockMap().length > 0) {
      for (int i = 0; i < this.room.getRoadMap().getStreetBlockMap().length; i++) {
        for (int j = 0; j < this.room.getRoadMap().getStreetBlockMap().length; j++)
          if (this.room.getRoadMap().getStreetBlock(i, j) != null
              && !this.room.getRoadMap().getStreetBlock(i, j).isBlocked()
              && this.room
                  .getRoadMap()
                  .getStreetBlock(i, j)
                  .getBlockType()
                  .contains("sidewalk-straight")
              && this.room.getRoadMap().getStreetBlock(i, j).getBlockRotation() == 0) {
            this.room.getRoadMap().getStreetBlock(i, j).isBlocked(true);
            return new int[] {
              i + 1, j + 1
            }; // +1 damit die richtigen Koordinaten ins frontend kommen
          }
      }
    }
    return new int[] {};
  }
}
