import { Sequelize } from "sequelize-typescript";
import * as dotenv from "dotenv";

import Address from "../../../models/Address";
import CollectionSchedule from "../../../models/CollectionSchedule";
import DeliveryAppointment from "../../../models/DeliveryAppointment";
import DeliveryProcess from "../../../models/DeliveryProcess";
import Feedback from "../../../models/Feedback";
import Fleet from "../../../models/Fleet";
import FleetVehicle from "../../../models/FleetVehicle";
import ItemRemittance from "../../../models/ItemRemittance";
import Offer from "../../../models/Offer";
import Payment from "../../../models/Payment";
import Quotation from "../../../models/Quotation";
import RemittanceTypeTax from "../../../models/RemittanceTypeTax";
import User from "../../../models/User";
import DeliveryProcessStatus from "../../../models/DeliveryProcessStatus";
import PaymentType from "../../../models/PaymentType";
import PaymentStatus from "../../../models/PaymentStatus";

// import DeliveryAppointmentStatus from "../../../models/DeliveryAppointmentStatus";
// import ItemRemittanceType from "../../../models/ItemRemittanceType";
// import OfferStatus from "../../../models/OfferStatus";


dotenv.config();

const DATABASE_MODELS = [
    Address,
    CollectionSchedule,
    DeliveryAppointment,
    DeliveryProcess,
    Feedback,
    Fleet,
    FleetVehicle,
    ItemRemittance,
    Offer,
    Payment,
    Quotation,
    RemittanceTypeTax,
    User,
    DeliveryProcessStatus,
    PaymentType,
    PaymentStatus,
];

class SequelizeAdapter {
    public instance: Sequelize | undefined;

    public async connectDataBase(forceSync?: boolean) {
        const databaseInstance = new Sequelize({
            database: process.env.POSTGRES_DB,
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            dialect: "postgres",
            models: DATABASE_MODELS,
        });

        this.instance = databaseInstance;

        try {
            await this.instance.authenticate();
            console.log("PostgreSQL Connection has been established successfully.");
        } catch (error) {
            console.error("Unable to connect to the PostgreSQL database:", error);
        }

        try {
            await this.instance.sync({ force: forceSync });
            console.log("Sync all defined models to the DB.");
        } catch (error) {
            console.log("Unable to sync models on DB: ", error);
        }
    }
}

export default new SequelizeAdapter();
