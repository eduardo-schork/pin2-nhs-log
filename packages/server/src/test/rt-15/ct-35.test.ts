import axios from 'axios';

describe("CT-35", () => {
    describe("GIVEN an offer to be repproved", () => {
        it("SHOULD repprove the offer successfully", async () => {
            // Arrange
            const url = "http://localhost:8000/api/offer";
            const offer = {
                id: 29,
                status: 'Reprovado',
                quotationId: 1,
            };

            // Act
            const response = await axios.put(url, offer);

            // Assert
            expect(response.status).toBe(200);
        });
    });
});
