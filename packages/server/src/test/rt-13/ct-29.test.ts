import axios from 'axios';

describe("CT-29", () => {
    describe("HAVING at least one Fleet registered", () => {
        it("SHOULD return all of the Fleets", async () => {

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
