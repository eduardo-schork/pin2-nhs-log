import FleetVehicle from "../models/FleetVehicle";
import IBaseRepository from "./base.repository";

class FleetVehicleRepository implements IBaseRepository<FleetVehicle> {
    async findAll(): Promise<FleetVehicle[]> {
        const vehicle = await FleetVehicle.findAll();

        return vehicle;
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
    async createFleetVehicle(
        vehicleModal: any,
        vehiclePlate: any,
        vehicleCpfDriver: any,
        vehicleRenavam: any
    ): Promise<boolean> {
        const vehicle = await FleetVehicle.bulkCreate([
            {
                fv_modal: vehicleModal,
                fv_plate: vehiclePlate,
                fv_cpf_driver: vehicleCpfDriver,
                fv_revam: vehicleRenavam,
            },
        ]);
        return !!vehicle;
    }

    async deleteFleetVehicle(vehicleId: string): Promise<boolean> {
        try {
            const result = await FleetVehicle.destroy({
                where: {
                    pk_fleet_vehicle: vehicleId,
                },
            });
            return result > 0;
        } catch (error) {
            throw error;
        }
    }

    async updateFleetVehicle(
        vehicleId: any,
        vehicleModal: any,
        vehiclePlate: any,
        vehicleCpfDriver: any,
        vehicleRenavam: any
    ): Promise<boolean> {
        try {
            const [rowsUpdated] = await FleetVehicle.update(
                {
                    fv_modal: vehicleModal,
                    fv_plate: vehiclePlate,
                    fv_cpf_driver: vehicleCpfDriver,
                    fv_revam: vehicleRenavam,
                },
                {
                    where: {
                        pk_fleet_vehicle: vehicleId,
                    },
                }
            );

            return rowsUpdated > 0;
        } catch (error) {
            throw error;
        }
    }
}

export default new FleetVehicleRepository();
