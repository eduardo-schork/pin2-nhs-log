import IBaseRepository from "./base.repository";
import TQuotationModel from "@/shared/src/models/Quotation.model";
import Quotation from "../../models/Quotation";

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
    async create({ data }: { data: TQuotationModel }): Promise<TQuotationModel> {
        const databaseQuotation = await Quotation.create(data);

        console.log({ databaseQuotation });

        return databaseQuotation;
    }

    update({ data }: { data: TQuotationModel }): Promise<TQuotationModel> {
        throw new Error("Method not implemented.");
    }
}

export default new QuotationRepository();
