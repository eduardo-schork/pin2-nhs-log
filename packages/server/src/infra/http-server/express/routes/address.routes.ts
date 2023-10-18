import { Router } from "express";
import AddressController from "../controllers/address.controller";

const addressRoutes = Router();

addressRoutes.get("/address", AddressController.findAll);

addressRoutes.get("/address/:id", AddressController.findOne);

addressRoutes.post("/address", AddressController.create);

addressRoutes.delete("/address/:id", AddressController.delete);

addressRoutes.put("/address", AddressController.update);

export default addressRoutes;
