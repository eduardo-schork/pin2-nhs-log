import axios from 'axios';

describe("CT-32", () => {
    describe("GIVING an existing fleet vehicle", () => {
        it("SHOULD delete the expected vehicle", async () => {
            // Arrange
            const url = "http://localhost:8000/api/fleetVehicle/delete";
            const vehicleId = '101';

            // Act
            const response = await axios.delete(`${url}/${vehicleId}`);
            const fleet = response.data;

            // Assert
            expect(response.status).toBe(200);
        });
    });
});