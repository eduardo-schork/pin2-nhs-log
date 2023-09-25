import { Request, Response } from "express";
import fleetVehicleRepository from "../../../../repositories/example/fleet-vehicle.repository";

async function handleFindAllFleetVehicles(req: Request, res: Response) {
    const vehicles = await fleetVehicleRepository.findAll();

    res.status(200).send(vehicles);
}

export { handleFindAllFleetVehicles };
