import { Request, Response } from "express";
import FleetVehicleRepository from "../../../../shared/repositories/fleet-vehicle.repository";
import t from "../../../i18n";
import FleetVehicle from "../../../../models/FleetVehicle";
import TFleetVehicleModel from "@/shared/src/models/FleetVehicle.model";

async function handleFindAllFleetVehicles(req: Request, res: Response) {
    try {
        const vehicles = await FleetVehicleRepository.findAll();

        if (vehicles) {
            res.status(200).send(vehicles);
        } else {
            res.status(400).send({ "error ": t("FleetVehicle.noneFound") });
        }
    } catch (ex) {
        throw ex;
    }
}

async function createFleetVehicle(req: Request, res: Response) {
    try {
        const vehicleModal = req.query.vehicleModal;
        const vehiclePlate = req.query.vehiclePlate;
        const vehicleCpfDriver = req.query.vehicleCpfDriver;
        const vehicleRenavam = req.query.vehicleRenavam;

        const vehicles = await FleetVehicleRepository.createFleetVehicle(
            vehicleModal,
            vehiclePlate,
            vehicleCpfDriver,
            vehicleRenavam
        );

        if (vehicles) {
            res.status(200).send(true);
        } else {
            res.status(400).send({ "error ": t("FleetVehicle.notRegistered") });
        }
    } catch (ex) {
        throw ex;
    }
}

async function deleteFleetVehicle(req: Request, res: Response) {
    const vehicleId = req.params.vehicleId;

    try {
        const existingVehicle = await FleetVehicle.findByPk(vehicleId);

        if (!existingVehicle) {
            return res.status(404).send({ error: "Veículo não encontrado." });
        }

        const isDeleted = await FleetVehicleRepository.deleteFleetVehicle(vehicleId);

        if (isDeleted) {
            return res.status(200).send({ success: true });
        } else {
            return res.status(500).send({ error: "O veículo não pôde ser excluído." });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: "Ocorreu um erro durante a exclusão do veículo." });
    }
}

async function updateFleetVehicle(req: Request, res: Response) {
    const vehicleId = req.params.vehicleId;
    const { model, plate, cpfDriver, renavam } = req.body as TFleetVehicleModel;
    try {
        const existingVehicle = await FleetVehicle.findByPk(vehicleId);

        if (!existingVehicle) {
            return res.status(404).send({ error: "Veículo não encontrado." });
        }

        const updated = await FleetVehicleRepository.updateFleetVehicle(
            vehicleId,
            model,
            plate,
            cpfDriver,
            renavam
        );

        if (updated) {
            return res.status(200).send({ message: "Veículo atualizado com sucesso." });
        } else {
            return res.status(500).send({ error: "Falha ao atualizar o veículo." });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: "Ocorreu um erro durante a atualização do veículo." });
    }
}

async function findAll(req: Request, res: Response) {
    try {
        const findAllResult = await FleetVehicleRepository.findAll();
        return res.status(200).send(findAllResult);
    } catch (error) {
        console.log("error");
        return res.status(500).send("");
    }
}

async function findOne(req: Request, res: Response) {
    const idToFind = req.params.id;
    try {
        const findOneResult = await FleetVehicleRepository.findOne({ id: idToFind });
        return res.status(200).send(findOneResult);
    } catch (error) {
        console.log("error");
        return res.status(500).send("");
    }
}

async function create(req: Request, res: Response) {
    try {
        const body = req.body;

        const createResult = await FleetVehicleRepository.create({ data: body });
        return res.status(201).send(createResult);
    } catch (error) {
        console.log("error");
        return res.status(500).send("");
    }
}

async function update(req: Request, res: Response) {
    try {
        const body = req.body;

        const updateReturn = await FleetVehicleRepository.update({ data: body });
        return res.status(204).send(updateReturn);
    } catch (error) {
        console.log("error");
        return res.status(500).send("");
    }
}

async function deleteOne(req: Request, res: Response) {
    try {
        const idToFind = req.params.id;

        const deleteReturn = await FleetVehicleRepository.delete({ id: idToFind });

        if (deleteReturn) return res.status(204).send("");
        return res.status(400).send("");
    } catch (error) {
        console.log("error");
        return res.status(500).send("");
    }
}

const FleetVehicleController = {
    findAll,
    findOne,
    create,
    update,
    delete: deleteOne,

    // created before refactor handlers
    handleFindAllFleetVehicles,
    createFleetVehicle,
    deleteFleetVehicle,
    updateFleetVehicle,
};

export default FleetVehicleController;
