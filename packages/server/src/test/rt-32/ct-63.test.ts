import axios from 'axios';

describe("CT-63", () => {
    afterEach(() => {
        return axios.CancelToken.source().cancel();
    });
    describe("GIVING a CPF that has at least one registered quotation", () => {
        it("SHOULD return the quotations linked to the cpf and the status has to be 200", async () => {
            // Arrange
            const cpf = "12345678900";

            // Act
            const response = await axios.get(`http://localhost:8000/api/quotation-by-cpf/${cpf}`);

            // Assert
            expect(response.status).toBe(200);
        });
    });
});