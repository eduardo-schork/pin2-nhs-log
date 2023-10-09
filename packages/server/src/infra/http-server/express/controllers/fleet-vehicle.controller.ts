import { Request, Response } from "express";
import fleetVehicleRepository from "../../../../repositories/fleet-vehicle.repository";
import t from "../../../i18n";

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

export { handleFindAllFleetVehicles, createFleetVehicle };
