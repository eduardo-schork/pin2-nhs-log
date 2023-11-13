import TFleetModel from "@/shared/src/models/Fleet.model";
import Fleet from "../../models/Fleet";
import IBaseRepository from "./base.repository";
import FleetVehicleFleet from "../../models/FleetVehicleFleet";
import FleetVehicle from "../../models/FleetVehicle";

class FleetRepository implements IBaseRepository<TFleetModel> {
    async findAll(): Promise<TFleetModel[]> {
        const fleets = await Fleet.findAll({
            include: [
                {
                    model: FleetVehicleFleet,
                    include: [
                        {
                            model: FleetVehicle,
                        },
                    ],
                },
            ],
        });

        const result = fleets?.map((fleet) => {
            console.log(fleet);
            return {
                id: fleet.id,
                name: fleet.name,
                createdAt: fleet.createdAt,
                createdBy: fleet.createdBy,
                updatedAt: fleet.updatedAt,
                updatedBy: fleet.updatedBy,
                deletedAt: fleet.deletedAt,
                deletedBy: fleet.deletedBy,
                vehicles: fleet?.fleetVehicleFleets?.map((fleetVehicleFleet) => {
                    return fleetVehicleFleet.fleetVehicle;
                }),
            };
        });

        return result as TFleetModel[];
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

            const fleet = await Fleet.create({
                name: fleetName,
            });

            for (const vehicleId of vehicleIds) {
                await FleetVehicleFleet.create({
                    fleetVehicleId: vehicleId,
                    fleetId: fleet.id,
                    createdAt: new Date(),
                    createdBy: "",
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
