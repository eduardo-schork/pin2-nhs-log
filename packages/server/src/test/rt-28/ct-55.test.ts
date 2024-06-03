import axios from "axios";

describe("CT-55", () => {
    describe("GIVEN a request to create a new Fleet without vehicles", () => {
        it("SHOULD return status 400", async () => {
            // Arrange
            const url = "http://localhost:8000/api/fleet/create";
            const data = {
                fleetName: "Frota 01",
                fleetVehicles: [],
            };

            // Act
            try {
                await axios.post(url, data);
            } catch (error: any) {
                // Assert
                expect(error.response.status).toBe(400);
                return;
            }

            fail("Expected request to return status 400");
        });
    });
});
