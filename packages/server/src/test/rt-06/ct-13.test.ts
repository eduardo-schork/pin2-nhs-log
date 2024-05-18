import fleetVehicleRepository from "../../shared/repositories/fleet-vehicle.repository";
import initializeDatabase from "../arrange/initialize-database";

describe("CT-13", () => {
    describe("GIVEN an existing vehicle to delete", () => {
        it("SHOULD delete the vehicle successfully", async () => {
            // Arrange
            await initializeDatabase();
            const existingVehicleId = "10";

            // Act
            const isDeleted = await fleetVehicleRepository.delete({ id: existingVehicleId });

            // Assert
            expect(isDeleted).toEqual(true);
        });
    });
});
