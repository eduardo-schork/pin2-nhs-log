import axios from 'axios';

describe("CT-49", () => {
    describe("GIVING a registered User", () => {
        it("SHOULD return the user and the status has to be 200", async () => {

            // Arrange
            const userId = 1; 

            // Act
            const response = await axios.get(`http://localhost:8000/api/admin/get?${userId}`);

            // Assert
            expect(response.status).toBe(200);
        });
    });
});