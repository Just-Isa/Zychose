package de.hsrm.mi.team3.swtp.domain;

import java.util.Arrays;

public class Vehicle {

  private static final double RUN_OUT_SPEED = -0.1;
  private static final double MAX_SPEED = 0.6;
  private static final double HANDLING = 0.15;
  private static final double ACCELERATION = 0.2;
  private static final double BRAKE_SPEED = 0.3;

  private String vehicleType;
  private double currentSpeed;
  private double[] rotationVector;
  private double[] posVector;

  public Vehicle(String vehicleType) {
    this.vehicleType = vehicleType;
    this.currentSpeed = 0;
    this.rotationVector = new double[] { 0, 0, 0 };
    this.posVector = new double[] { 0, 0, 0 };
  }

  public Vehicle(String vehicleType, double[] posVector) {
    this.vehicleType = vehicleType;
    this.posVector = posVector;
    this.currentSpeed = 0;

  }

  public double getCurrentSpeed() {
    return currentSpeed;
  }

  public void setCurrentSpeed(double currentSpeed) {
    this.currentSpeed = currentSpeed;
  }

  public double getRunOutSpeed() {
    return RUN_OUT_SPEED;
  }

  public double getMaxSpeed() {
    return MAX_SPEED;
  }

  public double getHandling() {
    return HANDLING;
  }

  public double getAcceleration() {
    return ACCELERATION;
  }

  public double getBrakeSpeed() {
    return BRAKE_SPEED;
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

  public String getVehicleType() {
    return vehicleType;
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
