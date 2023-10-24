import * as dotenv from "dotenv";

import DatabasePort from "../../database.port";
import { SeedQuotation } from "./seed-quotation";

dotenv.config();

async function seedSequelizeDatabase() {
    await DatabasePort.connectDataBase(true);
    console.log("==============================");

    await SeedQuotation.execute();
    // await seedPaymentType.execute();
    // console.log("Table PaymentType seeded");
    // console.log("==============================");

    // await seedOfferStatus.execute();
    // console.log("Table OfferStatus seeded");
    // console.log("==============================");

    // await seedItemRemittanceType.execute();
    // console.log("Table ItemRemittanceType seeded");
    // console.log("==============================");

    // await seedDeliveryAppointmentStatus.execute();
    // console.log("Table DeliveryAppointmentStatus seeded");
    // console.log("==============================");

    // await seedDeliveryProccessStatus.execute();
    // console.log("Table DeliveryProccessStatus seeded");
    // console.log("==============================");

    // await seedPaymentStatus.execute();
    // console.log("Table PaymentStatus seeded");
    // console.log("==============================");

    // await seedRemittanceTypeTax.execute();
    // console.log("Table RemittanceTypeTax seeded");
    // console.log("==============================");

    console.log("Database models seeded");

    process.exit(0);
}

(async () => await seedSequelizeDatabase())();
