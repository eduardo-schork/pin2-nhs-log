import Database from "./packages/db/dbconfig";

const databaseInstance = Database.getDataBaseInstance();
const sequelize = databaseInstance.sequelize;
