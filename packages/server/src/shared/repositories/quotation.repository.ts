import IBaseRepository from "./base.repository";
import TQuotationModel from "@/shared/src/models/Quotation.model";
import Quotation from "../../models/Quotation";
import Address from "../../models/Address";
import ItemRemittance from "../../models/ItemRemittance";
import { Op, Sequelize } from "sequelize";
import Offer from "../../models/Offer";
import DatabasePort from "../../infra/database/database.port";
import { z } from "zod";

const TQuotationSchema = z.object({
    cpf: z.string().nonempty(),
    email: z.string().nonempty(),
    currentDate: z.date(),
    originAddressId: z.number(),
    destinationAddressId: z.number(),
});


class QuotationRepository implements IBaseRepository<TQuotationModel> {
    async findAll(): Promise<TQuotationModel[]> {
        const findAllResult = await Quotation.findAll();
        return findAllResult;
    }

    async findAllWithoutApprovedOffers(): Promise<TQuotationModel[]> {
        const quotations = await Quotation.findAll({
            include: [
                {
                    model: Offer,
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

    async create({ data }: { data: any }): Promise<TQuotationModel> {
        await this.validateInput(data);

        const createResult = await Quotation.create(data);
        return createResult;
    }

    async update({ data }: { data: TQuotationModel }): Promise<TQuotationModel | null> {
        const [affectedRows] = await Quotation.update(data, { where: { id: data.id } });
        if (affectedRows > 0) return data;
        return null;
    }

    async validateInput(data: TQuotationModel) {
        try {
            await TQuotationSchema.parseAsync(data);
        } catch (error) {
            throw new Error("Erro. Os campos obrigatórios devem ser preenchidos corretamente!");
        }
    }

}

export default new QuotationRepository();
