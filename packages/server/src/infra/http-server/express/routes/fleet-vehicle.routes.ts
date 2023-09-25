import { Router } from "express";
import { handleFindAllFleetVehicles } from "../controllers/fleet-vehicle.controller";

const fleetVehicleRoutes = Router();

fleetVehicleRoutes.get("/fleetVehicle", handleFindAllFleetVehicles);

// fleetVehicleRoutes.post("/fleetVehicle", handleFindAllFleetVehicles);

// fleetVehicleRoutes.delete("/fleetVehicle", handleFindAllFleetVehicles);

export default fleetVehicleRoutes;
