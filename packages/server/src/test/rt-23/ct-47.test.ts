import axios from 'axios';

describe("CT-47", () => {
    describe("HAVING user to remove", () => {
        it("SHOULD return user successfully removed", async () => {
            // Arrange
            const userId = 86; 
            const url = `http://localhost:8000/api/admin`;

            // Act
            const response = await axios.delete(url, { params: { id: userId } });

            // Assert
            expect(response.status).toBe(200);
        });
    });
});
