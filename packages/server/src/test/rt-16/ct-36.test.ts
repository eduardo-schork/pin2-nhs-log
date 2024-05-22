import axios from 'axios';

describe("CT-36", () => {
    afterEach(() => {
        return axios.CancelToken.source().cancel();
    });
    describe("HAVING a CPF with registered quotations", () => {
        it("SHOULD return all of the quotations", async () => {
            // Arrange
            const cpf = "12345678900";

            // Act
            const response = await axios.get(`http://localhost:8000/api/quotation-by-cpf/${cpf}`);
            const quotations = response.data;

            // Assert
            expect(response.status).toBe(200);
            expect(quotations).toBeDefined();
            expect(quotations.length).toBeGreaterThan(0);
        });
    });
});
