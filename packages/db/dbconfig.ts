import { Sequelize } from "sequelize-typescript";
import * as dotenv from "dotenv";
import PaymentType from "../shared/src/models/PaymentType";
import Address from "../shared/src/models/Address";
import CollectionSchedule from "../shared/src/models/CollectionSchedule";
import DeliveryAppointment from "../shared/src/models/DeliveryAppointment";
import DeliveryAppointmentStatus from "../shared/src/models/DeliveryAppointmentStatus";
import DeliveryProcess from "../shared/src/models/DeliveryProcess";
import DeliveryProcessStatus from "../shared/src/models/DeliveryProcessStatus";
import Feedback from "../shared/src/models/Feedback";
import Fleet from "../shared/src/models/Fleet";
import FleetVehicle from "../shared/src/models/FleetVehicle";
import ItemRemittance from "../shared/src/models/ItemRemittance";
import ItemRemittanceType from "../shared/src/models/ItemRemittanceType";
import Offer from "../shared/src/models/Offer";
import OfferStatus from "../shared/src/models/OfferStatus";
import Payment from "../shared/src/models/Payment";
import Quotation from "../shared/src/models/Quotation";
import RemittanceTypeTax from "../shared/src/models/RemittanceTypeTax";
import User from "../shared/src/models/User";
dotenv.config();


class Database {
    public sequelize: Sequelize | undefined;
    private POSTGRES_DB = process.env.POSTGRES_DB as string;
    private POSTGRES_HOST = process.env.POSTGRES_HOST as string;
    private POSTGRES_PORT = process.env.POSTGRES_PORT as unknown as number;
    private POSTGRES_USER = process.env.POSTGRES_USER as unknown as string;
    private POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD as unknown as string;

    constructor() {
        this.connectDataBase();
    }

    private async connectDataBase() {
        this.sequelize = new Sequelize({
            database: this.POSTGRES_DB,
            username: this.POSTGRES_USER,
            password: this.POSTGRES_PASSWORD,
            host: this.POSTGRES_HOST,
            port: this.POSTGRES_PORT,
            dialect: "postgres",
            models: [PaymentType, Address, CollectionSchedule, DeliveryAppointment,
                DeliveryAppointmentStatus, DeliveryProcess, DeliveryProcessStatus,
                Feedback, Fleet, FleetVehicle, ItemRemittance, ItemRemittanceType,
                Offer, OfferStatus, Payment, PaymentType, Quotation, RemittanceTypeTax,
                User]
        });

        await this.sequelize
            .authenticate()
            .then(() => {
                console.log(
                    "PostgreSQL Connection has been established successfully."
                );
            })
            .catch((err) => {
                console.error("Unable to connect to the PostgreSQL database:", err);
            });
    }
}

export default Database;