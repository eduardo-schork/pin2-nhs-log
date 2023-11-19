import * as dotenv from "dotenv";

import DatabasePort from "../../database.port";
import { SeedQuotation } from "./seed-quotation";
import { SeedFleetAndOffers } from "./seed-fleet-and-offers";
import { SeedUser } from "./seed-user";

dotenv.config();

async function seedSequelizeDatabase() {
    await DatabasePort.connectDataBase(true);
    console.log("==============================");

    await SeedQuotation.execute();
    await SeedFleetAndOffers.execute();
    await SeedUser.execute();

    console.log("Database models seeded");

    process.exit(0);
}

(async () => await seedSequelizeDatabase())();
