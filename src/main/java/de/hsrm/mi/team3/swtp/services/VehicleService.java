package de.hsrm.mi.team3.swtp.services;

import org.springframework.stereotype.Service;

import de.hsrm.mi.team3.swtp.domain.Vehicle;

@Service
public interface VehicleService {
    public void rotateLeft(Vehicle vehicle);

    public void rotateRight(Vehicle vehicle);

    public void moveForward(Vehicle vehicle);

    public void moveBackward(Vehicle vehicle);

    public void carRunOutSpeed(Vehicle vehicle);
}
