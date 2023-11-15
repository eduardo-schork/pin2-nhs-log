import IBaseRepository from "./base.repository";
import TOfferModel from "@/shared/src/models/Offer.model";
import Offer from "../../models/Offer";

class OfferRepository implements IBaseRepository<TOfferModel> {
    async findAll(): Promise<TOfferModel[]> {
        const findAllResult = await Offer.findAll();
        return findAllResult;
    }

    async findOne({ id }: { id: string }): Promise<TOfferModel | null> {
        const findOneResult = await Offer.findOne({ where: { id } });
        return findOneResult;
    }

    async delete({ id }: { id: string }): Promise<boolean> {
        const deletedRows = await Offer.destroy({ where: { id } });

        if (deletedRows > 0) return true;
        return false;
    }

    async create({ data }: { data: TOfferModel }): Promise<TOfferModel> {
        const createResult = await Offer.create(data);
        return createResult;
    }

    async update({ data }: { data: TOfferModel }): Promise<TOfferModel | null> {
        const [affectedRows] = await Offer.update(data, {
            where: {
                id: data.id,
                quotationId: data.quotationId,
            },
        });

        if (affectedRows > 0) return data;
        return null;
    }

    async findAllByQuotation(quotationId: any): Promise<TOfferModel[]> {
        const offersByQuotation = await Offer.findAll({
            where: { quotationId: Number(quotationId) },
        });
        return offersByQuotation;
    }
}

export default new OfferRepository();
