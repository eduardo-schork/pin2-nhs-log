import { Router } from "express";
import OfferController from "../controllers/offer.controller";

const offerRoutes = Router();

offerRoutes.get("/offer", OfferController.findAll);

offerRoutes.get("/offer/:id", OfferController.findOne);

offerRoutes.post("/offer", OfferController.create);

offerRoutes.delete("/offer/:id", OfferController.delete);

offerRoutes.put("/offer", OfferController.update);

export default offerRoutes;
