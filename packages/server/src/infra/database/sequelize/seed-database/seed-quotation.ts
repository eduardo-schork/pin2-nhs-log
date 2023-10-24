import Address from "../../../../models/Address";
import ItemRemittance from "../../../../models/ItemRemittance";
import Quotation from "../../../../models/Quotation";

import { faker } from "@faker-js/faker";

// Função para criar 10 registros mockados na tabela Quotation
async function execute() {
    try {
        const commonCPF = "12345678900"; // Defina um CPF comum

        for (let i = 0; i < 10; i++) {
            await Address.create({
                streetAddress: faker.address.streetAddress(),
                number: faker.number.int({ min: 1, max: 100 }),
                city: faker.address.city(),
                state: faker.address.state(),
                country: faker.address.country(),
                zipCode: faker.address.zipCode(),
                geoLatitude: faker.address.latitude(),
                geoLongitude: faker.address.longitude(),
                createdAt: new Date(),
                createdBy: faker.person.fullName(),
                updatedAt: new Date(),
                updatedBy: faker.person.fullName(),
            });
        }

        for (let i = 0; i < 10; i++) {
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
        }

        console.log("Dados mockados criados com sucesso!");
    } catch (error) {
        console.error("Erro ao criar dados mockados:", error);
    }
}

export const SeedQuotation = { execute };
