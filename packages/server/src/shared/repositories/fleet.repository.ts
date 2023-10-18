import TFleetModel from "@/shared/src/models/Fleet.model";
import Fleet from "../../models/Fleet";
import IBaseRepository from "./base.repository";

class FleetRepository implements IBaseRepository<TFleetModel> {
    async findAll(): Promise<TFleetModel[]> {
        const findAllResult = await Fleet.findAll();
        return findAllResult;
    }

    async findOne({ id }: { id: string }): Promise<TFleetModel | null> {
        const findOneResult = await Fleet.findOne({ where: { id } });
        return findOneResult;
    }

    async delete({ id }: { id: string }): Promise<boolean> {
        const deletedRows = await Fleet.destroy({ where: { id } });

        if (deletedRows > 0) return true;
        return false;
    }
    async create({ data }: { data: TFleetModel }): Promise<TFleetModel> {
        const createResult = await Fleet.create(data);
        return createResult;
    }

    async update({ data }: { data: TFleetModel }): Promise<TFleetModel | null> {
        const [affectedRows] = await Fleet.update(data, { where: { id: data.id } });
        if (affectedRows > 0) return data;
        return null;
    }

    async createFleet(fleetName: any, fleetVehicles: any): Promise<boolean> {
        try {
            const vehicleIds = fleetVehicles.split(",").map(Number);

            for (const vehicleId of vehicleIds) {
                await Fleet.create({
                    name: fleetName,
                    fleetVehicleId: vehicleId,
                });
            }

            return true;
        } catch (error) {
            console.error("Erro ao criar frota:", error);
            return false;
        }
    }
}

export default new FleetRepository();
