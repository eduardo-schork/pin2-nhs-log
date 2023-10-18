import { Router } from "express";

import addressRoutes from "./address.routes";
import collectionScheduleRoutes from "./collection-schedule.routes";
import deliveryAppointmentRoutes from "./delivery-appointment.routes";
import deliveryProcessRoutes from "./delivery-process.routes";
import feedbackRoutes from "./feedback.routes";
import fleetVehicleRoutes from "./fleet-vehicle.routes";
import fleetRoutes from "./fleet.routes";
import itemRemittanceRoutes from "./item-remittance.routes";
import offerRoutes from "./offer.routes";
import paymentRoutes from "./payment.routes";
import quotationRoutes from "./quotation.routes";
import remittanceTypeTaxRoutes from "./remittance-type-tax.routes";
import userRoutes from "./user.routes";
import registerRoutes from "./auth/register.routes";
import loginRoutes from "./auth/login.routes";

const router = Router();

router.use("/api", addressRoutes);
router.use("/api", collectionScheduleRoutes);
router.use("/api", deliveryAppointmentRoutes);
router.use("/api", deliveryProcessRoutes);
router.use("/api", feedbackRoutes);
router.use("/api", fleetVehicleRoutes);
router.use("/api", fleetRoutes);
router.use("/api", itemRemittanceRoutes);
router.use("/api", offerRoutes);
router.use("/api", paymentRoutes);
router.use("/api", quotationRoutes);
router.use("/api", remittanceTypeTaxRoutes);
router.use("/api", userRoutes);

router.use("/api", registerRoutes);
router.use("/api", loginRoutes);

export default router;
