import axios from 'axios';

describe("CT-31", () => {
    describe("GIVING a Fleet with at least one Fleet vehicle", () => {
        it("SHOULD register the Fleet with the expected vehicles", async () => {
            // Arrange
            const url = "http://localhost:8000/api/fleet/create";
            const query = new URLSearchParams({
                fleetName: 'teste2',
                fleetVehicles: '2,3'
            });

            // Act
            const response = await axios.post(`${url}?${query}`);
            const fleet = response.data;

            // Assert
            expect(response.status).toBe(200);
            expect(fleet).toBeDefined();
        });
    });
});