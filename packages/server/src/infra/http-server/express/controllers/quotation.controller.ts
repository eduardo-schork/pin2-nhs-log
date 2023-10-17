import { Request, Response } from "express";

import createQuotationWithAddressesUsecase, {
    TCreateQuotationWithAddresses,
} from "../../../../shared/usecases/create-quotation-with-address.usecase";

async function handleCreateQuotation(req: Request<TCreateQuotationWithAddresses>, res: Response) {
    try {
        const requestBody = req.body;

        const result = await createQuotationWithAddressesUsecase(requestBody);

        if (result) {
            res.status(200).send(result);
        } else {
            res.status(400).send("error");
        }
    } catch (ex) {
        console.log({ ex });
        // throw ex;
    }
}

export { handleCreateQuotation };
