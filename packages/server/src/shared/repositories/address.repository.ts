import IBaseRepository from "./base.repository";
import TAddressModel from "@/shared/src/models/Address.model";
import Address from "../../models/Address";

class QuotationRepository implements IBaseRepository<TAddressModel> {
    findAll(): Promise<TAddressModel[]> {
        throw new Error("Method not implemented.");
    }

    findOne({ id }: { id: string }): Promise<TAddressModel> {
        throw new Error("Method not implemented.");
    }
    delete({ id }: { id: string }): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async create({ data }: { data: TAddressModel }): Promise<TAddressModel> {
        const databaseAddress = await Address.create(data);

        console.log({ databaseAddress });

        return databaseAddress;
    }

    update({ data }: { data: TAddressModel }): Promise<TAddressModel> {
        throw new Error("Method not implemented.");
    }
}

export default new QuotationRepository();
