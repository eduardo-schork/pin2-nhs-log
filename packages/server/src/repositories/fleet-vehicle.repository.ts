import FleetVehicle from "../models/FleetVehicle";
import IBaseRepository from "./base.repository";

class FleetVehicleRepository implements IBaseRepository<FleetVehicle> {
    findAll(): Promise<FleetVehicle[]> {
        throw new Error("Method not implemented.");
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
    async createFleetVehicle(vehicleModal: any, vehiclePlate: any, vehicleCpfDriver: any, vehicleRenavam: any): Promise<boolean> {

        const vehicle = await FleetVehicle.bulkCreate([{
            fv_modal: vehicleModal,
            fv_plate: vehiclePlate,
            fv_cpf_driver: vehicleCpfDriver,
            fv_revam: vehicleRenavam
        }]);
        return !!vehicle;
    }
}

export default new FleetVehicleRepository();
