import { Request, Response } from "express";
import fleetVehicleRepository from "../../../../repositories/fleet-vehicle.repository";
import t from "../../../i18n";
import FleetVehicle from "../../../../models/FleetVehicle";

async function handleFindAllFleetVehicles(req: Request, res: Response) {
    try {
        const vehicles = await fleetVehicleRepository.findAll();

        if(vehicles){
            res.status(200).send(vehicles);
        } else{
            res.status(400).send({ "error ": t('FleetVehicle.noneFound') });
        }
    } catch (ex) {
        throw (ex);
    }
}

async function createFleetVehicle(req: Request, res: Response) {
    try {
        const vehicleModal = req.query.vehicleModal;
        const vehiclePlate = req.query.vehiclePlate;
        const vehicleCpfDriver = req.query.vehicleCpfDriver;
        const vehicleRenavam = req.query.vehicleRenavam;

        const vehicles = await fleetVehicleRepository.createFleetVehicle(vehicleModal, vehiclePlate, vehicleCpfDriver, vehicleRenavam)
        
        if(vehicles){
            res.status(200).send(true);
        } else{
            res.status(400).send({ "error ": t('FleetVehicle.notRegistered') });
        }
    } catch (ex) {
        throw (ex);
    }
    
}

async function deleteFleetVehicle(req: Request, res: Response) {
    const vehicleId = req.params.vehicleId;

    try {
        const existingVehicle = await FleetVehicle.findByPk(vehicleId);
        
        if (!existingVehicle) {
            return res.status(404).send({ error: 'Veículo não encontrado.' });
        }

        const isDeleted = await fleetVehicleRepository.deleteFleetVehicle(vehicleId);

        if (isDeleted) {
            return res.status(200).send({ success: true });
        } else {
            return res.status(500).send({ error: 'O veículo não pôde ser excluído.' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: 'Ocorreu um erro durante a exclusão do veículo.' });
    }
}

export { handleFindAllFleetVehicles, createFleetVehicle, deleteFleetVehicle };
