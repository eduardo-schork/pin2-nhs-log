import { Router } from "express";
import DeliveryAppointmentController from "../controllers/delivery-appointment.controller";

const deliveryAppointmentRoutes = Router();

deliveryAppointmentRoutes.get("/delivery-appointment", DeliveryAppointmentController.findAll);

deliveryAppointmentRoutes.get("/delivery-appointment/:id", DeliveryAppointmentController.findOne);

deliveryAppointmentRoutes.post("/delivery-appointment", DeliveryAppointmentController.create);

deliveryAppointmentRoutes.delete("/delivery-appointment/:id", DeliveryAppointmentController.delete);

deliveryAppointmentRoutes.put("/delivery-appointment", DeliveryAppointmentController.update);

export default deliveryAppointmentRoutes;
