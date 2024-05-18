import fleetVehicleRepository from "../../shared/repositories/fleet-vehicle.repository";
import initializeDatabase from "../arrange/initialize-database";

describe("CT-11", () => {
    describe("GIVEN an existing vehicle to update", () => {
        it("SHOULD update the vehicle successfully", async () => {
            // Arrange
            await initializeDatabase();

            const updatedVehicleData = {
                id: 15,
                model: "Corvette",
                plate: "BM19TDG",
                cpfDriver: "64400591316",
                renavam: "53782038312",
            };

            // Act
            const updatedVehicle = await fleetVehicleRepository.update({
                // @ts-ignore
                data: updatedVehicleData,
            });

            // Assert
            expect(updatedVehicle).toEqual(updatedVehicleData);
        });
    });
});
