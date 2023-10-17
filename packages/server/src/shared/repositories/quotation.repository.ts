import IBaseRepository from "./base.repository";
import User from "../../models/User";
import TUserModel from "@/shared/src/models/User.model";
import TQuotationModel from "@/shared/src/models/Quotation.model";
import TAddressModel from "@/shared/src/models/Address.model";

class QuotationRepository implements IBaseRepository<TQuotationModel> {
    findAll(): Promise<TQuotationModel[]> {
        throw new Error("Method not implemented.");
    }

    findOne({ id }: { id: string }): Promise<TQuotationModel> {
        throw new Error("Method not implemented.");
    }
    delete({ id }: { id: string }): Promise<void> {
        throw new Error("Method not implemented.");
    }
    create({ data }: { data: TQuotationModel }): Promise<TQuotationModel> {
        throw new Error("Method not implemented.");
    }

    update({ data }: { data: TQuotationModel }): Promise<TQuotationModel> {
        throw new Error("Method not implemented.");
    }
}

export default new QuotationRepository();
