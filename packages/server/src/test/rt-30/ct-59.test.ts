import axios from 'axios';

// DA ERRADO
describe("CT-59", () => {
    describe("GIVING an unregistered Fleet ", () => {
        it("SHOULD not return info about the Fleet and the status has to be 400", async () => {

            // Arrange
            const url = "http://localhost:8000/api/fleet";
            const id = -1;

            // Act
            const response = await axios.get(`${url}/${id}`);

            // Assert
            expect(response.status).toBe(400);
            expect(response.data).toBeNull();
        });
    });
});