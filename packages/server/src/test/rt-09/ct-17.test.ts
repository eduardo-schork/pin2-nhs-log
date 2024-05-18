import TQuotationModel from "@/shared/src/models/Quotation.model";
import quotationRepository from "../../shared/repositories/quotation.repository";
import initializeDatabase from "../arrange/initialize-database";

describe("CT-17", () => {
    describe("GIVEN a quotation with empty mandatory fields", () => {
        it("SHOULD throw an error with the message 'Erro. Os campos obrigatórios devem ser preenchidos!'", async () => {
            // Arrange
            await initializeDatabase();

            const assertData: TQuotationModel = {
                cpf: "167.475.700-06",
                email: "mariaceciliaholler@gmail.com",
                currentDate: new Date(),
                originAddress: {
                    streetAddress: "",
                    number: 93,
                    city: "Rio do Sul",
                    state: "SC",
                    country: "Brasil",
                    zipCode: "89163-324",
                    geoLatitude: null,
                    geoLongitude: null,
                    createdAt: new Date(),
                    createdBy: ""
                },
                destinationAddress: {
                    streetAddress: "Avenida Brigadeiro Faria Lima",
                    number: 300,
                    city: "São Paulo",
                    state: "SP",
                    country: "Brasil",
                    zipCode: "01451-000",
                    geoLatitude: null,
                    geoLongitude: null,
                    createdAt: new Date(),
                    createdBy: ""
                },
                itemRemittances: [
                    {
                        objectType: "",
                        weight: 10,
                        quotationId: 0,
                        createdAt: new Date(),
                        createdBy: ""
                    }
                ],
                createdAt: new Date(),
                createdBy: ""
            };

            // Act
            const createPromise = quotationRepository.create({ data: assertData });

            // Assert
            await expect(createPromise).rejects.toThrow(
                "Erro. Os campos obrigatórios devem ser preenchidos corretamente!"
            );
        });
    });
});
