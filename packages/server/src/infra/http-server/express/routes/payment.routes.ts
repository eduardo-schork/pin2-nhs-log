import { Router } from "express";
import PaymentController from "../controllers/payment.controller";

const paymentRoutes = Router();

paymentRoutes.get("/payment", PaymentController.findAll);

paymentRoutes.get("/payment/:id", PaymentController.findOne);

paymentRoutes.post("/payment", PaymentController.create);

paymentRoutes.delete("/payment/:id", PaymentController.delete);

paymentRoutes.put("/payment", PaymentController.update);

export default paymentRoutes;
