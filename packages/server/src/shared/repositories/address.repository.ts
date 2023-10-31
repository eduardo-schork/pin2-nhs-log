import IBaseRepository from "./base.repository";
import TAddressModel from "@/shared/src/models/Address.model";
import Address from "../../models/Address";

class AddressRepository implements IBaseRepository<TAddressModel> {
    async findAll(): Promise<TAddressModel[]> {
        const findAllResult = await Address.findAll();
        return findAllResult;
    }

    async findOne({ id }: { id: any }): Promise<TAddressModel | null> {
        const findOneResult = await Address.findOne({ where: { id } });
        return findOneResult;
    }

    async delete({ id }: { id: string }): Promise<boolean> {
        const deletedRows = await Address.destroy({ where: { id } });

        if (deletedRows > 0) return true;
        return false;
    }
    async create({ data }: { data: TAddressModel }): Promise<TAddressModel> {
        const createResult = await Address.create(data);
        return createResult;
    }

    async update({ data }: { data: TAddressModel }): Promise<TAddressModel | null> {
        const [affectedRows] = await Address.update(data, { where: { id: data.id } });
        if (affectedRows > 0) return data;
        return null;
    }
}

export default new AddressRepository();
