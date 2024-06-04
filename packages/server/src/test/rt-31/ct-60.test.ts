import axios from 'axios';

describe("CT-60", () => {
    describe("GIVING a registered Fleet ", () => {
        it("SHOULD be possible to remove the Fleet and the status has to be 200", async () => {

            // Arrange
            const url = "http://localhost:8000/api/fleet/delete";
            const id = 141;

            // Act
            const response = await axios.delete(`${url}/${id}`);

            // Assert
            expect(response.status).toBe(200);
        });
    });
});