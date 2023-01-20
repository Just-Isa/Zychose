package de.hsrm.mi.team3.swtp.test.service;

import static org.assertj.core.api.Assertions.assertThat;

import de.hsrm.mi.team3.swtp.domain.Vehicle;
import de.hsrm.mi.team3.swtp.services.VehicleService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
public class VehicleServiceTest {
    @Autowired
    VehicleService vehicleService;

    private Vehicle vehicle;

    private final double MAX_SPEED = 0.6;
    private final double NO_SPEED = 0;
    private final float DISTANCE = 8;

    @BeforeEach
    public void vehicleInit() {
        vehicle = new Vehicle();
    }

    @Test
    @DisplayName("Vehicle: Rotate stopped vehicle left")
    void testLeftRotationNoSpeed() {
        double rotationYBefore = vehicle.getRotationY();
        vehicle.setCurrentSpeed(0);
        assertThat(vehicle.getCurrentSpeed()).isZero();
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

    @Test
    @DisplayName("Vehicle: Rotate stopped vehicle right")
    void testRightRotationNoSpeed() {
        double rotationYBefore = vehicle.getRotationY();
        vehicle.setCurrentSpeed(0);
        assertThat(vehicle.getCurrentSpeed()).isZero();
        vehicleService.rotateRight(vehicle);
        assertThat(vehicle.getRotationY()).isEqualTo(rotationYBefore);
    }

    @Test
    @DisplayName("Vehicle: Rotate moving vehicle Right")
    void testRightRotationWithSpeed() {
        double rotationYBefore = vehicle.getRotationY();
        vehicle.setCurrentSpeed(MAX_SPEED);
        assertThat(vehicle.getCurrentSpeed()).isPositive();
        vehicleService.rotateRight(vehicle);
        assertThat(vehicle.getRotationY()).isLessThan(rotationYBefore);
    }

    @Test
    @DisplayName("Vehicle: Move vehicle forwards")
    void testMoveVehicleForwards() {
        double xPosBefore = vehicle.getPosX();
        double zPosBefore = vehicle.getPosZ();
        vehicle.setCurrentSpeed(NO_SPEED);
        vehicleService.moveForward(vehicle);
        double xPosAfter = DISTANCE * vehicle.getCurrentSpeed() * Math.sin(vehicle.getRotationY()) + xPosBefore;
        assertThat(vehicle.getPosX()).isEqualTo(xPosAfter);
        assertThat(vehicle.getPosZ())
                .isEqualTo(
                        DISTANCE * vehicle.getCurrentSpeed() * Math.cos(vehicle.getRotationY()) + zPosBefore);
    }

    @Test
    @DisplayName("Vehicle: Move vehicle forward while driving backwards")
    void testMoveVehicleForwardDrivingBackwards() {
        double xPosBefore = vehicle.getPosX();
        double zPosBefore = vehicle.getPosZ();
        vehicle.setCurrentSpeed(-MAX_SPEED);
        vehicleService.moveForward(vehicle);
        double xPosAfter = DISTANCE * vehicle.getCurrentSpeed() * Math.sin(vehicle.getRotationY()) + xPosBefore;
        assertThat(vehicle.getPosX()).isEqualTo(xPosAfter);
        assertThat(vehicle.getPosZ())
                .isEqualTo(
                        DISTANCE * vehicle.getCurrentSpeed() * Math.cos(vehicle.getRotationY()) + zPosBefore);
    }

    @Test
    @DisplayName("Vehicle: Move vehicle backwards")
    void testMoveVehicleBackwards() {
        double xPosBefore = vehicle.getPosX();
        double zPosBefore = vehicle.getPosZ();
        vehicle.setCurrentSpeed(NO_SPEED);
        vehicleService.moveBackward(vehicle);
        double xPosAfter = DISTANCE * vehicle.getCurrentSpeed() * Math.sin(vehicle.getRotationY()) + xPosBefore;
        assertThat(vehicle.getPosX()).isEqualTo(xPosAfter);
        assertThat(vehicle.getPosZ())
                .isEqualTo(
                        DISTANCE * vehicle.getCurrentSpeed() * Math.cos(vehicle.getRotationY()) + zPosBefore);
    }

    @Test
    @DisplayName("Vehicle: Move vehicle backwards while driving forwards")
    void testMoveVehicleBackwardsDrivingForwards() {
        double xPosBefore = vehicle.getPosX();
        double zPosBefore = vehicle.getPosZ();
        vehicle.setCurrentSpeed(-MAX_SPEED);
        vehicleService.moveBackward(vehicle);
        double xPosAfter = DISTANCE * vehicle.getCurrentSpeed() * Math.sin(vehicle.getRotationY()) + xPosBefore;
        assertThat(vehicle.getPosX()).isEqualTo(xPosAfter);
        assertThat(vehicle.getPosZ())
                .isEqualTo(
                        DISTANCE * vehicle.getCurrentSpeed() * Math.cos(vehicle.getRotationY()) + zPosBefore);
    }

    @Test
    @DisplayName("Vehicle: Run out of speed")
    void testVehicleRunOutOfSpeed() {

        // Numbers represent detailed Speed values after slowing down
        vehicle.setCurrentSpeed(MAX_SPEED);
        assertThat(vehicle.getCurrentSpeed()).isEqualTo(MAX_SPEED);
        vehicleService.carRunOutSpeed(vehicle);
        assertThat(vehicle.getCurrentSpeed()).isEqualTo(0.5);
        vehicleService.carRunOutSpeed(vehicle);
        assertThat(vehicle.getCurrentSpeed()).isBetween(0.4, 0.401);
        vehicleService.carRunOutSpeed(vehicle);
        assertThat(vehicle.getCurrentSpeed()).isBetween(0.3, 0.301);
        vehicleService.carRunOutSpeed(vehicle);
        assertThat(vehicle.getCurrentSpeed()).isBetween(0.2, 0.201);
        vehicleService.carRunOutSpeed(vehicle);
        assertThat(vehicle.getCurrentSpeed()).isBetween(0.1, 0.101);
        vehicleService.carRunOutSpeed(vehicle);
        assertThat(vehicle.getCurrentSpeed()).isZero();

        vehicle.setCurrentSpeed(-MAX_SPEED);
        assertThat(vehicle.getCurrentSpeed()).isEqualTo(-MAX_SPEED);
        vehicleService.carRunOutSpeed(vehicle);
        assertThat(vehicle.getCurrentSpeed()).isEqualTo(-0.5);
        vehicleService.carRunOutSpeed(vehicle);
        assertThat(vehicle.getCurrentSpeed()).isBetween(-0.401, -0.4);
        vehicleService.carRunOutSpeed(vehicle);
        assertThat(vehicle.getCurrentSpeed()).isBetween(-0.301, -0.3);
        vehicleService.carRunOutSpeed(vehicle);
        assertThat(vehicle.getCurrentSpeed()).isBetween(-0.201, -0.2);
        vehicleService.carRunOutSpeed(vehicle);
        assertThat(vehicle.getCurrentSpeed()).isBetween(-0.101, -0.1);
        vehicleService.carRunOutSpeed(vehicle);
        assertThat(vehicle.getCurrentSpeed()).isZero();
    }
}
