package de.hsrm.mi.team3.swtp.services;

import de.hsrm.mi.team3.swtp.domain.Room;
import de.hsrm.mi.team3.swtp.domain.VehicleBot;
import de.hsrm.mi.team3.swtp.domain.VehicleType;
import de.hsrm.mi.team3.swtp.domain.messaging.BackendOperation;
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
   * method to create a new VehicleBot with a fixed route. method is only called from pyton script
   *
   * @param route String, should have this form "l,r,l,s"
   */
  @Override
  public void createBotWithRoute(String route) {
    VehicleBot bot = new VehicleBot(room);

    int[] pos;
    if (bot.getVehicleModel() == VehicleType.BICYCLE) {
      pos = getFreeSidewalk();
    } else {
      pos = getFreeStreetBlock();
    }
    bot.setCurrentPos(pos[0], pos[1]);
    String[] routeList = route.split(",");
    bot.setRoute(routeList);
    bot.setCurrentRotation(bot.getCurrentStreetBlock().getExits()[0]);

    this.room.setVehicleBot(bot);
  }

  /**
   * method to create a new VehicleBot with a specific vehicle type. method is only called from
   * pyton script
   *
   * @param vehicleType String input
   */
  public void createBotWithType(String vehicleType) {
    VehicleBot bot = new VehicleBot(room);
    for (VehicleType vt : VehicleType.values()) {
      if (vt.getType().equals(vehicleType)) {
        bot.setVehicleType(vt);
        break;
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
   * method to create a new VehicleBot with a fixed route and a specific vehicle type. method is
   * only called from pyton script
   *
   * @param route
   * @param vehicleType
   */
  public void createBotWithRouteAndType(String route, String vehicleType) {
    VehicleBot bot = new VehicleBot(room);

    for (VehicleType vt : VehicleType.values()) {
      if (vt.getType().equals(vehicleType)) {
        bot.setVehicleType(vt);
        break;
      }
    }
    int[] pos;
    if (bot.getVehicleModel() == VehicleType.BICYCLE) {
      pos = getFreeSidewalk();
    } else {
      pos = getFreeStreetBlock();
    }
    bot.setCurrentPos(pos[0], pos[1]);
    String[] routeList = route.split(",");
    bot.setRoute(routeList);
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
        this.checkBlockAndDrive(bot);
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
  private void checkBlockAndDrive(VehicleBot bot) {
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
          int ownEntrance =
              bot.getCurrentRotation() > 90
                  ? bot.getCurrentRotation() - 180
                  : bot.getCurrentRotation() + 180;
          if (bot.getCurrentStreetBlock().getExits()[0] == ownEntrance) {
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
   * sends vehicleBots to frontend
   *
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
   * @return first free StreetBlock that is straight and without rotation
   */
  private int[] getFreeStreetBlock() {
    if (this.room.getRoadMap().getStreetBlockMap().length > 0) {
      for (int i = 0; i < this.room.getRoadMap().getStreetBlockMap().length; i++) {
        for (int j = 0; j < this.room.getRoadMap().getStreetBlockMap().length; j++)
          if (this.room.getRoadMap().getStreetBlock(i, j) != null
              && !this.room.getRoadMap().getStreetBlock(i, j).isBlocked()
              && this.room.getRoadMap().getStreetBlock(i, j).getBlockType().contains("straight")
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
   * method iterates through StreetBlockMap of room and return the first free Streetblock
   * coordinates
   *
   * @return first free StreetBlock that is straight, without rotation is a "sidewalk"
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
