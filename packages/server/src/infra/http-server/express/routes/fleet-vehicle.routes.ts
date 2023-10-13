import { Router } from "express";
import { createFleetVehicle, deleteFleetVehicle, handleFindAllFleetVehicles } from "../controllers/fleet-vehicle.controller";

const fleetVehicleRoutes = Router();

fleetVehicleRoutes.get("/fleetVehicle", handleFindAllFleetVehicles);

fleetVehicleRoutes.post("/fleetVehicle/create", createFleetVehicle);

fleetVehicleRoutes.delete("/fleetVehicle/delete/:vehicleId", deleteFleetVehicle);

export default fleetVehicleRoutes;
