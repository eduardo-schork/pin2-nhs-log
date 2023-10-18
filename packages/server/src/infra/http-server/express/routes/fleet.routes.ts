import { Router } from "express";
import FleetController from "../controllers/fleet.controller";

const fleetRoutes = Router();

fleetRoutes.post("/fleet/create", FleetController.createWithVehicles);

fleetRoutes.get("/fleet", FleetController.findAll);

fleetRoutes.get("/fleet/:id", FleetController.findOne);

fleetRoutes.post("/fleet", FleetController.create);

fleetRoutes.delete("/fleet/:id", FleetController.delete);

fleetRoutes.put("/fleet", FleetController.update);

export default fleetRoutes;
