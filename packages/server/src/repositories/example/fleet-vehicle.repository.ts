import IBaseRepository from "./base.repository";
import FleetVehicle from "@/shared/src/models/FleetVehicle.model";

class FleetVehicleRepository implements IBaseRepository<FleetVehicle> {
    findAll(): Promise<FleetVehicle[]> {
        // Go to database and find vehicles

        // Normalize database FleetVehicle to Shared Model FleetVehicle

        // Return normalized FleetVehicles

        const vehicles = [
            {
                id: 123,
                model: "BMW",
                plate: "123ABC",
                cpfDriver: "090210391320",
                createdAt: 2139812398312,
                createdBy: "090210391320",
            },
        ];

        return new Promise((resolve) => {
            resolve(vehicles);
        });
    }
    findOne({ id }: { id: string }): Promise<FleetVehicle> {
        throw new Error("Method not implemented.");
    }
    delete({ id }: { id: string }): Promise<void> {
        throw new Error("Method not implemented.");
    }
    create({ data }: { data: FleetVehicle }): Promise<FleetVehicle> {
        throw new Error("Method not implemented.");
    }
    update({ data }: { data: FleetVehicle }): Promise<FleetVehicle> {
        throw new Error("Method not implemented.");
    }
}

export default new FleetVehicleRepository();
