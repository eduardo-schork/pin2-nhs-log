import IBaseRepository from "./base.repository";
import TDeliveryProcessModel from "@/shared/src/models/DeliveryProcess.model";
import DeliveryProcess from "../../models/DeliveryProcess";

class DeliveryProcessRepository implements IBaseRepository<TDeliveryProcessModel> {
    async findAll(): Promise<TDeliveryProcessModel[]> {
        const findAllResult = await DeliveryProcess.findAll();
        return findAllResult;
    }

    async findOne({ id }: { id: string }): Promise<TDeliveryProcessModel | null> {
        const findOneResult = await DeliveryProcess.findOne({ where: { id } });
        return findOneResult;
    }

    async delete({ id }: { id: string }): Promise<boolean> {
        const deletedRows = await DeliveryProcess.destroy({ where: { id } });

        if (deletedRows > 0) return true;
        return false;
    }
    async create({ data }: { data: TDeliveryProcessModel }): Promise<TDeliveryProcessModel> {
        const createResult = await DeliveryProcess.create(data);
        return createResult;
    }

    async update({ data }: { data: TDeliveryProcessModel }): Promise<TDeliveryProcessModel | null> {
        const [affectedRows] = await DeliveryProcess.update(data, { where: { id: data.id } });
        if (affectedRows > 0) return data;
        return null;
    }
}

export default new DeliveryProcessRepository();
