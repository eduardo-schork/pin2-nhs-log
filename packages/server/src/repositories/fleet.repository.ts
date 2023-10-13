import Fleet from "../models/Fleet";
import FleetVehicle from "../models/FleetVehicle";
import IBaseRepository from "./base.repository";

class FleetRepository implements IBaseRepository<Fleet> {
    
    async findAll(): Promise<Fleet[]> {
        const fleet = await Fleet.findAll();

        return fleet;
    }

    findOne({ id }: { id: string }): Promise<Fleet> {
        throw new Error("Method not implemented.");
    }
    delete({ id }: { id: string }): Promise<void> {
        throw new Error("Method not implemented.");
    }
    create({ data }: { data: Fleet }): Promise<Fleet> {
        throw new Error("Method not implemented.");
    }
    update({ data }: { data: Fleet }): Promise<Fleet> {
        throw new Error("Method not implemented.");
    }
    async createFleet(fleetName: any, fleetVehicles: any): Promise<boolean> {
        try {
            const vehicleIds = fleetVehicles.split(',').map(Number);

            for (const vehicleId of vehicleIds) {
                await Fleet.create({
                    fl_name: fleetName, 
                    fk_fleet_vehicle: vehicleId, 
                });
            }

            return true;
        } catch (error) {
            console.error('Erro ao criar frota:', error);
            return false;
        } 
    }
}

export default new FleetRepository();
