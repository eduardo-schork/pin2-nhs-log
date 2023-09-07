import { Sequelize } from "sequelize-typescript";
import * as dotenv from "dotenv";
dotenv.config();

class Database {
    private static instance: Database;
    public sequelize: Sequelize;
    private POSTGRES_DB = process.env.POSTGRES_DB as string;
    private POSTGRES_HOST = process.env.POSTGRES_HOST as string;
    private POSTGRES_PORT = process.env.POSTGRES_PORT as unknown as number;
    private POSTGRES_USER = process.env.POSTGRES_USER as unknown as string;
    private POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD as unknown as string;

    private constructor() {
        this.sequelize = new Sequelize({
            database: this.POSTGRES_DB,
            username: this.POSTGRES_USER,
            password: this.POSTGRES_PASSWORD,
            host: this.POSTGRES_HOST,
            port: this.POSTGRES_PORT,
            dialect: "postgres"
        });

        this.connectDataBase();
    }

    public static getDataBaseInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    private async connectDataBase() {
        try {
            await this.sequelize.authenticate();
            console.log("PostgreSQL Connection has been established successfully.");
        } catch (err) {
            console.error("Unable to connect to the PostgreSQL database:", err);
        }
    }
}

export default Database;