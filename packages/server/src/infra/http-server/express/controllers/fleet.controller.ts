import { Request, Response } from "express";
import fleetRepository from "../../../../repositories/fleet.repository";
import t from "../../../i18n";

async function handleFindAllFleet(req: Request, res: Response) {
    try {
        const fleets = await fleetRepository.findAll();

        if(fleets){
            res.status(200).send(fleets);
        } else{
            res.status(400).send({ "error ": t('FleetVehicle.noneFound') });
        }
    } catch (ex) {
        throw (ex);
    }
}

async function createFleet(req: Request, res: Response) {
    try {
        const fleetName = req.query.fleetName;
        const fleetVehicles = req.query.fleetVehicles as string[] | undefined;

        const vehicles = await fleetRepository.createFleet(fleetName, fleetVehicles)
        
        if(vehicles){
            res.status(200).send(true);
        } else{
            res.status(400).send({ "error ": t('FleetVehicle.notRegistered') });
        }
    } catch (ex) {
        throw (ex);
    }
}

export { handleFindAllFleet, createFleet };
