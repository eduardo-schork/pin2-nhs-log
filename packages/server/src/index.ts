import * as dotenv from "dotenv";
import HttpServerPort from "./infra/http-server/http-server.port";
import DatabasePort from "./infra/database/database.port";

dotenv.config();

async function start() {
    await DatabasePort.connectDataBase();
    await HttpServerPort.runHttpServer();
}

start();
