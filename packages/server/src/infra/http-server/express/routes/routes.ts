import express, { Router } from "express";
import fleetVehicleRoutes from "./fleet-vehicle.routes";

const router = Router();

router.use("/api", fleetVehicleRoutes);

// router.use("/api", fleetRoutes);

// router.use("/api", fleetVehicleRoutes);

// router.use("/api", fleetVehicleRoutes);

export default router;
