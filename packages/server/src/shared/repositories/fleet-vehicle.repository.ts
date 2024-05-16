import TFleetVehicleModel from "@/shared/src/models/FleetVehicle.model";
import FleetVehicle from "../../models/FleetVehicle";
import IBaseRepository from "./base.repository";
import { z } from "zod";

const TFleetVehicleSchema = z.object({
    model: z.string().nonempty(),
    plate: z.string().nonempty(),
    cpfDriver: z.string().nonempty(),
    renavam: z.string().nonempty(),
});

class FleetVehicleRepository implements IBaseRepository<TFleetVehicleModel> {
    async findAll(): Promise<TFleetVehicleModel[]> {
        const findAllResult = await FleetVehicle.findAll();
        return findAllResult;
    }

    async findOne({ id }: { id: string }): Promise<TFleetVehicleModel | null> {
        const findOneResult = await FleetVehicle.findOne({ where: { id } });
        return findOneResult;
    }

    async delete({ id }: { id: string }): Promise<boolean> {
        const deletedRows = await FleetVehicle.destroy({ where: { id } });

        if (deletedRows > 0) return true;
        return false;
    }

    async validateInput(data: TFleetVehicleModel) {
        try {
            await TFleetVehicleSchema.parseAsync(data);
        } catch (error) {
            throw new Error("Erro. Os campos obrigatórios devem ser preenchidos!");
        }
    }

    async create({ data }: { data: TFleetVehicleModel }): Promise<TFleetVehicleModel> {
        // await this.validateInput(data);

        const createResult = await FleetVehicle.create(data);
        return createResult;
    }

    async update({ data }: { data: TFleetVehicleModel }): Promise<TFleetVehicleModel | null> {
        const [affectedRows] = await FleetVehicle.update(data, { where: { id: data.id } });
        if (affectedRows > 0) return data;
        return null;
    }

    async createFleetVehicle(
        vehicleModal: any,
        vehiclePlate: any,
        vehicleCpfDriver: any,
        vehicleRenavam: any
    ): Promise<boolean> {
        const vehicle = await FleetVehicle.create({
            model: vehicleModal,
            plate: vehiclePlate,
            cpfDriver: vehicleCpfDriver,
            renavam: vehicleRenavam,
            createdAt: new Date(),
            createdBy: "",
        });
        return !!vehicle;
    }

    async deleteFleetVehicle(vehicleId: string): Promise<boolean> {
        try {
            const result = await FleetVehicle.destroy({
                where: {
                    id: vehicleId,
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
                    model: vehicleModal,
                    plate: vehiclePlate,
                    cpfDriver: vehicleCpfDriver,
                    renavam: vehicleRenavam,
                },
                {
                    where: {
                        id: vehicleId,
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
