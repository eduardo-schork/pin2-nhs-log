import axios from 'axios';

describe("CT-61", () => {
    describe("GIVEN an unregistered Fleet", () => {
        it("SHOULD not be possible to remove the Fleet and the status has to be 400", async () => {
            // Arrange
            const url = "http://localhost:8000/api/fleet/delete";
            const id = -1;

            try {
                // Act
                await axios.delete(`${url}/${id}`);
            } catch (error: any) {
                // Assert
                expect(error.response.status).toBe(400);
            }
        });
    });
});
