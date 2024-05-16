import fleetVehicleRepository from "../../shared/repositories/fleet-vehicle.repository";
import initializeDatabase from "../arrange/initialize-database";

describe("CT-10", () => {
    describe("GIVEN a vehicle is successfully registered", () => {
        it("SHOULD register a vehicle successfully", async () => {
            // Arrange
            await initializeDatabase();

            const inputData = {
                model: "Jetta",
                plate: "KD44DFG",
                cpfDriver: "13705969523",
                renavam: "47739513539",
                createdAt: new Date(),
                createdBy: "admin",
            };

            // Act
            const createPromise = fleetVehicleRepository.create({ data: inputData });

            // Assert
            const expectedResult = expect.objectContaining({
                model: "Jetta",
                plate: "KD44DFG",
                cpfDriver: "13705969523",
                renavam: "47739513539",
            });

            await expect(createPromise).resolves.toEqual(expectedResult);
        });
    });
});
