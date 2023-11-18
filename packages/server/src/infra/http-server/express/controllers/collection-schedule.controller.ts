import { Request, Response } from "express";
import CollectionScheduleRepository from "../../../../shared/repositories/collection-schedule.repository";

async function findAll(req: Request, res: Response) {
    try {
        const findAllResult = await CollectionScheduleRepository.findAll();
        return res.status(200).send(findAllResult);
    } catch (error) {
        console.log({ error });
        return res.status(500).send(error);
    }
}

async function findOne(req: Request, res: Response) {
    const idToFind = req.params.id;
    try {
        const findOneResult = await CollectionScheduleRepository.findOne({ id: idToFind });
        return res.status(200).send(findOneResult);
    } catch (error) {
        console.log({ error });
        return res.status(500).send(error);
    }
}

async function create(req: Request, res: Response) {
    try {
        const body = req.body;

        const createResult = await CollectionScheduleRepository.create({ data: body });
        return res.status(201).send(createResult);
    } catch (error) {
        console.log({ error });
        return res.status(500).send(error);
    }
}

async function createCollectionSchedule(req: Request, res: Response) {
    try {
        const body = req.body;

        const collectionSchedule = await CollectionScheduleRepository.create({
            data: {
                date: body.date,
                comment: body.instructions,
                collectionAddressId: body.idAddress,
                createdAt: new Date(),
                createdBy: "",
            },
        });

        return res.status(201).json({ collectionSchedule });
    } catch (error) {
        console.error("Error creating collection schedule:", error);
        return res.status(500).json({ error: "Failed to create collection schedule" });
    }
}

async function update(req: Request, res: Response) {
    try {
        const body = req.body;

        const updateReturn = await CollectionScheduleRepository.update({ data: body });
        return res.status(204).send(updateReturn);
    } catch (error) {
        console.log({ error });
        return res.status(500).send(error);
    }
}

async function deleteOne(req: Request, res: Response) {
    try {
        const idToFind = req.params.id;

        const deleteReturn = await CollectionScheduleRepository.delete({ id: idToFind });

        if (deleteReturn) return res.status(204).send("");
        return res.status(400).send("");
    } catch (error) {
        console.log({ error });
        return res.status(500).send(error);
    }
}

const CollectionScheduleController = {
    findAll,
    findOne,
    create,
    update,
    createCollectionSchedule,
    delete: deleteOne,
};

export default CollectionScheduleController;
