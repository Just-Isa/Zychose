package de.hsrm.mi.team3.swtp.domain;

import java.util.Arrays;

public class Vehicle {
  private final double runOutSpeed = -0.1;
  private final double maxSpeed = 0.6;
  private final double handling = 0.15;
  private final double acceleration = 0.2;
  private final double brakeSpeed = 0.3;

  private double currentSpeed = 0;
  private double[] rotationVector = {0, 0, 0};
  private double[] posVector = {0, 0, 0};

  public Vehicle(double[] posVector) {
    this.posVector = posVector;
  }

  public Vehicle() {}

  public double getCurrentSpeed() {
    return currentSpeed;
  }

  public void setCurrentSpeed(double currentSpeed) {
    this.currentSpeed = currentSpeed;
  }

  public double getRunOutSpeed() {
    return runOutSpeed;
  }

  public double getMaxSpeed() {
    return maxSpeed;
  }

  public double getHandling() {
    return handling;
  }

  public double getAcceleration() {
    return acceleration;
  }

  public double getBrakeSpeed() {
    return brakeSpeed;
  }

  public double[] getRotationVector() {
    return rotationVector;
  }

  public double getRotationX() {
    return rotationVector[0];
  }

  public double getRotationY() {
    return rotationVector[1];
  }

  public double getRotationZ() {
    return rotationVector[2];
  }

  public void setRotationX(double rotationX) {
    rotationVector[0] = rotationX % (2 * Math.PI);
  }

  public void setRotationY(double rotationY) {
    rotationVector[1] = rotationY % (2 * Math.PI);
  }

  public void setRotationZ(double rotationZ) {
    rotationVector[2] = rotationZ % (2 * Math.PI);
  }

  public void setRotationVector(double[] rotationVector) {
    this.rotationVector = rotationVector;
  }

  public double[] getPosVector() {
    return posVector;
  }

  public double getPosX() {
    return this.posVector[0];
  }

  public double getPosY() {
    return this.posVector[1];
  }

  public double getPosZ() {
    return this.posVector[2];
  }

  public void setPosX(double posX) {
    this.posVector[0] = posX;
  }

  public void setPosY(double posY) {
    this.posVector[1] = posY;
  }

  public void setPosZ(double posZ) {
    this.posVector[2] = posZ;
  }

  public void setPosVector(double[] posVector) {
    this.posVector = posVector;
  }

  @Override
  public String toString() {
    return "Vehicle [currentSpeed="
        + currentSpeed
        + ", rotationVector="
        + Arrays.toString(rotationVector)
        + ", posVector="
        + Arrays.toString(posVector)
        + "]";
  }
}
