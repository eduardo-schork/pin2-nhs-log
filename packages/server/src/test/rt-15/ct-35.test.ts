import axios from 'axios';
import express from 'express';
import offerRoutes from '../../infra/http-server/express/routes/offer.routes';

const app = express();
app.use(express.json());
app.use('/api', offerRoutes); 

describe("CT-35", () => {
    describe("GIVEN an offer to be repproved", () => {
        it("SHOULD repprove the offer successfully", async () => {
            // Arrange
            const url = "http://localhost:8000/api/offer";
            const offer = {
                id: 29,
                status: 'Reprovado',
                quotationId: 1,
            };

            // Act
            const response = await axios.put(url, offer);

            // Assert
            expect(response.status).toBe(200);
        });
    });
});
