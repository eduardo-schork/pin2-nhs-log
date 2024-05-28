import axios from 'axios';

describe("CT-50", () => {
    describe("GIVING a unregistered User", () => {
        it("SHOULD not be possible to return the user and the status has to be 400", async () => {

            // Arrange
            const userId = -1; 

            try {
                // Act
                const response = await axios.get(`http://localhost:8000/api/admin/get?${userId}`);
            } catch (error: any) {
                // Assert
                expect(error.response.status).toBe(400);
            }
        });
    });
});