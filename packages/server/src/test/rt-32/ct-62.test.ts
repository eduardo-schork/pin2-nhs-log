import axios from 'axios';

// DA ERRADO
describe("CT-62", () => {
    afterEach(() => {
        return axios.CancelToken.source().cancel();
    });
    describe("GIVING an empty CPF", () => {
        it("SHOULD not return quotations and the status has to be 400", async () => {
            // Arrange
            const cpf = null;

            try {
                // Act
                await axios.get(`http://localhost:8000/api/quotation-by-cpf/${cpf}`);
            } catch (error: any) {
                // Assert
                expect(error.response.status).toBe(400);
            }
        });
    });
});