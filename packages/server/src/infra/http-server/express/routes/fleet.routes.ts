import { Router } from "express";
import { handleFindAllFleet, createFleet} from "../controllers/fleet.controller";

const fleetRoutes = Router();

fleetRoutes.get("/fleet", handleFindAllFleet);

fleetRoutes.post("/fleet/create", createFleet);

export default fleetRoutes;
