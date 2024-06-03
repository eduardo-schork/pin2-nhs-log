import axios from "axios";

describe("CT-57", () => {
    describe("GIVEN an existing Fleet", () => {
        it("SHOULD return the Fleet with id = 3", async () => {
            // Arrange
            const id = 3;
            const url = `http://localhost:8000/api/fleet/${id}`;

            try {
                // Act
                const response = await axios.get(url);

                // Assert
                expect(response.status).toBe(200);
                expect(response.data.id).toBe(id);
            } catch (error: any) {
                console.error("Error:", error);
                throw error;
            }
        });
    });
});
