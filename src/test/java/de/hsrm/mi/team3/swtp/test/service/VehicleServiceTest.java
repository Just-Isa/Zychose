package de.hsrm.mi.team3.swtp.test.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;

import static org.assertj.core.api.Assertions.assertThat;

import de.hsrm.mi.team3.swtp.domain.Vehicle;
import de.hsrm.mi.team3.swtp.services.VehicleService;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
public class VehicleServiceTest {
    @Autowired
    VehicleService vehicleService;

    private Vehicle vehicle;

    private final double MAX_SPEED = 0.6;

    @BeforeEach
    public void vehicleInit() {
        vehicle = new Vehicle();
    }

    @Test
    @DisplayName("Vehicle: Rotate stopped vehicle left")
    void testLeftRotationNoSpeed() {

        double rotationYBefore = vehicle.getRotationY();
        vehicle.setCurrentSpeed(0);
        assertThat(vehicle.getCurrentSpeed()).isEqualTo(0);
        vehicleService.rotateLeft(vehicle);
        assertThat(vehicle.getRotationY()).isEqualTo(rotationYBefore);

    }

    @Test
    @DisplayName("Vehicle: Rotate moving vehicle left")
    void testLeftRotationWithSpeed() {
        double rotationYBefore = vehicle.getRotationY();
        vehicle.setCurrentSpeed(MAX_SPEED);
        assertThat(vehicle.getCurrentSpeed()).isPositive();
        vehicleService.rotateLeft(vehicle);
        assertThat(vehicle.getRotationY()).isGreaterThan(rotationYBefore);
    }

}
