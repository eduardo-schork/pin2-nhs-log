import axios from "axios";

describe("CT-26", () => {
    describe("GIVEN a request to the ViaCEP API with a valid CEP", () => {
        it("SHOULD return a 200 status code and CEP data", async () => {
            // Arrange
            const cep = "88730-000";
            const url = `https://viacep.com.br/ws/${cep}/json/`;

            // Act
            const response = await axios.get(url);

            // Assert
            expect(response.status).toBe(200);
            expect(response.data).toBeDefined();
        });
    });
});
