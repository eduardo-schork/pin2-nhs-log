import TAddressModel from "@/shared/src/models/Address.model";
import { faker } from "@faker-js/faker";

function generateRandomAddress(): TAddressModel {
    const fakeAddress: TAddressModel = {
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
    };

    return fakeAddress;
}

export default generateRandomAddress;
