import axios from 'axios';

// DA ERRADO
describe("CT-59", () => {
    describe("GIVING an unregistered Fleet ", () => {
        it("SHOULD not return info about the Fleet and the status has to be 400", async () => {

            // Arrange
            const url = "http://localhost:8000/api/fleet";
            const id = -1;

            try {
                // Act
                await axios.get(`${url}/${id}`);
            } catch (error: any) {
                // Assert
                expect(error.response.status).toBe(400);
            }
        });
    });
});