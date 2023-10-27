import { Request, Response } from "express";
import FeedbackRepository from "../../../../shared/repositories/feedback.repository";

async function findAll(req: Request, res: Response) {
    try {
        const findAllResult = await FeedbackRepository.findAll();
        return res.status(200).send(findAllResult);
    } catch (error) {
        console.log({ error });
        return res.status(500).send(error);
    }
}

async function findOne(req: Request, res: Response) {
    const idToFind = req.params.id;
    try {
        const findOneResult = await FeedbackRepository.findOne({ id: idToFind });
        return res.status(200).send(findOneResult);
    } catch (error) {
        console.log({ error });
        return res.status(500).send(error);
    }
}

async function create(req: Request, res: Response) {
    try {
        const body = req.body;

        const createResult = await FeedbackRepository.create({ data: body });
        return res.status(201).send(createResult);
    } catch (error) {
        console.log({ error });
        return res.status(500).send(error);
    }
}

async function update(req: Request, res: Response) {
    try {
        const body = req.body;

        const updateReturn = await FeedbackRepository.update({ data: body });
        return res.status(204).send(updateReturn);
    } catch (error) {
        console.log({ error });
        return res.status(500).send(error);
    }
}

async function deleteOne(req: Request, res: Response) {
    try {
        const idToFind = req.params.id;

        const deleteReturn = await FeedbackRepository.delete({ id: idToFind });

        if (deleteReturn) return res.status(204).send("");
        return res.status(400).send("");
    } catch (error) {
        console.log({ error });
        return res.status(500).send(error);
    }
}

const FeedbackController = {
    findAll,
    findOne,
    create,
    update,
    delete: deleteOne,
};

export default FeedbackController;
