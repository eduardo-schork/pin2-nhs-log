import { Router } from "express";
import DeliveryProcessController from "../controllers/delivery-process.controller";

const deliveryProcessRoutes = Router();

deliveryProcessRoutes.get("/delivery-process", DeliveryProcessController.findAll);

deliveryProcessRoutes.get("/delivery-process/:id", DeliveryProcessController.findOne);

deliveryProcessRoutes.post("/delivery-process", DeliveryProcessController.create);

deliveryProcessRoutes.delete("/delivery-process/:id", DeliveryProcessController.delete);

deliveryProcessRoutes.put("/delivery-process", DeliveryProcessController.update);

export default deliveryProcessRoutes;
