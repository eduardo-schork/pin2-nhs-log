import fleetVehicleRepository from "../../shared/repositories/fleet-vehicle.repository";
import initializeDatabase from "../arrange/initialize-database";

describe("CT-11", () => {
    describe("GIVEN an existing vehicle to update", () => {
        it("SHOULD update the vehicle successfully", async () => {
            // Arrange
            await initializeDatabase();

            const updatedVehicleData = {
<<<<<<< HEAD
                id: 15,
=======
                id: 11,
>>>>>>> cf701fb5cc295d48aeed14d2866b926b8a77c02c
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
