import { Router } from "express";
import { createFleetVehicle, handleFindAllFleetVehicles } from "../controllers/fleet-vehicle.controller";

const fleetVehicleRoutes = Router();

fleetVehicleRoutes.get("/fleetVehicle", handleFindAllFleetVehicles);

fleetVehicleRoutes.post("/fleetVehicle/create", createFleetVehicle);

// fleetVehicleRoutes.delete("/fleetVehicle", handleFindAllFleetVehicles);

export default fleetVehicleRoutes;
