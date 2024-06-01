import axios from 'axios';

describe("CT-53", () => {
    describe("GIVEN an existing vehicle to update", () => {
        it("SHOULD update the vehicle successfully", async () => {

            // Arrange
            const url = "http://localhost:8000/api/fleet";
            const fleet = {
                model: "Jetta",
                plate: "LLLLR56",
                cpfDriver: "14152284935",
                renavam: "48996417736",
            };

            // Act
            const response = await axios.put(url, fleet);

            // Assert
            expect(response.status).toBe(204); 
        });
    });
});
