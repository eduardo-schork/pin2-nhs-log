import { Request, Response } from "express";
import DeliveryProcessRepository from "../../../../shared/repositories/delivery-process.repository";

async function findAll(req: Request, res: Response) {
    try {
        const findAllResult = await DeliveryProcessRepository.findAll();
        return res.status(200).send(findAllResult);
    } catch (error) {
        console.log({ error });
        return res.status(500).send(error);
    }
}

async function findOne(req: Request, res: Response) {
    const idToFind = req.params.id;
    try {
        const findOneResult = await DeliveryProcessRepository.findOne({ id: idToFind });
        return res.status(200).send(findOneResult);
    } catch (error) {
        console.log({ error });
        return res.status(500).send(error);
    }
}

async function create(req: Request, res: Response) {
    try {
        const body = req.body;
        console.log(body);
        const createResult = await DeliveryProcessRepository.create({ data: body });
        if (createResult) {
            return res.status(200).send(createResult);
        }
    } catch (error) {
        console.log({ error });
        return res.status(500).send(error);
    }
}

async function createDeliveryProcess(req: Request, res: Response) {
    try {
        const body = req.body;
        const { status, offerId, feedbackId } = body;
        console.log('do');
        const deliveryProcess = await DeliveryProcessRepository.create({
            data: {
                status: 'body.status',
                offerId: body.offerId,
                feedbackId: body.feedbackId,
                createdAt: new Date(),
                createdBy: "", 
            },
        });

        return res.status(201).json(deliveryProcess);
    } catch (error) {
        console.error('Error creating delivery process:', error);
        return res.status(500).json({ error: 'Failed to create delivery process' });
    }
}

async function update(req: Request, res: Response) {
    try {
        const body = req.body;

        const updateReturn = await DeliveryProcessRepository.update({ data: body });
        return res.status(204).send(updateReturn);
    } catch (error) {
        console.log({ error });
        return res.status(500).send(error);
    }
}

async function deleteOne(req: Request, res: Response) {
    try {
        const idToFind = req.params.id;

        const deleteReturn = await DeliveryProcessRepository.delete({ id: idToFind });

        if (deleteReturn) return res.status(204).send("");
        return res.status(400).send("");
    } catch (error) {
        console.log({ error });
        return res.status(500).send(error);
    }
}

const DeliveryProcessController = {
    findAll,
    findOne,
    create,
    update,
    createDeliveryProcess,
    delete: deleteOne,
};

export default DeliveryProcessController;
