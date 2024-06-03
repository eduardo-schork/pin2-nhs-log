import axios from "axios";

describe("CT-25", () => {
    describe("GIVEN a request to the ViaCEP API with an invalid CEP", () => {
        it("SHOULD return a 400 status code", async () => {
            // Arrange
            const cep = "88730-00000";
            const url = `https://viacep.com.br/ws/${cep}/json/`;

            try {
                // Act
                await axios.get(url);
            } catch (error: any) {
                // Assert
                expect(error.response.status).toBe(400);
            }
        });
    });
});
