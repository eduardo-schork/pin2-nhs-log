import fleetVehicleRepository from "../../shared/repositories/fleet-vehicle.repository";
import initializeDatabase from "../arrange/initialize-database";

describe("CT-09", () => {
    describe("GIVEN a vehicle with empty mandatory fields", () => {
        it("SHOULD throw an error with the message 'Erro. Os campos obrigatórios devem ser preenchidos!'", async () => {
            // Arrange
            await initializeDatabase();

            const inputData = {
                model: "",
                plate: "",
                cpfDriver: "167.475.700-06",
                renavam: "ZR60XWE",
                createdAt: new Date(),
                createdBy: "admin",
            };

            // Act
            const createPromise = fleetVehicleRepository.create({ data: inputData });

            // Assert
            await expect(createPromise).rejects.toThrow(
                "Erro. Os campos obrigatórios devem ser preenchidos!"
            );
        });
    });
});
