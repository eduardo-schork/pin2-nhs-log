import { Router } from "express";
import DeliveryProcessController from "../controllers/delivery-process.controller";

const deliveryProcessRoutes = Router();

deliveryProcessRoutes.get("/delivery-process", DeliveryProcessController.findAll);

deliveryProcessRoutes.get("/delivery-process/:id", DeliveryProcessController.findOne);

deliveryProcessRoutes.post("/delivery-process", DeliveryProcessController.create);

deliveryProcessRoutes.post(
    "/delivery-process/create",
    DeliveryProcessController.createDeliveryProcess
);

deliveryProcessRoutes.delete("/delivery-process/:id", DeliveryProcessController.delete);

deliveryProcessRoutes.put("/delivery-process", DeliveryProcessController.update);

deliveryProcessRoutes.get("/delivery-process-opened", DeliveryProcessController.findAllOpened);

deliveryProcessRoutes.post(
    "/update-delivery-process-status",
    DeliveryProcessController.updateStatus
);

export default deliveryProcessRoutes;
