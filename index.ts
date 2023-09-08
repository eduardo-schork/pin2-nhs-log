import express, { Application } from "express";
import Database from "./packages/db/dbconfig";
import * as dotenv from "dotenv";
import PaymentTypeServ from "./packages/shared/src/services/PaymentTypeService";
import OfferStatusServ from "./packages/shared/src/services/OfferStatusService";
import ItemRemittanceTypeServ from "./packages/shared/src/services/ItemRemittanceTypeService";
import DeliveryAppointmentStatusServ from "./packages/shared/src/services/DeliveryAppointmentStatusService";
import DeliveryProcessStatusServ from "./packages/shared/src/services/DeliveryProcessStatusService";
import PaymentStatusServ from "./packages/shared/src/services/PaymentStatusService";
dotenv.config();
class App {
    public app: Application;

    constructor() {
        this.app = express();
        this.databaseSync();
        this.servicesSync();
    }

    protected databaseSync(): void {
        const db = new Database();
        db.sequelize?.sync();
    }
    protected servicesSync(): void {
        const paymentTypeService = new PaymentTypeServ();
        paymentTypeService.initializePaymentTypes();
        const offerStatusService = new OfferStatusServ();
        offerStatusService.initializeOfferStatus();
        const itemRemittanceTypeService = new ItemRemittanceTypeServ();
        itemRemittanceTypeService.initializeItemRemittanceType();
        const deliveryAppointmentStatusService = new DeliveryAppointmentStatusServ();
        deliveryAppointmentStatusService.initializeDeliveryAppointmentStatus();
        const deliveryProcessStatusService = new DeliveryProcessStatusServ();
        deliveryProcessStatusService.initializeDeliveryProcessStatus();
        const paymentStatusService = new PaymentStatusServ();
        paymentStatusService.initializePaymentStatus();
    }
}

const port = process.env.APP_PORT as unknown as number;
const app = new App().app;

app.listen(port, () => {
    console.log("Server started successfully!");
});