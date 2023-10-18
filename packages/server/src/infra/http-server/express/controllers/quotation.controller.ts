import { Request, Response } from "express";

import createQuotationWithAddressesUsecase, {
    TCreateQuotationWithAddresses,
} from "../../../../shared/usecases/create-quotation-with-address.usecase";

import PaymentRepository from "../../../../shared/repositories/address.repository";

async function createWithAddresses(req: Request<TCreateQuotationWithAddresses>, res: Response) {
    try {
        const requestBody = req.body;

        const result = await createQuotationWithAddressesUsecase(requestBody);

        if (result) {
            res.status(201).send(result);
        } else {
            res.status(400).send("error");
        }
    } catch (ex) {
        console.log({ ex });
        // throw ex;
    }
}

async function findAll(req: Request, res: Response) {
    try {
        const findAllResult = await PaymentRepository.findAll();
        return res.status(200).send(findAllResult);
    } catch (error) {
        console.log("error");
        return res.status(500).send("");
    }
}

async function findOne(req: Request, res: Response) {
    const idToFind = req.params.id;
    try {
        const findOneResult = await PaymentRepository.findOne({ id: idToFind });
        return res.status(200).send(findOneResult);
    } catch (error) {
        console.log("error");
        return res.status(500).send("");
    }
}

async function create(req: Request, res: Response) {
    try {
        const body = req.body;

        const createResult = await PaymentRepository.create({ data: body });
        return res.status(201).send(createResult);
    } catch (error) {
        console.log("error");
        return res.status(500).send("");
    }
}

async function update(req: Request, res: Response) {
    try {
        const body = req.body;

        const updateReturn = await PaymentRepository.update({ data: body });
        return res.status(204).send(updateReturn);
    } catch (error) {
        console.log("error");
        return res.status(500).send("");
    }
}

async function deleteOne(req: Request, res: Response) {
    try {
        const idToFind = req.params.id;

        const deleteReturn = await PaymentRepository.delete({ id: idToFind });

        if (deleteReturn) return res.status(204).send("");
        return res.status(400).send("");
    } catch (error) {
        console.log("error");
        return res.status(500).send("");
    }
}

const QuotationController = {
    findAll,
    findOne,
    create,
    update,
    delete: deleteOne,
    createWithAddresses,
};

export default QuotationController;
