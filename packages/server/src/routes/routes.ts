import express, { Router } from 'express';
import FleetVehicleController from '../controllers/FleetVehicleController';

const router = express.Router();

router.post("/admin/fleet/vehicle", FleetVehicleController.test);

export default router;
