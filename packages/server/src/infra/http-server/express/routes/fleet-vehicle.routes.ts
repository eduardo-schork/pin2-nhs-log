import { Router } from "express";
import FleetVehicleController from "../controllers/fleet-vehicle.controller";

const fleetVehicleRoutes = Router();

fleetVehicleRoutes.get("/fleetVehicle", FleetVehicleController.handleFindAllFleetVehicles);

fleetVehicleRoutes.post("/fleetVehicle/create", FleetVehicleController.createFleetVehicle);

fleetVehicleRoutes.delete(
    "/fleetVehicle/delete/:vehicleId",
    FleetVehicleController.deleteFleetVehicle
);

fleetVehicleRoutes.put(
    "/fleetVehicle/update/:vehicleId",
    FleetVehicleController.updateFleetVehicle
);

fleetVehicleRoutes.get("/fleet-vehicle", FleetVehicleController.findAll);

fleetVehicleRoutes.get("/fleet-vehicle/:id", FleetVehicleController.findOne);

fleetVehicleRoutes.post("/fleet-vehicle", FleetVehicleController.create);

fleetVehicleRoutes.delete("/fleet-vehicle/:id", FleetVehicleController.delete);

fleetVehicleRoutes.put("/fleet-vehicle", FleetVehicleController.update);

export default fleetVehicleRoutes;
