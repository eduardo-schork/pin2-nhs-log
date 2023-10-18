import { Router } from "express";
import RemittanceTypeTaxController from "../controllers/remittance-type-tax.controller";

const remittanceTypeTaxRoutes = Router();

remittanceTypeTaxRoutes.get("/remittance-type-tax", RemittanceTypeTaxController.findAll);

remittanceTypeTaxRoutes.get("/remittance-type-tax/:id", RemittanceTypeTaxController.findOne);

remittanceTypeTaxRoutes.post("/remittance-type-tax", RemittanceTypeTaxController.create);

remittanceTypeTaxRoutes.delete("/remittance-type-tax/:id", RemittanceTypeTaxController.delete);

remittanceTypeTaxRoutes.put("/remittance-type-tax", RemittanceTypeTaxController.update);

export default remittanceTypeTaxRoutes;
