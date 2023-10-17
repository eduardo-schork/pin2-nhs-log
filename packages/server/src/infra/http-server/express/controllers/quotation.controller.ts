import { Request, Response } from "express";
import QuotationRepository from "../../../../shared/repositories/quotation.repository";
import TQuotationModel from "@/shared/src/models/Quotation.model";

async function handleCreateQuotation(req: Request<TQuotationModel>, res: Response) {
    try {
        const requestBody = req.body;
        console.log({ requestBody });

        const result = await QuotationRepository.create(req.body);

        if (result) {
            res.status(200).send(result);
        } else {
            res.status(400).send("error");
        }
    } catch (ex) {
        throw ex;
    }
}

export { handleCreateQuotation };
