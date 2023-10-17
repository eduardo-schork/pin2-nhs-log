import { Router } from "express";
import { handleCreateQuotation } from "../controllers/quotation.controller";

const quotationRoutes = Router();

quotationRoutes.post("/quotation", handleCreateQuotation);

// quotationRoutes.get("/quotation", handleCreateQuotation);

export default quotationRoutes;
