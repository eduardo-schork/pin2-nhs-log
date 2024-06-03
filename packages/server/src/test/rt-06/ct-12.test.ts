import fleetVehicleRepository from "../../shared/repositories/fleet-vehicle.repository";
import initializeDatabase from "../arrange/initialize-database";

describe("CT-12", () => {
    describe("GIVEN an existing vehicle into a fleet to delete", () => {
        it("SHOULD not delete the vehicle successfully", async () => {
            // Arrange
            await initializeDatabase();
            const existingVehicleId = "10";

            // Act
            const isDeleted = await fleetVehicleRepository.delete({ id: existingVehicleId });

            // Assert
            expect(isDeleted).toEqual(false);
        });
    });
});
