import axios from 'axios';

describe("CT-48", () => {
    describe("HAVING user to remove", () => {
        it("SHOULD return error when user does not exist", async () => {
            // Arrange
            const userId = -1; 
            const url = `http://localhost:8000/api/admin`;

            try {
                // Act
                await axios.delete(`${url}/${userId}`);
            } catch (error: any) {
                // Assert
                expect(error.response.status).toBe(404);
            }
        });
    });
});
