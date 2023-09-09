import express, { Application } from "express";
import Database from "./db/dbconfig";
import * as dotenv from "dotenv";

dotenv.config();

console.log({dotenv})

class App {
    public app: Application;

    constructor() {
        this.app = express();
        this.databaseSync();
    }

    protected databaseSync(): void {
        const db = new Database();
        db.sequelize?.sync();
    }
}

const port = process.env.APP_PORT as unknown as number;
const app = new App().app;

app.listen(port, () => {
    console.log("Server started successfully!");
});