import axios from "axios";

describe("CT-56", () => {
    describe("GIVEN an existing Fleet", () => {
        it("SHOULD be possible to edit the Fleet name to 'teste 123'", async () => {
            // Arrange
            const url = "http://localhost:8000/api/fleet";
            const data = { id: 3, name: "teste 123" };

            try {
                // Act
                const response = await axios.put(url, data);

                // Assert
                expect(response.status).toBe(204);
            } catch (error: any) {
                console.error("Error:", error);
                throw error;
            }
        });
    });
});
