import { Request, Response } from "express";
import OfferRepository from "../../../../shared/repositories/offer.repository";

async function findAll(req: Request, res: Response) {
    try {
        const findAllResult = await OfferRepository.findAll();
        return res.status(200).send(findAllResult);
    } catch (error) {
        console.log({ error });
        return res.status(500).send(error);
    }
}

async function findOne(req: Request, res: Response) {
    const idToFind = req.params.id;
    try {
        const findOneResult = await OfferRepository.findOne({ id: idToFind });
        return res.status(200).send(findOneResult);
    } catch (error) {
        console.log({ error });
        return res.status(500).send(error);
    }
}

async function findOfferByQuotationId(req: Request, res: Response) {
    const idToFind = req.params.id;
    try {
        console.log(idToFind)
        const foundOffers = await OfferRepository.findAllByQuotation(idToFind);
        return res.status(200).send(foundOffers);
    } catch (error) {
        console.log({ error });
        return res.status(500).send(error);
    }
}

async function create(req: Request, res: Response) {
    try {
        const body = req.body;
        const createResult = await OfferRepository.create({ data: body });
        return res.status(200).send(createResult);
    } catch (error) {
        console.log({ error });
        return res.status(500).send(error);
    }
}

async function update(req: Request, res: Response) {
    try {
        const body = req.body;

        const updateReturn = await OfferRepository.update({ data: body });
        return res.status(200).send(updateReturn);
    } catch (error) {
        console.log({ error });
        return res.status(500).send(error);
    }
}

async function deleteOne(req: Request, res: Response) {
    try {
        const idToFind = req.params.id;

        const deleteReturn = await OfferRepository.delete({ id: idToFind });

        if (deleteReturn) return res.status(204).send("");
        return res.status(400).send("");
    } catch (error) {
        console.log({ error });
        return res.status(500).send(error);
    }
}

const OfferController = {
    findAll,
    findOne,
    create,
    update,
    delete: deleteOne,
    findOfferByQuotationId
};

export default OfferController;
