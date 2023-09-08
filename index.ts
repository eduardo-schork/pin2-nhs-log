import express, { Application } from "express";
import Database from "./packages/db/dbconfig";
import * as dotenv from "dotenv";
import PaymentTypeServ from "./packages/shared/src/services/PaymentTypeService";
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
    }
}

const port = process.env.APP_PORT as unknown as number;
const app = new App().app;

app.listen(port, () => {
    console.log("Server started successfully!");
});