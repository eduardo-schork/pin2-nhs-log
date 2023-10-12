import express, { Router } from "express";
import fleetVehicleRoutes from "./fleet-vehicle.routes";
import loginRoute from "./login.routes";
import registerRoute from "./register.routes";
import fleetRoutes from "./fleet.routes";

const router = Router();

router.use("/api", fleetVehicleRoutes);

router.use("/api", loginRoute);

router.use("/api", registerRoute);

router.use("/api", fleetRoutes);


// router.use("/api", fleetRoutes);

// router.use("/api", fleetVehicleRoutes);

// router.use("/api", fleetVehicleRoutes);

export default router;
