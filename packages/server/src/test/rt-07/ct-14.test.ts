import TQuotationModel from "@/shared/src/models/Quotation.model";
import initializeDatabase from "../arrange/initialize-database";
import fleetRepository from "../../shared/repositories/fleet.repository";

describe("CT-14", () => {
    describe("GIVEN a fleet", () => {
        it("SHOULD return an error when creating a fleet without selecting vehicles", async () => {
            // Arrange
            await initializeDatabase();

            const fleetName = "Frota 01";
            const fleetVehicles = "";

            // Act
            const createFleetResult = await fleetRepository.createFleet(fleetName, fleetVehicles);

            // Assert
            expect(createFleetResult).toBe(false);
        });
    });
});
