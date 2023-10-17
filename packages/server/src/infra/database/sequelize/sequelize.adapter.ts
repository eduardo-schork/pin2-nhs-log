import { Sequelize } from "sequelize-typescript";
import * as dotenv from "dotenv";
import PaymentType from "../../../models/PaymentType";
import Address from "../../../models/Address";
import CollectionSchedule from "../../../models/CollectionSchedule";
import DeliveryAppointment from "../../../models/DeliveryAppointment";
import DeliveryAppointmentStatus from "../../../models/DeliveryAppointmentStatus";
import DeliveryProcess from "../../../models/DeliveryProcess";
import DeliveryProcessStatus from "../../../models/DeliveryProcessStatus";
import Feedback from "../../../models/Feedback";
import Fleet from "../../../models/Fleet";
import FleetVehicle from "../../../models/FleetVehicle";
import ItemRemittance from "../../../models/ItemRemittance";
import ItemRemittanceType from "../../../models/ItemRemittanceType";
import Offer from "../../../models/Offer";
import OfferStatus from "../../../models/OfferStatus";
import Payment from "../../../models/Payment";
import Quotation from "../../../models/Quotation";
import RemittanceTypeTax from "../../../models/RemittanceTypeTax";
import User from "../../../models/User";
import PaymentStatus from "../../../models/PaymentStatus";

dotenv.config();

const DATABASE_MODELS = [
    PaymentType,
    Address,
    CollectionSchedule,
    DeliveryAppointment,
    DeliveryAppointmentStatus,
    DeliveryProcess,
    DeliveryProcessStatus,
    Feedback,
    Fleet,
    FleetVehicle,
    ItemRemittance,
    ItemRemittanceType,
    Offer,
    OfferStatus,
    Payment,
    PaymentType,
    Quotation,
    RemittanceTypeTax,
    PaymentStatus,
    User,
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
