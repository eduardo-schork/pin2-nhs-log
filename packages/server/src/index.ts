import * as dotenv from "dotenv";
import HttpServerPort from "./infra/http-server/http-server.port";
import DatabasePort from "./infra/database/database.port";
import seedSequelizeDatabase from "./infra/database/sequelize/seed-database";

dotenv.config();

async function start() {
    await DatabasePort.connectDataBase();
    //seedSequelizeDatabase();
    HttpServerPort.runHttpServer();
}

start();
