import IBaseRepository from "./base.repository";
import TOfferModel from "@/shared/src/models/Offer.model";
import Offer from "../../models/Offer";

class OfferRepository implements IBaseRepository<TOfferModel> {
    findAll(): Promise<TOfferModel[]> {
        throw new Error("Method not implemented.");
    }

    async findAllByQuotation(quotationId: number): Promise<TOfferModel[]> {
        const offersByQuotation = await Offer.findAll({
            where: {
                fk_quotation: quotationId,
            },
        });

        console.log({ offersByQuotation });

        // return offersByQuotation;
        return [];
    }
    findOne({ id }: { id: string }): Promise<TOfferModel> {
        throw new Error("Method not implemented.");
    }
    delete({ id }: { id: string }): Promise<void> {
        throw new Error("Method not implemented.");
    }
    create({ data }: { data: TOfferModel }): Promise<TOfferModel> {
        throw new Error("Method not implemented.");
    }
    update({ data }: { data: TOfferModel }): Promise<TOfferModel> {
        throw new Error("Method not implemented.");
    }
}

export default new OfferRepository();
