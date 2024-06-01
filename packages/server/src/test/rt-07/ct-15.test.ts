import TQuotationModel from "@/shared/src/models/Quotation.model";
import initializeDatabase from "../arrange/initialize-database";
import fleetRepository from "../../shared/repositories/fleet.repository";

describe("CT-15", () => {
    describe("GIVEN a fleet", () => {
        it("SHOULD create a fleet successfully when selecting vehicles", async () => {
            // Arrange
            await initializeDatabase();

            const fleetName = "Frota 02";
            const fleetVehicles = "2,3";

            // Act
            const createFleetResult = await fleetRepository.createFleet(fleetName, fleetVehicles);

            // Assert
            expect(createFleetResult).toBe(true);
        });
    });
});
