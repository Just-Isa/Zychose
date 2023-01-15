package de.hsrm.mi.team3.swtp.domain;

public class VehicleBot {

  private VehicleBehaviour behaviour = VehicleBehaviour.DEFENSIVE;
  private int[] currentPos = { 0, 0 };
  private int currentRotation = 0;

  public VehicleBot(int[] positon, int rotation, VehicleBehaviour behaviour) {
    this.currentPos = positon;
    this.currentRotation = rotation;
    this.behaviour = behaviour;
  }

  public VehicleBot(int[] positon, int rotation) {
    this.currentPos = positon;
    this.currentRotation = rotation;
  }

  public VehicleBot() {
  }

  public void moveToNextTile() {
    // this.currentPos[0]=map.getX[this.getCurrentX()+direction]
  }

  public void turn(int rotation) {
    this.currentRotation += rotation;
    moveToNextTile();
  }

  public int getCurrentX() {
    return this.currentPos[0];
  }

  public void setCurrentX(int x) {
    this.currentPos[0] = x;
  }

  public int getCurrentY() {
    return this.currentPos[1];
  }

  public void setCurrentY(int y) {
    this.currentPos[1] = y;
  }

  public int getCurrentRotation() {
    return this.currentRotation;
  }

  public void setCurrentRotation(int rotation) {
    this.currentRotation = rotation;
  }

  public VehicleBehaviour getBehaviour() {
    return this.behaviour;
  }
}
