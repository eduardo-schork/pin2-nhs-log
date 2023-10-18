import { Router } from "express";
import FleetController from "../controllers/fleet.controller";

const fleetRoutes = Router();

fleetRoutes.post("/fleet/create", FleetController.createWithVehicles);

fleetRoutes.get("/user", FleetController.findAll);

fleetRoutes.get("/user/:id", FleetController.findOne);

fleetRoutes.post("/user", FleetController.create);

fleetRoutes.delete("/user/:id", FleetController.delete);

fleetRoutes.put("/user", FleetController.update);

export default fleetRoutes;
