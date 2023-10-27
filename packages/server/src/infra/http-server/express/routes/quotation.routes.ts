import { Router } from "express";
import QuotationController from "../controllers/quotation.controller";

const quotationRoutes = Router();

quotationRoutes.post("/quotation", QuotationController.createWithAddresses);

quotationRoutes.get("/quotation", QuotationController.findAll);

quotationRoutes.get("/quotation/:id", QuotationController.findOne);

quotationRoutes.get("/quotation-by-cpf/:cpf", QuotationController.findAllByCPF);

quotationRoutes.get("/quotation-not-approved/", QuotationController.findAllWithoutApprovedOffers);

quotationRoutes.delete("/quotation/:id", QuotationController.delete);

quotationRoutes.put("/quotation", QuotationController.update);

export default quotationRoutes;
