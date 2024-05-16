import DatabasePort from "../../infra/database/database.port";

import * as dotenv from "dotenv";

dotenv.config();

async function initializeDatabase() {
    await DatabasePort.connectDataBase();
}

export default initializeDatabase;
