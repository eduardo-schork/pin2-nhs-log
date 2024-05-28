import axios from 'axios';

describe("CT-52", () => {
    describe("GIVEN an existing vehicle to delete", () => {
        it("SHOULD delete the vehicle successfully", async () => {
            // Arrange
            const id = 190; 

            // Act
            const response = await axios.delete(`http://localhost:8000/api/fleetVehicle/delete/${id}`);

            // Assert
            expect(response.status).toBe(200);
            expect(response.data.success).toBe(true); 
        });
    });
});
