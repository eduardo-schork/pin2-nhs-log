import IBaseRepository from "./base.repository";
import TRemittanceTypeTax from "@/shared/src/models/RemittanceTypeTax.model";
import RemittanceTypeTax from "../../models/RemittanceTypeTax";

class RemittanceTypeTaxRepository implements IBaseRepository<TRemittanceTypeTax> {
    async findAll(): Promise<TRemittanceTypeTax[]> {
        const findAllResult = await RemittanceTypeTax.findAll();
        return findAllResult;
    }

    async findOne({ id }: { id: string }): Promise<TRemittanceTypeTax | null> {
        const findOneResult = await RemittanceTypeTax.findOne({ where: { id } });
        return findOneResult;
    }

    async delete({ id }: { id: string }): Promise<boolean> {
        const deletedRows = await RemittanceTypeTax.destroy({ where: { id } });

        if (deletedRows > 0) return true;
        return false;
    }

    async create({ data }: { data: TRemittanceTypeTax }): Promise<TRemittanceTypeTax> {
        const createResult = await RemittanceTypeTax.create(data);
        return createResult;
    }

    async update({ data }: { data: TRemittanceTypeTax }): Promise<TRemittanceTypeTax | null> {
        const [affectedRows] = await RemittanceTypeTax.update(data, { where: { id: data.id } });
        if (affectedRows > 0) return data;
        return null;
    }
}

export default new RemittanceTypeTaxRepository();
