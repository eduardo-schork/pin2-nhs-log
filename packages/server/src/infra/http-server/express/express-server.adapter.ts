import express, { Express } from "express";
import cors from "cors";
import router from "./routes/routes";

const corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
};

class ExpressServerAdapter {
    expressServer: Express;

    constructor() {
        const expressInstace = express();

        this.expressServer = expressInstace;
    }

    registerMiddlewares() {
        this.expressServer.use(cors(corsOptions));
        this.expressServer.use(express.json());
        this.expressServer.use(router);
    }

    runHttpServer() {
        const HTTP_PORT = process.env.APP_PORT;

        this.registerMiddlewares();

        this.expressServer.listen(HTTP_PORT, () => {
            console.log(`ExpressHttpServer app listening on port ${HTTP_PORT}`);
        });
    }
}

export default new ExpressServerAdapter();
