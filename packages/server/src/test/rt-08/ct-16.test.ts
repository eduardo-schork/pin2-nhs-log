import initializeDatabase from "../arrange/initialize-database";
import fleetRepository from "../../shared/repositories/fleet.repository";

describe("CT-16", () => {
    describe("GIVEN a fleet", () => {
        it("SHOULD delete the fleet successfully", async () => {
            // Arrange
            await initializeDatabase();
            const fleetId = "168";

            // Act
            const deleteFleetResult = await fleetRepository.delete({ id: fleetId });

            // Assert
            expect(deleteFleetResult).toBe(true);
        });
    });
});
