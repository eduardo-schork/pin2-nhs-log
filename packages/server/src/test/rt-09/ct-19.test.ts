import Address from "../../models/Address";
import ItemRemittance from "../../models/ItemRemittance";
import Quotation from "../../models/Quotation";
import quotationRepository from "../../shared/repositories/quotation.repository";
import initializeDatabase from "../arrange/initialize-database";
import { faker } from "@faker-js/faker";

describe("CT-19", () => {
    describe("GIVEN right parameters to create a quotation", () => {
        it("SHOULD save it correctly and then be able to retrieve it by CPF'", async () => {
            // Arrange
            await initializeDatabase();
            const commonCPF = "12345678900";

            await Address.create({
                streetAddress: faker.location.streetAddress(),
                number: faker.number.int({ min: 1, max: 100 }),
                city: faker.location.city(),
                state: faker.location.state(),
                country: faker.location.country(),
                zipCode: faker.location.zipCode(),
                geoLatitude: faker.location.latitude(),
                geoLongitude: faker.location.longitude(),
                createdAt: new Date(),
                createdBy: faker.person.fullName(),
                updatedAt: new Date(),
                updatedBy: faker.person.fullName(),
            });

            const mockData = {
                cpf: commonCPF,
                email: faker.internet.email(),
                currentDate: faker.date.past(),
                originAddressId: 1,
                destinationAddressId: 2,
                createdAt: new Date(),
                createdBy: faker.person.fullName(),
                updatedAt: new Date(),
                updatedBy: faker.person.fullName(),
            };

            // Act
            const quotation = await Quotation.create(mockData);

            const itemRemittanceMock = {
                objectType: "Documentos",
                weight: faker.number.float(),
                quotationId: quotation.id,
                createdAt: new Date(),
                createdBy: faker.person.fullName(),
                updatedAt: new Date(),
                updatedBy: faker.person.fullName(),
            };

            await ItemRemittance.create(itemRemittanceMock);

            // Assert
            expect(quotation).toBeDefined();

            // Consulta a cotação pelo CPF
            const cpf = quotation.cpf
            const quotationByCPF = await quotationRepository.findAllByCPF({ cpf });
            expect(quotationByCPF).toBeDefined();

            if (quotationByCPF) {
                const cpfs = quotationByCPF.map(quotation => quotation.cpf);
                expect(cpfs).toContain(cpf);
            }
        });
    });
});
