import { Router } from "express";
import ItemRemittanceController from "../controllers/item-remittance.controller";

const itemRemittanceRoutes = Router();

itemRemittanceRoutes.get("/item-remittance", ItemRemittanceController.findAll);

itemRemittanceRoutes.get("/item-remittance/:id", ItemRemittanceController.findOne);

itemRemittanceRoutes.post("/item-remittance", ItemRemittanceController.create);

itemRemittanceRoutes.delete("/item-remittance/:id", ItemRemittanceController.delete);

itemRemittanceRoutes.put("/item-remittance", ItemRemittanceController.update);

export default itemRemittanceRoutes;
