import FleetVehicle from "../models/FleetVehicle";
import FleetVehicleRepo from "../repositories/FleetVehicleRepository";

class FleetVehicleUseCase {
    async create(modal: string, cpfDriver: string, plate: string, revam: string): Promise<void> {
        try {
            const fleetVehicleRepo = FleetVehicleRepo;
            const result = await fleetVehicleRepo.create(modal, cpfDriver, plate, revam);

             if(!result){
                throw new Error("Error while trying to execute FleetVehicleUseCase Create");
             }

        } catch (ex) {
            throw new Error(String(ex));
        }
    }

    delete(params: any): Promise<void> {
        throw new Error("Method not implemented.");
    }

    update(params: any): Promise<any> {
        throw new Error("Method not implemented.");
    }

    findById(params: any): Promise<any> {
        throw new Error("Method not implemented.");
    }

    findAll(params: any): Promise<any> {
        throw new Error("Method not implemented.");
    }
    
}

export default FleetVehicleUseCase;