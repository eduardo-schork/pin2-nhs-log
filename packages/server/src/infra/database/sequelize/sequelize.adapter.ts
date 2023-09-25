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

class SequelizeAdapter {
    public sequelize: Sequelize | undefined;
    public POSTGRES_DB = process.env.POSTGRES_DB as string;
    public POSTGRES_HOST = process.env.POSTGRES_HOST as string;
    public POSTGRES_PORT = process.env.POSTGRES_PORT as unknown as number;
    public POSTGRES_USER = process.env.POSTGRES_USER as unknown as string;
    public POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD as unknown as string;

    public async connectDataBase() {
        this.sequelize = new Sequelize({
            database: this.POSTGRES_DB,
            username: this.POSTGRES_USER,
            password: this.POSTGRES_PASSWORD,
            host: this.POSTGRES_HOST,
            port: this.POSTGRES_PORT,
            dialect: "postgres",
            models: [
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
            ],
        });

        await this.sequelize
            .authenticate()
            .then(() => {
                console.log("PostgreSQL Connection has been established successfully.");
            })
            .catch((err) => {
                console.error("Unable to connect to the PostgreSQL database:", err);
            });
    }
}

export default new SequelizeAdapter();
