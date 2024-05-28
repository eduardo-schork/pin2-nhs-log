import axios from 'axios';

describe("CT-51", () => {
    describe("GIVEN a vehicle is successfully registered", () => {
        it("SHOULD register a vehicle successfully", async () => {

            // Arrange
            const vehicleData = {
                vehicleModal: "Jetta",
                vehiclePlate: "KD44DFG",
                vehicleCpfDriver: "13705969523",
                vehicleRenavam: "47739513539",
            };

            // Act
            const response = await axios.post('http://localhost:8000/api/fleetVehicle/create', null, {
                params: vehicleData
            });

            // Assert
            expect(response.status).toBe(200);
            expect(response.data).toBe(true); 
        });
    });
});

