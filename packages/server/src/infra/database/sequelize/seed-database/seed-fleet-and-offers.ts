import { faker } from "@faker-js/faker";
import DatabasePort from "../../database.port";
import Fleet from "../../../../models/Fleet";
import FleetVehicle from "../../../../models/FleetVehicle";
import FleetVehicleFleet from "../../../../models/FleetVehicleFleet";
import Offer from "../../../../models/Offer";
import { OFFER_STATUS } from "@/shared/src/constants/offer-status.const";

async function createFleetsAndVehicles() {
    try {
        await DatabasePort.connectDataBase();

        const fleets = [];
        for (let i = 0; i < 5; i++) {
            const fleet = await Fleet.create({
                name: faker.company.name(),
                createdAt: new Date(),
                createdBy: "system",
            });

            const vehicles = [];
            for (let j = 0; j < 3; j++) {
                const vehicle = await FleetVehicle.create({
                    model: faker.vehicle.model(),
                    plate: faker.vehicle.vrm(),
                    cpfDriver: faker.number
                        .bigInt({ min: 10000000000, max: 99999999999 })
                        .toString(),
                    renavam: faker.number.bigInt({ min: 10000000000, max: 99999999999 }).toString(),
                    createdAt: new Date(),
                    createdBy: "system",
                });

                await FleetVehicleFleet.create({
                    fleetId: fleet.id,
                    fleetVehicleId: vehicle.id,
                    createdAt: new Date(),
                    createdBy: "system",
                });

                vehicles.push(vehicle);
            }

            fleet.fleetVehicles = vehicles;
            fleets.push(fleet);
        }

        return fleets;
    } catch (error) {
        console.error("Erro ao criar fleets e vehicles:", error);
        throw error;
    }
}

async function createOffers() {
    try {
        await DatabasePort.connectDataBase();

        const offers = [];
        const fleetVehicles = await FleetVehicle.findAll();

        for (let i = 0; i < 30; i++) {
            const randomQuotationId = Math.floor(Math.random() * 10) + 1;
            const randomStatus = Math.floor(Math.random() * 3) + 1;
            const randomVehicle = Math.floor(Math.random() * 5) + 1;

            const offer = await Offer.create({
                status: Object.values(OFFER_STATUS)[randomStatus] as string,
                subtotal: faker.number.float({ min: 1000, max: 5000, precision: 0.01 }),
                taxes: faker.number.float({ min: 50, max: 200, precision: 0.01 }),
                total: faker.number.float({ min: 1050, max: 5200, precision: 0.01 }),
                deliveryForecast: faker.date.future(),
                quotationId: randomQuotationId,
                fleetVehicleId: fleetVehicles[randomVehicle]?.id,
                createdAt: new Date(),
                createdBy: "system",
            });

            offers.push(offer);
        }

        return offers;
    } catch (error) {
        console.error("Erro ao criar offers:", error);
        throw error;
    }
}

const execute = async () => {
    await createFleetsAndVehicles()
        .then((fleets) => {
            console.log("Fleets criados:", fleets);
            return createOffers();
        })
        .then((offers) => {
            console.log("Offers criadas:", offers);
        })
        .catch((error) => {
            console.error("Erro:", error);
        });
};

export const SeedFleetAndOffers = { execute };
