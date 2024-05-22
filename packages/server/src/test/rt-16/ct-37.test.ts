import axios from 'axios';

describe("CT-37", () => {
    afterEach(() => {
        return axios.CancelToken.source().cancel();
    });
    describe("HAVING a CPF with not registered quotations", () => {
        it("SHOULD return none of the quotations", async () => {
            // Arrange
            const cpf = "00000000000";

            // Act
            const response = await axios.get(`http://localhost:8000/api/quotation-by-cpf/${cpf}`);
            const quotations = response.data;

            // Assert
            expect(response.status).toBe(200);
            expect(quotations).toBeDefined();
            expect(quotations.length).toBe(0);
        });
    });
});
