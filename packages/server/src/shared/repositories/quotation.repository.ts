import IBaseRepository from "./base.repository";
import TQuotationModel from "@/shared/src/models/Quotation.model";
import Quotation from "../../models/Quotation";
import Address from "../../models/Address";
import ItemRemittance from "../../models/ItemRemittance";
import { Op, Sequelize } from "sequelize";
import Offer from "../../models/Offer";
import DatabasePort from "../../infra/database/database.port";

class QuotationRepository implements IBaseRepository<TQuotationModel> {
    async findAll(): Promise<TQuotationModel[]> {
        const findAllResult = await Quotation.findAll();
        return findAllResult;
    }

    // Old findAllWithoutApprovedOffers raw query without joins
    // const query = `
    //     SELECT "Quotation".*
    //     FROM "Quotation"
    //     LEFT JOIN "Offer" ON "Quotation"."pk_quotation" = "Offer"."fk_quotation"
    //     WHERE "Offer"."fk_quotation" is null and
    //     (("Offer"."of_status" <> 'Aprovado') or ("Offer"."of_status" is null))
    // `;

    // const quotations = await DatabasePort?.instance?.query(query, {
    //     model: Quotation,
    //     mapToModel: true,
    // });

    // @ts-ignore`
    // return quotations;
    async findAllWithoutApprovedOffers(): Promise<TQuotationModel[]> {
        const quotations = await Quotation.findAll({
            include: [
                {
                    model: Offer,
                    // where: { status: { [Op.not]: "Aprovado" } },
                    required: false,
                },
                {
                    model: ItemRemittance,
                    required: false,
                    where: { quotationId: { [Op.col]: "Quotation.pk_quotation" } },
                },
                { model: Address, as: "originAddress", required: false },
                { model: Address, as: "destinationAddress", required: false },
            ],
        });

        // const quotationsWithoutApprovedOffers = quotations.filter((quotation) => {
        //     return (
        //         quotation?.offers?.length === 0 ||
        //         quotation?.offers?.every((offer) => offer.status !== "Aprovado")
        //     );
        // });

        return quotations;
    }

    async findAllByCPF({ cpf }: { cpf: string }): Promise<TQuotationModel[]> {
        //TODO formatar a data e peso
        const findAllResult = await Quotation.findAll({
            where: { cpf },
            include: [
                { model: Address, as: "originAddress", required: false },
                { model: Address, as: "destinationAddress", required: false },
                {
                    model: ItemRemittance,
                    required: false,
                    where: {
                        quotationId: {
                            [Op.col]: "Quotation.pk_quotation",
                        },
                    },
                },
            ],
        });
        return findAllResult;
    }

    async findOne({ id }: { id: string }): Promise<TQuotationModel | null> {
        const findOneResult = await Quotation.findOne({ where: { id } });
        return findOneResult;
    }

    async delete({ id }: { id: string }): Promise<boolean> {
        const deletedRows = await Quotation.destroy({ where: { id } });

        if (deletedRows > 0) return true;
        return false;
    }

    async create({ data }: { data: TQuotationModel }): Promise<TQuotationModel> {
        const createResult = await Quotation.create(data);
        return createResult;
    }

    async update({ data }: { data: TQuotationModel }): Promise<TQuotationModel | null> {
        const [affectedRows] = await Quotation.update(data, { where: { id: data.id } });
        if (affectedRows > 0) return data;
        return null;
    }
}

export default new QuotationRepository();
