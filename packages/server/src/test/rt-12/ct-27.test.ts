import axios from "axios";

describe("CT-27", () => {
    describe("GIVEN a request to the ViaCEP API with a null CEP", () => {
        it("SHOULD return a 400 status code", async () => {
            // Arrange
            const cep = null;
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

    describe("GIVEN a request to the ViaCEP API with an empty string CEP", () => {
        it("SHOULD return a 400 status code", async () => {
            // Arrange
            const cep = "";
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
