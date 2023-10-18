import IBaseRepository from "./base.repository";
import TItemRemittanceModel from "@/shared/src/models/ItemRemittance.model";
import ItemRemittance from "../../models/ItemRemittance";

class ItemRemittanceRepository implements IBaseRepository<TItemRemittanceModel> {
    async findAll(): Promise<TItemRemittanceModel[]> {
        const findAllResult = await ItemRemittance.findAll();
        return findAllResult;
    }

    async findOne({ id }: { id: string }): Promise<TItemRemittanceModel | null> {
        const findOneResult = await ItemRemittance.findOne({ where: { id } });
        return findOneResult;
    }

    async delete({ id }: { id: string }): Promise<boolean> {
        const deletedRows = await ItemRemittance.destroy({ where: { id } });

        if (deletedRows > 0) return true;
        return false;
    }
    async create({ data }: { data: TItemRemittanceModel }): Promise<TItemRemittanceModel> {
        const createResult = await ItemRemittance.create(data);
        return createResult;
    }

    async update({ data }: { data: TItemRemittanceModel }): Promise<TItemRemittanceModel | null> {
        const [affectedRows] = await ItemRemittance.update(data, { where: { id: data.id } });
        if (affectedRows > 0) return data;
        return null;
    }
}

export default new ItemRemittanceRepository();
