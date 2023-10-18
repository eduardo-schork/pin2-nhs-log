import { Request, Response } from "express";
import fleetRepository from "../../../../shared/repositories/fleet.repository";
import t from "../../../i18n";

async function createWithVehicles(req: Request, res: Response) {
    try {
        const fleetName = req.query.fleetName;
        const fleetVehicles = req.query.fleetVehicles as string[] | undefined;

        const vehicles = await fleetRepository.createFleet(fleetName, fleetVehicles);

        if (vehicles) {
            res.status(200).send(true);
        } else {
            res.status(400).send({ "error ": t("FleetVehicle.notRegistered") });
        }
    } catch (ex) {
        throw ex;
    }
}

async function findAll(req: Request, res: Response) {
    try {
        const findAllResult = await fleetRepository.findAll();
        return res.status(200).send(findAllResult);
    } catch (error) {
        console.log("error");
        return res.status(500).send("");
    }
}

async function findOne(req: Request, res: Response) {
    const idToFind = req.params.id;
    try {
        const findOneResult = await fleetRepository.findOne({ id: idToFind });
        return res.status(200).send(findOneResult);
    } catch (error) {
        console.log("error");
        return res.status(500).send("");
    }
}

async function create(req: Request, res: Response) {
    try {
        const body = req.body;

        const createResult = await fleetRepository.create({ data: body });
        return res.status(201).send(createResult);
    } catch (error) {
        console.log("error");
        return res.status(500).send("");
    }
}

async function update(req: Request, res: Response) {
    try {
        const body = req.body;

        const updateReturn = await fleetRepository.update({ data: body });
        return res.status(204).send(updateReturn);
    } catch (error) {
        console.log("error");
        return res.status(500).send("");
    }
}

async function deleteOne(req: Request, res: Response) {
    try {
        const idToFind = req.params.id;

        const deleteReturn = await fleetRepository.delete({ id: idToFind });

        if (deleteReturn) return res.status(204).send("");
        return res.status(400).send("");
    } catch (error) {
        console.log("error");
        return res.status(500).send("");
    }
}

const FleetController = {
    findAll,
    findOne,
    create,
    createWithVehicles,
    update,
    delete: deleteOne,
};

export default FleetController;
