import axios from 'axios';

describe("CT-58", () => {
    describe("HAVING some registered Fleet ", () => {
        it("SHOULD return all saved Fleets and the status has to be 200", async () => {

            // Arrange
            const url = "http://localhost:8000/api/fleet";

            // Act
            const response = await axios.get(url);
            const fleet = response.data;

            // Assert
            expect(response.status).toBe(200);
            expect(fleet).toBeDefined();
            expect(fleet.length).toBeGreaterThan(0);
        });
    });
});