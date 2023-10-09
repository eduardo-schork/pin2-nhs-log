import { Router } from "express";
import { createFleetVehicle, handleFindAllFleetVehicles } from "../controllers/fleet-vehicle.controller";

const fleetVehicleRoutes = Router();

fleetVehicleRoutes.get("/fleetVehicle", handleFindAllFleetVehicles);

fleetVehicleRoutes.post("/fleetVehicle/create", createFleetVehicle);

export default fleetVehicleRoutes;
