import axios from 'axios';
import express from 'express';
import offerRoutes from '../../infra/http-server/express/routes/offer.routes';

const app = express();
app.use(express.json());
app.use('/api', offerRoutes); // Use suas rotas na rota '/api'

describe("CT-34", () => {
    describe("GIVEN an offer to be approved", () => {
        it("SHOULD approve the offer successfully", async () => {
            // Arrange
            const url = "http://localhost:8000/api/approveOffer";
            const offer = {
                id: 18,
                status: 'Aprovado',
                subtotal: 2362.89,
                taxes: 135.98,
                total: 1453.72,
                deliveryForecast: '2024-11-18T04:32:10.741Z',
                quotationId: 2,
                fleetVehicleId: 6,
                createdAt: '2024-05-18T19:54:47.950Z',
                createdBy: 'system',
                updatedAt: '2024-05-18T19:54:47.950Z',
                updatedBy: null,
                deletedAt: null,
                deletedBy: null
            };
            
            const body = {
                offer: offer
            };

            // Act
            const response = await axios.post(url, body);

            // Assert
            expect(response.status).toBe(200);
        });
    });
});
